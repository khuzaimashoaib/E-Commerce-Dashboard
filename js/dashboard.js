import { fetchProducts } from "./database.js";

async function loadDashboardCounts() {
  const products = await fetchProducts("products");
  document.getElementById("totalProducts").textContent = products.length;

  const orders = await fetchProducts("orders");
  document.getElementById("totalOrders").textContent = orders.length;

  const users = await fetchProducts("users");
  document.getElementById("totalUsers").textContent = users.length ?? 0;
}

document.addEventListener("DOMContentLoaded", loadDashboardCounts);
