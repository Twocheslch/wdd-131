let selectElem = document.querySelector('select');
let logo = document.querySelector('img');
let content = document.querySelector('#content');
let body = document.body;

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;

    if (current === 'dark') {
        body.style.backgroundColor = '#121212';
        content.style.backgroundColor = '#1e1e1e';
        content.style.color = 'white';
        logo.src = 'byui-logo-dark-mode.png';
    } else {
        body.style.backgroundColor = '';
        content.style.backgroundColor = 'white';
        content.style.color = '';
        logo.src = 'byui-logo-blue.webp';
    }
}
