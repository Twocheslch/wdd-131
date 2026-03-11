const counters = document.querySelectorAll('.counter');
const revealItems = document.querySelectorAll('.section-heading, .card, .gallery-item');

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target) || 0;
  const duration = 1400;
  const stepTime = 16;
  const steps = Math.max(Math.floor(duration / stepTime), 1);
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      counter.textContent = String(target);
      clearInterval(timer);
      return;
    }

    counter.textContent = String(Math.floor(current));
  }, stepTime);
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    if (entry.target.classList.contains('counter')) {
      animateCounter(entry.target);
    } else {
      entry.target.classList.add('visible');
    }

    obs.unobserve(entry.target);
  });
}, { threshold: 0.2 });

counters.forEach((counter) => observer.observe(counter));

revealItems.forEach((item) => {
  item.classList.add('reveal');
  observer.observe(item);
});
