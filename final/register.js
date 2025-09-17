localStorage.clear();
sessionStorage.clear();



document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const nameInput = document.getElementById("fullname");

  form.addEventListener("submit", function (e) {
    // Basic email check
    if (!validateEmail(emailInput.value)) {
      alert("Please enter a valid email address.");
      e.preventDefault(); // ❗ Invalid email: Stop form submission
      return;
    }

    // Check password length
    if (passwordInput.value.length < 6) {
      alert("Password must be at least 6 characters long.");
      e.preventDefault(); // ❗ Short password: Stop form submission
      return;
    }

    // ✅ Save user's name to localStorage
    const name = nameInput.value.trim();
    localStorage.setItem("userName", name);
    localStorage.setItem("welcome", "true");

    // ✅ Let the form submit normally to register.php (no preventDefault here!)
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});