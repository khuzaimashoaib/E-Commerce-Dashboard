import { deleteProduct } from "./database.js";
import { loadProducts } from "./allProductHandler.js";

export function handleEdit(id) {
  window.location.href = `edit-product.html?id=${id}`;
}

export async function handleDelete(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this product?"
  );
  if (!confirmDelete) return;

  const { error } = await deleteProduct("products", id);
  if (error) {
    alert("Failed to delete!");
    return;
  }
  alert("Product deleted!");
  window.location.reload();
  // loadProducts();
}

