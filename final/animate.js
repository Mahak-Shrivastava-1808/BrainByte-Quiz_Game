document.addEventListener("DOMContentLoaded", () => {
  const text = "Brain Byte";
  const textElement = document.querySelector(".typewriter-text");

  // Set the text content manually (the animation handles the reveal)
  textElement.textContent = text;

  // Redirect after typing + loading (3 seconds total)
  setTimeout(() => {
    window.location.href = "register.html"; // Replace with your main page
  }, 3000);
});

