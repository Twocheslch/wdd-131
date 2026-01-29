const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const mq = window.matchMedia("(min-width: 700px)");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

  const syncNav = () => {
    if (mq.matches) nav.classList.remove("open");
  };

  mq.addEventListener("change", syncNav);
  syncNav();
}
