const movies = [
  {
    title: "Spider-Man: Into the Spider-Verse",
    date: "Dec 14, 2018",
    description: "Miles Morales becomes the Spider-Man of his reality and crosses paths with others from the multiverse.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/spiderman.png",
    imgAlt: "Miles Morales swinging through the city",
    ages: "10+",
    genre: "Action/Adventure",
    stars: "⭐⭐⭐⭐⭐"
  },
  {
    title: "The Other Side of Heaven",
    date: "December 14, 2001",
    description: "Based on the true story of Elder John H. Groberg, a missionary in Tonga in the 1950s, this film tells a powerful story of faith, hardship, and miracles.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/heaven.png",
    imgAlt: "A young couple and missionaries in a row boat on the ocean",
    ages: "10+",
    genre: "Drama/Religious",
    stars: "⭐⭐⭐⭐"
  },
  {
    title: "Luca",
    date: "June 18, 2021",
    description: "Two sea monsters experience a life-changing summer on the Italian Riviera.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/luca.png",
    imgAlt: "Two boys standing on a beach",
    ages: "6+",
    genre: "Family/Fantasy",
    stars: "⭐⭐⭐⭐"
  },
  {
    title: "17 Miracles",
    date: "June 3, 2011",
    description: "A depiction of the Willie Handcart Company journey west in 1856, focusing on miracles that helped the pioneers survive a harsh migration.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/miracles.jpg",
    imgAlt: "Handcart pioneers walking through snow",
    ages: "12+",
    genre: "Historical/Religious",
    stars: "⭐⭐⭐⭐"
  }
];

const moviesList = document.getElementById("movie-list");

moviesList.innerHTML = "";

movies.forEach(function (movie) {
  const article = document.createElement("article");
  article.classList.add("movie");

  article.innerHTML =
    "<h2>" + movie.title + "</h2>" +
    '<img src="' + movie.imgSrc + '" alt="' + movie.imgAlt + '">' +
    "<p><strong>Release Date:</strong> " + movie.date + "</p>" +
    "<p><strong>Recommended Age:</strong> " + movie.ages + "</p>" +
    "<p><strong>Genre:</strong> " + movie.genre + "</p>" +
    "<p><strong>Rating:</strong> <span>" + movie.stars + "</span></p>" +
    '<p class="desc">' + movie.description + "</p>";

  moviesList.appendChild(article);
});

const allRatingElems = document.querySelectorAll("article.movie p span");

allRatingElems.forEach(function (elem) {
  const rating = elem.innerText.length;
  elem.setAttribute("aria-label", rating + " out of 5 stars");
  elem.setAttribute("role", "img");
});

const menuBtn = document.querySelector(".menu-btn");
const siteNav = document.getElementById("site-nav");

menuBtn.addEventListener("click", function () {
  const isOpen = siteNav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});
