document.addEventListener("DOMContentLoaded", () => {
    // Open modal
    document.querySelectorAll(".child").forEach(card => {
      card.addEventListener("click", () => {
        const modalId = card.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "block";
      });
    });
  
    // Close modal
    document.querySelectorAll(".close").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest(".modal").style.display = "none";
      });
    });
  
    // Close when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
      }
    });
  });