// ---------- Sidebar Toggle ----------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebarInfo = document.querySelector("[data-sidebar-info]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    // Rotate the icon
    const icon = sidebarBtn.querySelector("i");
    if (icon) {
      icon.style.transform = sidebar.classList.contains("active")
        ? "rotate(180deg)"
        : "rotate(0deg)";
    }
  });
}

// ---------- Navbar Navigation ----------
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const pageName = link.innerHTML.toLowerCase();

    // Update active page
    pages.forEach(page => {
      if (page.dataset.page === pageName) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    // Update active nav link
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ---------- Scroll Animations ----------
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".timeline-item, .service-item, .testimonial-card, .skill-category, .training-item, .blog-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
};

// Initialize scroll animations when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", animateOnScroll);
} else {
  animateOnScroll();
}

// ---------- Contact Form ----------
const contactForm = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusMsg.textContent = "Sending...";
    statusMsg.className = "form-status pending";

    const data = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        statusMsg.textContent = "✅ Message sent successfully!";
        statusMsg.className = "form-status success";
        contactForm.reset();
      } else {
        statusMsg.textContent = "❌ Oops! Something went wrong.";
        statusMsg.className = "form-status error";
      }
    } catch (error) {
      statusMsg.textContent = "⚠️ Network error. Please try again.";
      statusMsg.className = "form-status error";
    }
  });
}


// ---------- Smooth Scroll for Internal Links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// ---------- Active Link on Scroll ----------
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("article[data-page]");
  const scrollPosition = window.scrollY + 200;

  sections.forEach((section) => {
    if (section.classList.contains("active")) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const pageName = section.dataset.page;
        navLinks.forEach((link) => {
          if (link.innerHTML.toLowerCase() === pageName) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    }
  });
});

// ---------- Add Hover Effects to Cards ----------
const addCardEffects = () => {
  const cards = document.querySelectorAll(
    ".service-item, .testimonial-card, .timeline-item, .blog-item, .training-item"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function() {
      this.style.transition = "all 0.3s ease";
    });
  });
};

addCardEffects();

// ---------- Lazy Loading for Better Performance ----------
if ("IntersectionObserver" in window) {
  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
}

// ---------- Mobile Menu Enhancement ----------
const handleMobileMenu = () => {
  if (window.innerWidth <= 1024 && sidebar && sidebarInfo) {
    // Initially hide sidebar info on mobile
    sidebarInfo.style.display = "none";

    // Toggle display on button click
    if (sidebarBtn) {
      sidebarBtn.addEventListener("click", () => {
        if (sidebarInfo.style.display === "none") {
          sidebarInfo.style.display = "flex";
        } else {
          sidebarInfo.style.display = "none";
        }
      });
    }
  }
};

// Check on load and resize
window.addEventListener("load", handleMobileMenu);
window.addEventListener("resize", handleMobileMenu);

// ---------- Add Loading State ----------
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});
