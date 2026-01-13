document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
  
    if (!form) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const button = form.querySelector("button[type='submit']");
      const originalText = button.innerText;
  
      button.disabled = true;
      button.innerText = "Sending...";
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
  
        if (result.success) {
          showMessage(result.message, "success");
          form.reset();
        } else {
          showMessage(result.message || "Something went wrong.", "danger");
        }
  
      } catch (error) {
        showMessage("Network error. Please try again.", "danger");
      }
  
      button.disabled = false;
      button.innerText = originalText;
    });
  
    function showMessage(text, type) {
      let msg = document.getElementById("form-message");
  
      if (!msg) {
        msg = document.createElement("div");
        msg.id = "form-message";
        msg.className = `alert alert-${type} mt-3`;
        form.appendChild(msg);
      }
  
      msg.className = `alert alert-${type} mt-3`;
      msg.innerText = text;
    }
  });