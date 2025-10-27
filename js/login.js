import { signInUser, getUserSession } from "./auth.js";
// import { showToast } from "../utils/toast.js";

const HARDCODED_EMAIL = "khuzaima.shoaib@gmail.com";
const HARDCODED_PASSWORD = "admin123";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    console.log("Please enter both email and password");
    return;
  }

  if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
    const { data, error } = await signInUser(email, password);
    window.location.href = "/index.html";
  }

  if (error) {
    // showToast(error.message);
    console.error("login error:", error.message);
    return;
  }
});

const session = async () => {
  const { session } = await getUserSession();
  if (session) {
    const basePath = window.location.hostname.includes("github.io")
      ? "/E-Commerce-Dashboard"
      : "";
    window.location.href = `${basePath}/index.html`;
  }
};

session();
