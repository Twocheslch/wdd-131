const articles = [
  {
    id: 1,
    title: "Septimus Heap Book One: Magyk",
    date: "July 5, 2022",
    description:
      "If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.",
    imgSrc: "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
    imgAlt: "Book cover for Septimus Heap 1",
    ages: "10-14",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐"
  },
  {
    id: 2,
    title: "Magnus Chase Book One: Sword of Summer",
    date: "December 12, 2021",
    description:
      "The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.",
    imgSrc:
      "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
    imgAlt: "Book cover for Magnus Chase 1",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐"
  },
  {
    id: 3,
    title: "Belgariad Book One: Pawn of Prophecy",
    date: "Feb 12, 2022",
    description:
      "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
    imgSrc:
      "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
    imgAlt: "Book cover for Pawn of Prophecy",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐⭐"
  }
];

const container = document.getElementById("articles");

container.innerHTML = "";

articles.forEach(function (book) {
  const rating = (book.stars.match(/⭐/g) || []).length;

  let starsHtml = "";
  for (let i = 0; i < 5; i++) {
    starsHtml += i < rating
      ? '<span class="star">★</span>'
      : '<span class="star empty">☆</span>';
  }

  const block = document.createElement("article");
  block.className = "content-grid";

  block.innerHTML =
    '<aside class="meta">' +
      '<div class="meta-date">' + book.date + "</div>" +
      '<div class="meta-age">' + book.ages + "</div>" +
      '<div class="meta-genre">' + book.genre + "</div>" +
      '<div class="meta-stars">' + starsHtml + "</div>" +
    "</aside>" +
    '<section class="review">' +
      '<h2 class="review-title">' + book.title + "</h2>" +
      '<img class="cover" src="' + book.imgSrc + '" width="250" height="337" alt="' + book.imgAlt + '">' +
      '<p class="review-text">' + book.description + "</p>" +
    "</section>";

  container.appendChild(block);
});

// dynamic aria labels for ratings
document.querySelectorAll(".meta-stars").forEach(function (elem) {
  const rating = (elem.textContent.match(/★/g) || []).length;
  elem.setAttribute("aria-label", rating + " out of 5 stars");
  elem.setAttribute("role", "img");
});
