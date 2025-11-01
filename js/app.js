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
      SweetAlert({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Welcome back!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setTimeout(() => {
        window.location.href = `${basePath}/login.html`;
      }, 1500);
    });
  }
};

const initializeApp = async () => {
  await getSession();
  setupLogout();
};

document.addEventListener("DOMContentLoaded", initializeApp);
