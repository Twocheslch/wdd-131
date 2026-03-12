// Function to handle navigation and page switching
function showPage(pageId) {
    // 1. Get all subpage sections
    const pages = document.querySelectorAll('.subpage');
    
    // 2. Hide all pages by removing the 'active-page' class
    pages.forEach(page => {
        page.classList.remove('active-page');
    });

    // 3. Show the selected page by adding the 'active-page' class
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active-page');
    }

    // 4. Update Navigation Styling
    // Remove active class from all links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the clicked link (based on the ID passed)
    const activeLink = document.getElementById('link-' + pageId);
    if (activeLink) {
        activeLink.classList.add('active');
        
        // Optional: Scroll to top when changing pages
        window.scrollTo(0, 0);
    }
}

// Initialize the website by loading the home page automatically
document.addEventListener("DOMContentLoaded", () => {
    showPage('home');
});
