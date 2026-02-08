document.querySelectorAll(".meta-stars").forEach((elem) => {
  const rating = (elem.textContent.match(/★/g) || []).length;
  elem.setAttribute("aria-label", `${rating} out of 5 stars`);
  elem.setAttribute("role", "img");
});
