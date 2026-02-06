const allRatingElems = document.querySelectorAll("article.movie p span");

allRatingElems.forEach(function (elem) {
  const rating = elem.innerText.length;
  elem.setAttribute("aria-label", rating + " out of 5 stars");
  elem.setAttribute("role", "img");
});
