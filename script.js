
document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the footer year.
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation menu.
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Switch between Cisco and development certifications.
  const tabs = document.querySelectorAll(".tab");
  const certificateGroups = document.querySelectorAll(".cert-group");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.target;

      tabs.forEach((item) => item.classList.remove("active"));
      certificateGroups.forEach((group) => {
        group.classList.remove("active");
      });

      tab.classList.add("active");

      const targetGroup = document.getElementById(targetId);
      if (targetGroup) {
        targetGroup.classList.add("active");
      }
    });
  });

  // Back-to-top button.
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
