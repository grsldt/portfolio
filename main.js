// Année dynamique
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});















// Thème (persisté)
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const saved = localStorage.getItem("theme");
if (saved) root.setAttribute("data-theme", saved);
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}







// Scrollspy (pour page index uniquement)
const nav = document.getElementById("nav");
if (nav) {
  const links = [...nav.querySelectorAll("a")].filter(a => a.getAttribute("href")?.startsWith("#"));
  const sections = links.map(a => document.querySelector(a.getAttribute("href")));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = "#" + entry.target.id;
        const link = links.find(a => a.getAttribute("href") === id);
        if (entry.isIntersecting && link) {
          links.forEach(a => a.classList.remove("active"));
          link.classList.add("active");
          if (history.replaceState) history.replaceState(null, "", id);
        }
      });
    }, { rootMargin: "-50% 0px -40% 0px", threshold: 0.01 });
    sections.forEach(s => s && io.observe(s));
  }
}






// Animation barres de compétences (index)
const bars = document.querySelectorAll(".bar > span");
if ("IntersectionObserver" in window) {
  const ioBars = new IntersectionObserver((ents) => {
    ents.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        el.style.width = getComputedStyle(el).getPropertyValue("--w") || "0%";
        ioBars.unobserve(el);
      }
    });
  }, { threshold: .3 });
  bars.forEach(b => ioBars.observe(b));
} else {
  bars.forEach(b => b.style.width = getComputedStyle(b).getPropertyValue("--w") || "0%");
}
