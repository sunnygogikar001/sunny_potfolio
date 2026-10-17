
document.addEventListener("DOMContentLoaded", () => {
  const email = "sannygogikar@gmail.com";

  // Current year in footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const open = navigation.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );
      menuToggle.textContent = open ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 780) {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });
  }

  // Project search and category filtering
  const projectSearch = document.getElementById("projectSearch");
  const projectCards = [...document.querySelectorAll(".project-card")];
  const projectFilters = document.querySelectorAll(".filter-btn");
  const emptyProjects = document.getElementById("emptyProjects");

  let activeProjectFilter = "all";

  function filterProjects() {
    const query = (projectSearch?.value || "").trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(card => {
      const category = card.dataset.category || "";
      const searchableText =
        (card.dataset.search || "") + " " + card.textContent;

      const matchesCategory =
        activeProjectFilter === "all" ||
        category === activeProjectFilter;

      const matchesSearch =
        searchableText.toLowerCase().includes(query);

      const visible = matchesCategory && matchesSearch;
      card.hidden = !visible;

      if (visible) visibleCount++;
    });

    if (emptyProjects) {
      emptyProjects.hidden = visibleCount !== 0;
    }
  }

  projectFilters.forEach(button => {
    button.addEventListener("click", () => {
      activeProjectFilter = button.dataset.filter;

      projectFilters.forEach(filter => {
        filter.classList.toggle("active", filter === button);
      });

      filterProjects();
    });
  });

  projectSearch?.addEventListener("input", filterProjects);

  // Certification category filters
  const certificateFilters = document.querySelectorAll(".certificate-filter");
  const certificateCards = document.querySelectorAll(".certificate-card");

  certificateFilters.forEach(button => {
    button.addEventListener("click", () => {
      const selectedType = button.dataset.certFilter;

      certificateFilters.forEach(filter => {
        filter.classList.toggle("active", filter === button);
      });

      certificateCards.forEach(card => {
        const matches =
          selectedType === "all" ||
          card.dataset.certType === selectedType;

        card.hidden = !matches;
      });
    });
  });

  // Reveal animations as content enters the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // Copy email address
  const copyEmail = document.getElementById("copyEmail");
  const copyStatus = document.getElementById("copyStatus");

  if (copyEmail && copyStatus) {
    copyEmail.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = "Email copied successfully!";
      } catch {
        copyStatus.textContent =
          "Copy this email manually: " + email;
      }
    });
  }

  // Back-to-top button
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle("visible", window.scrollY > 450);
    };

    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
