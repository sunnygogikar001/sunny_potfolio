
document.addEventListener("DOMContentLoaded", () => {
  // Copyright year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Highlight active sidebar section
  const navLinks = [...document.querySelectorAll(".side-nav a")];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    }, { rootMargin: "-20% 0px -65% 0px" });

    sections.forEach(section => observer.observe(section));
  }

  // Filter certificates
  const filterButtons = document.querySelectorAll(".filter");
  const certificates = document.querySelectorAll(".certificate");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(item => {
        item.classList.toggle("active", item === button);
      });

      certificates.forEach(card => {
        card.hidden = filter !== "all" && card.dataset.type !== filter;
      });
    });
  });

  // Copy email
  const copyButton = document.getElementById("copyEmail");
  const copyStatus = document.getElementById("copyStatus");

  if (copyButton && copyStatus) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("sannygogikar@gmail.com");
        copyStatus.textContent = "Email copied successfully!";
      } catch {
        copyStatus.textContent = "Email: sannygogikar@gmail.com";
      }
    });
  }

  // Back-to-top button
  const backTop = document.getElementById("backTop");

  if (backTop) {
    const updateButton = () => {
      backTop.classList.toggle("visible", window.scrollY > 350);
    };

    window.addEventListener("scroll", updateButton, { passive: true });
    updateButton();

    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
