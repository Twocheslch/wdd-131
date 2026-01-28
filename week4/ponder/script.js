const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const mq = window.matchMedia("(min-width: 700px)");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.classList.toggle("change");
});

const syncMenu = () => {
  if (mq.matches) {
    nav.classList.remove("open");
    menuBtn.classList.remove("change");
  }
};

mq.addEventListener("change", syncMenu);
syncMenu();
