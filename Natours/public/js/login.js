/* eslint-disable */

const hideAlert = () => {
  const ele = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(ele);
};

const showAlert = (type, msg) => {
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};

const login = async (email, password) => {
  try {
    const res = await fetch("http://localhost:8000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      // Check if the response was successful
      if (data.status === "success") {
        showAlert("success", "Logged in successfully");
        window.setTimeout(() => {
          location.assign("/");
        }, 1500);
      }
    }

    if (data.status === "fail") showAlert("error", data.message);
  } catch (err) {
    showAlert("error", err.message);
  }
};

const logout = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/v1/users/logout");
    const data = await res.json();

    if (data.status === "success") {
      showAlert("success", "Logged out successfully");
      location.reload(true);
    }
  } catch (err) {
    showAlert("error", "Error logging out! Try again");
  }
};

const loginForm = document.querySelector(".form");
const logoutButton = document.querySelector(".nav__el--logout");

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    e.preventDefault();
    login(email, password);
  });

if (logoutButton) logoutButton.addEventListener("click", logout);
