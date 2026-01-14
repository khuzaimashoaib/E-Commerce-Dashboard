import { signInUser, getUserSession } from "./auth.js";
// import { showToast } from "../utils/toast.js";

const HARDCODED_EMAIL = "khuzaima.shoaib@gmail.com";
const HARDCODED_PASSWORD = "admin123";
const basePath = window.location.hostname.includes("github.io")
  ? "/E-Commerce-Dashboard"
  : "";
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    Swal.fire({
      icon: "warning",
      text: "Please enter both email and password",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    });

    return;
  }

  if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
    const { data, error } = await signInUser(email, password);
    if (error) {
      Swal.fire({
        icon: "error",
        text: "Login failed. Please try again.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    Swal.fire({
      icon: "success",
      text: "You have been successfully logged in!",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      window.location.href = `${basePath}/index.html`;
    });
  } else {
    // Wrong credentials
    Swal.fire({
      icon: "error",
      text: "Invalid Credentials",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

const session = async () => {
  const { session } = await getUserSession();
  if (session) {
    window.location.href = `${basePath}/index.html`;
  }
};

session();
