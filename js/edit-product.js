import { fetchProducts, updateProduct } from "./database.js";
import { uploadImagesToCloudinary } from "./cloudinary.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

let product = null;
let newImageFiles = [];

// Load product from DB
async function loadProductForEdit(id) {
  const products = await fetchProducts("products");
  return products.find((p) => p.id === id) || null;
}

// Populate edit form
async function populateEditForm() {
  product = await loadProductForEdit(productId);

  if (!product) {
    window.Swal.fire({
      text: "Product not found!",
      icon: "error",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  document.getElementById("title").value = product.title;
  document.getElementById("price").value = product.price;
  document.getElementById("category").value = product.category;
  document.getElementById("brand").value = product.brand;

  // Summernote init
  $("#shortDesc, #longDesc").each(function () {
    const isShort = $(this).attr("id") === "shortDesc";
    $(this).summernote({
      height: 200,
      placeholder: isShort ? "Short Description ..." : "Long Description ...",
    });
  });

  $("#longDesc").summernote("code", product.long_des || "");
  $("#shortDesc").summernote("code", product.short_des || "");

  renderImages(product.images_urls || []);

  const imageInput = document.getElementById("productImages");
  if (imageInput) {
    imageInput.addEventListener("change", async () => {
      const files = Array.from(imageInput.files);
      newImageFiles = [...newImageFiles, ...files];
      showTemporaryPreview(files);
      imageInput.value = "";
    });
  }
}
function showTemporaryPreview(files) {
  const imgPreview = document.getElementById("imagePreview");

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      wrapper.style.marginRight = "8px";
      wrapper.style.marginBottom = "8px";
      wrapper.setAttribute("data-temp", "true");

      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.objectFit = "cover";
      img.style.border = "1px solid #ccc";
      img.style.borderRadius = "5px";

      const btn = document.createElement("button");
      btn.innerHTML = "×";
      btn.style.position = "absolute";
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
      btn.style.display = "flex";
      btn.style.justifyContent = "center";
      btn.style.alignItems = "center";

      btn.addEventListener("click", () => {
        newImageFiles = newImageFiles.filter((f) => f !== file);
        wrapper.remove();
      });

      wrapper.appendChild(img);
      wrapper.appendChild(btn);
      imgPreview.appendChild(wrapper);
    };
    reader.readAsDataURL(file);
  });
}

// Render images with delete buttons
function renderImages(images) {
  const imgPreview = document.getElementById("imagePreview");
  const existingImages = imgPreview.querySelectorAll(
    'div:not([data-temp="true"])'
  );
  existingImages.forEach((img) => img.remove());

  images.forEach((url, index) => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.style.marginRight = "8px";
    wrapper.style.marginBottom = "8px";

    const img = document.createElement("img");
    img.src = url;
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.objectFit = "cover";
    img.style.border = "1px solid #ccc";
    img.style.borderRadius = "5px";

    const btn = document.createElement("button");
    btn.innerHTML = "×";
    btn.style.position = "absolute";
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
    btn.style.display = "flex";
    btn.style.justifyContent = "center";
    btn.style.alignItems = "center";

    btn.addEventListener("click", () => {
      product.images_urls.splice(index, 1); // remove from array
      renderImages(product.images_urls); // re-render
    });

    wrapper.appendChild(img);
    wrapper.appendChild(btn);
    imgPreview.appendChild(wrapper);
  });
}

// Form submit
document.addEventListener("DOMContentLoaded", () => {
  populateEditForm();

  const editProductbtn = document.getElementById("editProductBtn");

  editProductbtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!product) {
      Swal.fire({
        text: "Product data missing!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    let uploadedUrls = [];
    if (newImageFiles.length > 0) {
      uploadedUrls = await uploadImagesToCloudinary(newImageFiles);
    }

    const updatedData = {
      title: document.getElementById("title").value,
      price: parseFloat(document.getElementById("price").value) || 0,
      category: document.getElementById("category").value,
      brand: document.getElementById("brand").value,
      long_des: $("#longDesc").summernote("code"),
      short_des: $("#shortDesc").summernote("code"),
      images_urls: [...product.images_urls, ...uploadedUrls],
    };

    const { error } = await updateProduct("products", productId, updatedData);

    if (error) {
      console.error(error);
      Swal.fire({
        text: "Update failed!",
        icon: "error",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        text: "Product updated successfully!",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    }
  });
});
