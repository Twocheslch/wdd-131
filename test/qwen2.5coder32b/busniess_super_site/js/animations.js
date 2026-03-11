export function initAnimations() {
    // Animate counters when they appear on screen
    document.querySelectorAll('.counter').forEach(counter => {
        const countTo = parseInt(counter.getAttribute('data-count-to'), 10);
        let currentCount = 0;
        let interval = setInterval(() => {
            if (currentCount >= countTo) {
                clearInterval(interval);
            } else {
                currentCount += Math.ceil(countTo / 25); // Adjust increment as needed
                counter.textContent = currentCount.toLocaleString();
            }
        }, 40);
    });
}
