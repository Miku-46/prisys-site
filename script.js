const $ = (s, p=document) => p.querySelector(s);

const header = $(".header");
const navToggle = $(".nav__toggle");
const navMenu = $("#navMenu");
const yearEl = $("#year");
const todayEls = document.querySelectorAll(".js-today");

function fmtDate(d){
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}.${m}.${day}`;
}

function setDates(){
  const now = new Date();
  const s = fmtDate(now);
  todayEls.forEach(el => el.textContent = s);
  if (yearEl) yearEl.textContent = String(now.getFullYear());
}

function setHeader(){
  if (!header) return;
  header.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");
}

function setupMenu(){
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navMenu.classList.toggle("is-open", !open);
  });

  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    });
  });
}

window.addEventListener("scroll", setHeader, { passive:true });
setDates();
setHeader();
setupMenu();