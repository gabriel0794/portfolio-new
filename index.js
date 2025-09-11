function loadPage(event, page, activeNav = null) {
  if (event) event.preventDefault();

  const content = document.getElementById("content");

  fetch(page)
    .then(response => {
      if (!response.ok) throw new Error("Page not found");
      return response.text();
    })
    .then(data => {
      content.innerHTML = data;

      // Animate children
      const children = content.children;
      for (let i = 0; i < children.length; i++) {
        children[i].style.opacity = "0";
        children[i].style.transform = "translateY(30px)";
        setTimeout(() => {
          children[i].style.transition = "all 0.5s ease-out";
          children[i].style.opacity = "1";
          children[i].style.transform = "translateY(0)";
        }, i * 100);
      }

      // Auto-detect activeNav if missing
      if (!activeNav) {
        if (page.includes("details-about/") || page.includes("components/about")) activeNav = "about";
        else if (page.includes("components/project")) activeNav = "project";
        else if (page.includes("components/tech")) activeNav = "tech";
        else if (page.includes("components/home")) activeNav = "home";
      }

      // Update navbar active state
      document.querySelectorAll(".navbar a").forEach(link => link.classList.remove("active"));
      if (activeNav) {
        const navLink = document.querySelector(`.navbar a[data-page="${activeNav}"]`);
        if (navLink) navLink.classList.add("active");
      }
    })
    .catch(err => {
      content.innerHTML = `<p style="color:red;">Error loading ${page}: ${err.message}</p>`;
    });
}

// ✅ Load Home on refresh
document.addEventListener("DOMContentLoaded", () => {
  loadPage(null, "components/home.html", "home");

  // Force highlight on initial load
  const homeLink = document.querySelector('.navbar a[data-page="home"]');
  if (homeLink) homeLink.classList.add("active");
});

// Hamburger menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const dropdown = document.querySelector(".navbar ul");

function toggleMenu() {
  dropdown.classList.toggle("show");
  menuToggle.classList.toggle("open");
}

dropdown.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    dropdown.classList.remove("show");
    menuToggle.classList.remove("open");
  });
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && !menuToggle.contains(e.target)) {
    dropdown.classList.remove("show");
    menuToggle.classList.remove("open");
  }
});
