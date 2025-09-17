localStorage.clear();
sessionStorage.clear();



document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      alert("Please fill in all fields.");
      e.preventDefault(); // Stop only if invalid
      return;
    }

    // Let the form be submitted to PHP
  });
});