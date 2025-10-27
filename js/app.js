import { getUserSession } from "./auth.js";

const basePath = window.location.hostname.includes("github.io")
  ? "/E-Commerce-Dashboard"
  : "";

const getSession = async () => {
  const { session } = await getUserSession();
  if (!session) {
    window.location.href = `${basePath}/login.html`;
  }
};

const initializeApp = async () => {
  await getSession(); // Pehle session check
};

document.addEventListener("DOMContentLoaded", initializeApp);
