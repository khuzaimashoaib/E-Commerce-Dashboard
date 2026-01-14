import { getUserSession, signOutUser } from "./auth.js";

const basePath = window.location.hostname.includes("github.io")
  ? "/E-Commerce-Dashboard"
  : "";

const getSession = async () => {
  const { session } = await getUserSession();
  if (!session) {
    window.location.href = `${basePath}/login.html`;
  }
};

const setupLogout = () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOutUser();
      Swal.fire({
        icon: "success",
        text: "You have been successfully logged out!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.href = `${basePath}/login.html`;
      });
    });
  }
};

const initializeApp = async () => {
  await getSession();
  setupLogout();
};

document.addEventListener("DOMContentLoaded", initializeApp);
