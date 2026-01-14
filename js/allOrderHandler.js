import { fetchProducts } from "./database.js";
import { handleEdit, OrderHandleDelete } from "./productAction.js";

// Function to get last 5 digits of order ID
function getLastFiveDigits(orderId) {
  const idString = String(orderId);
  return idString.slice(-5);
}

export async function loadProducts() {
  const products = await fetchProducts("orders");
  console.log(products);
  


  if ($.fn.DataTable.isDataTable("#DataTables_Table_0")) {
    $("#DataTables_Table_0").DataTable().clear().destroy();
    $("#productsTable").empty(); // ✅ Clear tbody
  }

  const tableBody = document.getElementById("productsTable");

  tableBody.innerHTML = "";

  products.forEach((item) => {
   
    const row = `
      <tr role="row" class="odd">
                       
                        <td>
                          <h5 class="font-16">#${item.id.slice(-5)}</h5>
                        </td>
                        <td>${item.user_email}</td>
                        <td>${item.user_name}</td>
                        <td>${item.shipping_address}</td>
                        <td>${item.user_phone}</td>
                        <td>${item.total_amount}</td>
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

//   document.querySelectorAll(".edit-btn").forEach((btn) => {
//     btn.addEventListener("click", () => handleEdit(btn.dataset.id));
//   });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => OrderHandleDelete(btn.dataset.id));
  });

  $("#DataTables_Table_0").DataTable({
    pageLength: 10, // ✅ Entries per page
    responsive: true,
    autoWidth: false,
    ordering: false,
  });
}

loadProducts();
