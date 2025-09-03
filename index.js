function loadPage(event, page) {
  if (event) event.preventDefault();

  const content = document.getElementById("content");

  fetch(page)
    .then(response => {
      if (!response.ok) throw new Error("Page not found");
      return response.text();
    })
    .then(data => {
      // Replace content
      content.innerHTML = data;

      // Re-trigger animation for new elements only
      const children = content.children;
      for (let i = 0; i < children.length; i++) {
        children[i].style.opacity = "0"; // reset
        children[i].style.transform = "translateY(30px)"; // start position

        // Animate with stagger effect
        setTimeout(() => {
          children[i].style.transition = "all 0.5s ease-out";
          children[i].style.opacity = "1";
          children[i].style.transform = "translateY(0)";
        }, i * 100); // stagger 0.1s per element
      }

      // Navbar active state
      document.querySelectorAll(".navbar a").forEach(link => link.classList.remove("active"));
      if (event && event.target) {
        event.target.classList.add("active");
      } else {
        document.querySelector('.navbar a').classList.add("active");
      }
    })
    .catch(err => {
      content.innerHTML = `<p style="color:red;">Error loading ${page}: ${err.message}</p>`;
    });
}

// Default: load home.html on refresh
document.addEventListener("DOMContentLoaded", () => {
  loadPage(null, "components/home.html");
});