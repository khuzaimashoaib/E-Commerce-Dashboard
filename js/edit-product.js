import { fetchProducts } from "./database.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function loadProductForEdit(id) {
  const products = await fetchProducts("products");
  const product = products.find((p) => p.id === id);
  console.log(products.long_des);

  return product;
}

async function populateEditForm() {
  const product = await loadProductForEdit(productId);

  if (!product) return alert("Product not found!");

  document.getElementById("title").value = product.title;
  document.getElementById("price").value = product.price;
  document.getElementById("category").value = product.category;
  document.getElementById("brand").value = product.brand;

  console.log("product.long_des", product.long_des);

  $("#shortDesc, #longDesc").each(function () {
    const isShort = $(this).attr("id") === "shortDesc";
    $(this).summernote({
      height: 200,
      placeholder: isShort ? "Short Description ..." : "Long Description ...",
    });
  });

  $("#longDesc").summernote("code", product.long_des || "");
  $("#shortDesc").summernote("code", product.short_des || "");

  if (product.images_urls && product.images_urls.length > 0) {
    const imgPreview = document.getElementById("imagePreview");
    if (imgPreview) {
      imgPreview.innerHTML = ""; // clear previous
      product.images_urls.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.width = 100;
        img.height = 100;
        img.classList.add("mr-2"); // spacing
        imgPreview.appendChild(img);
      });
    } // image tag for preview
  }
}

document.addEventListener("DOMContentLoaded", populateEditForm);
