/* ============================================================
   DANYA FURNITURE — SCRIPT.JS
   Plain Vanilla JavaScript (no frameworks)
   ============================================================ */

/* === EASY EDIT: WHATSAPP NUMBER (with country code, no + or spaces) === */
const WHATSAPP_NUMBER = "2348133172137";

/* ---------------- MOBILE HAMBURGER MENU ---------------- */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

/* ---------------- STICKY NAVBAR ACTIVE LINK ON SCROLL ---------------- */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ---------------- WHATSAPP ORDER BUTTONS (product cards) ---------------- */
document.querySelectorAll(".order-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const productName = btn.getAttribute("data-name");
    sendWhatsAppOrder(productName);
  });
});

function sendWhatsAppOrder(productName) {
  const message = `Hello, I am interested in ${productName}. Please give me more information.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* ---------------- PRODUCT DETAILS MODAL ---------------- */
const modalOverlay = document.getElementById("modalOverlay");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const modalOrderBtn = document.getElementById("modalOrderBtn");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".view-details-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = btn.getAttribute("data-price");
    const desc = btn.getAttribute("data-desc");
    const img = btn.getAttribute("data-img");

    modalImg.src = img;
    modalImg.alt = name;
    modalName.textContent = name;
    modalPrice.textContent = price;
    modalDesc.textContent = desc;

    const message = `Hello, I am interested in ${name}. Please give me more information.`;
    modalOrderBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    modalOverlay.classList.add("active");
  });
});

function closeModal() {
  modalOverlay.classList.remove("active");
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

/* ---------------- CONTACT FORM (front-end only demo) ---------------- */
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !message) {
    formNote.textContent = "Please fill in all fields.";
    formNote.style.color = "#c0392b";
    return;
  }

  // Since this is a static site, we send the message straight to WhatsApp.
  const waMessage = `Hello, my name is ${name} (${phone}). ${message}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
  window.open(url, "_blank");

  formNote.textContent = "Thank you! Your message has been prepared on WhatsApp.";
  formNote.style.color = "#1e824c";
  contactForm.reset();
});

/* ---------------- BACK TO TOP BUTTON ---------------- */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------------- SCROLL REVEAL ANIMATIONS ---------------- */
const animatedElements = document.querySelectorAll("[data-animate]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

animatedElements.forEach((el) => observer.observe(el));

/* ---------------- FOOTER YEAR ---------------- */
document.getElementById("year").textContent = new Date().getFullYear();
