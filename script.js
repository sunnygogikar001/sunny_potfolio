
document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the copyright year
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the menu after selecting a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Rotate the professional role in the hero section
  const roleText = document.getElementById("roleText");
  const roles = [
    "Data Analyst",
    "Software Developer",
    "Machine Learning Enthusiast"
  ];

  if (roleText) {
    let currentRole = 0;

    setInterval(() => {
      currentRole = (currentRole + 1) % roles.length;

      roleText.style.opacity = "0";

      setTimeout(() => {
        roleText.textContent = roles[currentRole];
        roleText.style.opacity = "1";
      }, 200);
    }, 2500);

    roleText.style.transition = "opacity 0.2s ease";
  }

  // Reveal cards and sections as they enter the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }
});
