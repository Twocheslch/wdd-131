export function initNavigation() {
    const navButton = document.querySelector('.nav-button');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle navigation menu on button click
    navButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling to sections
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close menu on click outside
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !navButton.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
}
