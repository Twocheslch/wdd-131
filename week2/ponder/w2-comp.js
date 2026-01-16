const selectElem = document.querySelector('#theme-select');
const pageContent = document.querySelector('body');
const heading = document.querySelector('h1');
const logo = document.querySelector('#logo');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
  const current = selectElem.value;

  if (current === 'ocean') {
    document.body.style.backgroundImage = "url('https://wddbyui.github.io/wdd131/images/ocean.jpg')";
    pageContent.style.fontFamily = 'Papyrus, fantasy';
  } else if (current === 'forest') {
    document.body.style.backgroundImage = "url('https://wddbyui.github.io/wdd131/images/forest.jpg')";
    pageContent.style.fontFamily = 'Impact, sans-serif';
  } else if (current === 'desert') {
    document.body.style.backgroundImage = "url('https://wddbyui.github.io/wdd131/images/desert.jpg')";
    pageContent.style.fontFamily = "'Big Caslon', serif";
  } else {
    document.body.style.backgroundImage = 'none';
    pageContent.style.fontFamily = 'Georgia, serif';
  }

  const label = current ? current[0].toUpperCase() + current.slice(1) : 'Default';
  if (heading) heading.textContent = `Pick a Theme (${label})`;
  if (logo) logo.animate([
    { transform: 'rotate(0deg) scale(1)' },
    { transform: 'rotate(360deg) scale(1.06)' },
    { transform: 'rotate(360deg) scale(1)' }
  ], { duration: 450, easing: 'ease-out' });
}
