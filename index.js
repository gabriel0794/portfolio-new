function loadPage(event, page) {
    if (event) event.preventDefault();
  
    const content = document.getElementById("content");
  
    fetch(page)
      .then(response => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then(data => {
        // replace content
        content.innerHTML = data;
  
        // re-trigger animation for new elements
        const children = content.children;
        for (let i = 0; i < children.length; i++) {
          children[i].style.animationDelay = `${i * 0.1}s`; // staggered effect
        }
  
        // navbar active state
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