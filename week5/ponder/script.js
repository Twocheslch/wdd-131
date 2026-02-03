$0.innerText
$0.innerText.length


const allRatingElems = document.querySelectorAll('article.movie p span');

allRatingElems.forEach((elem) => {
    const rating = elem.innerText.length;
    elem.setAttribute('aria-label', `${rating} out of 7 stars`)
});