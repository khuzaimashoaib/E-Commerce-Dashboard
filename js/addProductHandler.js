import { addProduct } from "./database.js";

async function uploadImagesToCloudinary(files) {
  const cloudName = "ddvpnmium";
  const uploadPreset = "e-commerce-assets";
  const uploadedUrls = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset); // ✅ replace with your preset

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      uploadedUrls.push(data.secure_url);
    } else {
      console.error("Cloudinary Error:", data);
      alert("❌ Cloudinary Upload Failed:\n" + data.error?.message);
    }

    // uploadedUrls.push(data.secure_url);
  }

  return uploadedUrls;
}

const imageInput = document.getElementById("productImages");
const previewContainer = document.getElementById("imagePreview");

imageInput.addEventListener("change", () => {
  const imageFiles = Array.from(imageInput.files);
  previewContainer.innerHTML = ""; // Clear previous previews

  imageFiles.forEach((file, index) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      // image cancel button container

      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      wrapper.style.marginRight = "8px";
      wrapper.style.marginBottom = "8px";

      //   cancel btn ka element
      const btn = document.createElement("button");
      btn.innerHTML = "×";
      btn.style.position = "absolute";
      btn.style.display = "flex";
      btn.style.justifyContent = "center"; // horizontal center
      btn.style.alignItems = "center";
      btn.style.top = "0";
      btn.style.right = "0";
      btn.style.background = "rgba(0,0,0,0.6)";
      btn.style.color = "white";
      btn.style.border = "none";
      btn.style.borderRadius = "50%";
      btn.style.width = "20px";
      btn.style.height = "20px";
      btn.style.cursor = "pointer";
      btn.style.lineHeight = "1";

      btn.addEventListener("click", () => {
        wrapper.remove(); // Remove from DOM
        imageFiles.splice(index, 1); // Remove from files array
        imageInput.files = createFileList(imageFiles); // Update input files
      });

      //   img ka element
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "100px";
      img.style.height = "100px";
      //   img.style.marginRight = "10px";
      //   img.style.marginBottom = "10px";
      img.style.objectFit = "cover";
      img.style.border = "1px solid #ccc";
      img.style.borderRadius = "5px";
      previewContainer.appendChild(img);

      wrapper.appendChild(img);
      wrapper.appendChild(btn);
      previewContainer.appendChild(wrapper);
    };

    reader.readAsDataURL(file);
  });
});
function createFileList(files) {
  const dataTransfer = new DataTransfer();
  files.forEach((file) => dataTransfer.items.add(file));
  return dataTransfer.files;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addProductForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const long_des = document.getElementById("longDesc").value;
    const short_des = document.getElementById("shortDesc").value;
    const price = parseFloat(document.getElementById("price").value) || 0;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const imageFiles = document.getElementById("productImages").files;

    const image_urls = await uploadImagesToCloudinary(imageFiles);

    const result = await addProduct(
      title,
      long_des,
      short_des,
      price,
      brand,
      category,
      image_urls
    );

    console.log(typeof price, price);

    if (result) {
      alert("✅ Product Added Successfully!");
      form.reset();
      previewContainer.innerHTML = "";
      imageInput.value = "";
      form.querySelector('input[type="submit"]').blur();

      
    } else {
      alert("❌ Failed to add product!");
    }
  });
});
