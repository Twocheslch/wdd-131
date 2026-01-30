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


const galleryImages = document.querySelectorAll("main img");
const viewer = document.querySelector("dialog.viewer") || document.querySelector("dialog");
const viewerImg = viewer ? viewer.querySelector("img") : null;
const closeViewerBtn = viewer ? viewer.querySelector(".close-viewer") : null;

for (let i = 0; i < galleryImages.length; i++) {
  galleryImages[i].addEventListener("click", openViewer);
}

function openViewer(e) {
  if (!viewer || !viewerImg) return;
  viewerImg.src = e.target.src.replace("-sm", "-full");
  viewerImg.alt = e.target.alt;
  viewer.showModal();
}

if (closeViewerBtn) {
  closeViewerBtn.addEventListener("click", closeViewer);
}

function closeViewer() {
  if (!viewer) return;
  viewer.close();
}

if (viewer) {
  viewer.addEventListener("click", closeIfBackdrop);
}

function closeIfBackdrop(e) {
  if (e.target === viewer) {
    viewer.close();
  }
}
