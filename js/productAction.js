import { deleteProduct } from "./database.js";
import { loadProducts } from "./allProductHandler.js";

export function handleEdit(id) {
  window.location.href = `edit-product.html?id=${id}`;
}

export async function handleDelete(id) {
  const result = await Swal.fire({
    text: "Are you sure, You want to delete this product?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  const { error } = await deleteProduct("products", id);
  if (error) {
    Swal.fire({
      text: "Failed to delete the product!",
      icon: "error",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
  Swal.fire({
    text: "Product has been deleted successfully.",
    icon: "success",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    window.location.reload();
  });
}

export async function OrderHandleDelete(id) {
  const result = await Swal.fire({
    text: "Are you sure, You want to delete this order?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  const { error } = await deleteProduct("orders", id);
  if (error) {
    Swal.fire({
        text: "Failed to delete the order!",
      icon: "error",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
  Swal.fire({
    text: "Order has been deleted successfully.",
    icon: "success",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    window.location.reload();
  });
}
