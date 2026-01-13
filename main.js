document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form) return;
  
    const button = form.querySelector("button[type='submit']");
    const messageBox = document.createElement("div");
    messageBox.id = "formMessage";
    messageBox.style.marginTop = "15px";
    form.appendChild(messageBox);
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      messageBox.style.display = "none";
      messageBox.className = "";
      messageBox.innerText = "";
  
      const originalText = button.innerText;
      button.disabled = true;
      button.innerText = "Sending...";
  
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
        });
  
        
        if (response.ok) {
          messageBox.className = "alert alert-success";
          messageBox.innerText = "Message sent successfully! We’ll get back to you shortly.";
          messageBox.style.display = "block";
          form.reset();
        } else {
          throw new Error("Server responded with error");
        }
  
      } catch (err) {
        messageBox.className = "alert alert-danger";
        messageBox.innerText = "Failed to send message. Please try again.";
        messageBox.style.display = "block";
      }
  
      button.disabled = false;
      button.innerText = originalText;
    });
  }); 