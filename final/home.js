// Show welcome popup if coming from registration
window.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("userName");
  if (name) {
    const popup = document.getElementById("welcomePopup");
    const message = document.getElementById("popupMessage");
    message.innerText = `Welcome to Brain Byte, ${name}!`;
    popup.style.display = "flex";

    // Clear the name after showing
    localStorage.removeItem("userName");
  }


});