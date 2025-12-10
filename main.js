// ========================
//   INIT GLOBALE
// ========================

// Appliquer le thème sauvegardé le plus tôt possible
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initThemeToggle();
  initScrollSpy();
  initSkillBars();
  initMobileMenu();
});

// ------------------------
//  Année dynamique
// ------------------------
function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ------------------------
//  Thème dark / light
// ------------------------
function initThemeToggle() {
  const themeBtn = document.getElementById("themeBtn");
  if (!themeBtn) return;

  themeBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// ------------------------
//  Scrollspy (index)
// ------------------------
function initScrollSpy() {
  const nav = document.getElementById("navDesktop");
  if (!nav || !("IntersectionObserver" in window)) return;

  const links = [];
  const sections = [];

  nav.querySelectorAll("a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const sharpIndex = href.indexOf("#");
    if (sharpIndex === -1) return; // liens vers autres pages

    const id = href.slice(sharpIndex + 1);
    const section = document.getElementById(id);
    if (!section) return;

    links.push({ id, el: a });
    sections.push(section);
  });

  if (!sections.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;
        const linkObj = links.find((l) => l.id === id);
        if (!linkObj) return;

        links.forEach((l) => l.el.classList.remove("active"));
        linkObj.el.classList.add("active");

        if (history.replaceState) {
          history.replaceState(null, "", "#" + id);
        }
      });
    },
    { rootMargin: "-50% 0px -40% 0px", threshold: 0.01 }
  );

  sections.forEach((s) => io.observe(s));
}

// ------------------------
//  Animation barres skills
// ------------------------
function initSkillBars() {
  const bars = document.querySelectorAll(".bar > span");
  if (!bars.length) return;

  if (!("IntersectionObserver" in window)) {
    bars.forEach((b) => {
      b.style.width = getComputedStyle(b).getPropertyValue("--w") || "0%";
    });
    return;
  }

  const ioBars = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.style.width =
          getComputedStyle(el).getPropertyValue("--w") || "0%";
        ioBars.unobserve(el);
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach((b) => ioBars.observe(b));
}

// ------------------------
//  MENU MOBILE slide droite
//  (exactement comme Tanaka)
// ------------------------
function initMobileMenu() {
  const openBtn = document.getElementById("openMenu");    // bouton "☰ Menu"
  const closeBtn = document.getElementById("closeMenu");  // bouton ✕
  const panel = document.getElementById("mobilePanel");   // overlay + panneau

  if (!openBtn || !closeBtn || !panel) return;

  const open = () => {
    panel.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    panel.classList.remove("open");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  // clic sur le fond sombre (en dehors du panneau)
  panel.addEventListener("click", (e) => {
    if (e.target === panel) {
      close();
    }
  });

  // clic sur un lien du panneau -> fermer
  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => close());
  });

  // Échap pour fermer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // si on repasse en desktop, on ferme
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      close();
    }
  });
}
