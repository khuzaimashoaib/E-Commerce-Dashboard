import { fetchProducts } from "./database.js";
import { handleEdit, handleDelete } from "./productAction.js";

export async function loadProducts() {
  const products = await fetchProducts("products");

  if ($.fn.DataTable.isDataTable("#DataTables_Table_0")) {
    $("#DataTables_Table_0").DataTable().clear().destroy();
    $("#productsTable").empty(); // ✅ Clear tbody
  }

  const tableBody = document.getElementById("productsTable");

  tableBody.innerHTML = "";

  products.forEach((item) => {
    const imageUrl =
      item.images_urls && item.images_urls.length > 0
        ? item.images_urls[0]
        : "vendors/images/placeholder.png";
    const row = `
      <tr role="row" class="odd">
                        <td class="table-plus sorting_1" tabindex="0">
                          <img
                            src="${imageUrl} "
                            width="70"
                            height="70"
                            alt=""/>
                        </td>
                        <td>
                          <h5 class="font-16">${item.title}</h5>
                        </td>
                        <td>${item.price}</td>
                        <td>${item.category}</td>
                        <td>${item.brand}</td>
                        <td>${item.sku}</td>
                        <td>
                          <div class="dropdown">
                            <a
                              class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle"
                              href="#"
                              role="button"
                              data-toggle="dropdown"
                            >
                              <i class="dw dw-more"></i>
                            </a>
                            <div
                              class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list"
                            >
                              <a class="dropdown-item edit-btn" href="#" data-id="${item.id}"
                                ><i class="dw dw-edit2"></i> Edit</a
                              >
                              <a class="dropdown-item delete-btn" href="#" data-id="${item.id}"
                                ><i class="dw dw-delete-3"></i> Delete</a
                              >
                            </div>
                          </div>
                        </td>
                      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleEdit(btn.dataset.id));
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleDelete(btn.dataset.id));
  });

  $("#DataTables_Table_0").DataTable({
    pageLength: 10, // ✅ Entries per page
    responsive: true,
    autoWidth: false,
    ordering: false,
  });
}

loadProducts();
