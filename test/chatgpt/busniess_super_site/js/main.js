const themeToggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}

if (themeToggle) {
  const updateThemeIcon = () => {
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isDark ? 'Activate light mode' : 'Activate dark mode');
  };

  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  });
}

const renderServiceCard = (service) => {
  const article = document.createElement('article');
  article.className = 'card service-card';
  article.dataset.category = service.category;

  article.innerHTML = `
    <span class="service-tag">${service.category}</span>
    <h3>${service.title}</h3>
    <p>${service.description}</p>
    <div class="service-meta">
      <span>${service.timeline}</span>
      <span>${service.price}</span>
    </div>
    <button class="service-toggle" type="button" aria-expanded="false">View details</button>
    <div class="service-details">
      <p>${service.details}</p>
      <ul class="feature-list">
        ${service.features.map((feature) => `<li>${feature}</li>`).join('')}
      </ul>
    </div>
  `;

  return article;
};

const renderFeaturedCard = (service) => {
  const article = document.createElement('article');
  article.className = 'card featured-card';

  article.innerHTML = `
    <span class="service-tag">${service.category}</span>
    <h3>${service.title}</h3>
    <p>${service.description}</p>
    <a class="btn btn-secondary" href="services.html">Learn More</a>
  `;

  return article;
};

const loadServices = async () => {
  try {
    const response = await fetch('data/services.json');
    if (!response.ok) {
      throw new Error('Unable to load services data.');
    }

    const services = await response.json();

    const servicesList = document.getElementById('services-list');
    const featuredServices = document.getElementById('featured-services');

    if (featuredServices) {
      featuredServices.innerHTML = '';
      services.slice(0, 3).forEach((service) => {
        featuredServices.appendChild(renderFeaturedCard(service));
      });
    }

    if (servicesList) {
      servicesList.innerHTML = '';
      services.forEach((service) => {
        servicesList.appendChild(renderServiceCard(service));
      });

      servicesList.addEventListener('click', (event) => {
        const button = event.target.closest('.service-toggle');
        if (!button) return;

        const card = button.closest('.service-card');
        const isExpanded = card.classList.toggle('expanded');
        button.setAttribute('aria-expanded', String(isExpanded));
        button.textContent = isExpanded ? 'Hide details' : 'View details';
      });

      const filterContainer = document.getElementById('service-filters');
      if (filterContainer) {
        filterContainer.addEventListener('click', (event) => {
          const button = event.target.closest('.filter-btn');
          if (!button) return;

          const filter = button.dataset.filter;
          document.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
          button.classList.add('active');

          document.querySelectorAll('.service-card').forEach((card) => {
            const matches = filter === 'all' || card.dataset.category === filter;
            card.style.display = matches ? 'block' : 'none';
          });
        });
      }
    }
  } catch (error) {
    const serviceTargets = [document.getElementById('services-list'), document.getElementById('featured-services')];
    serviceTargets.forEach((target) => {
      if (target) {
        target.innerHTML = `<p>${error.message}</p>`;
      }
    });
  }
};

loadServices();

const galleryItems = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
let currentImageIndex = 0;

const openLightbox = (index) => {
  if (!lightbox || !lightboxImage || galleryItems.length === 0) return;
  currentImageIndex = index;
  lightboxImage.src = galleryItems[currentImageIndex].dataset.image;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
};

const showRelativeImage = (direction) => {
  currentImageIndex = (currentImageIndex + direction + galleryItems.length) % galleryItems.length;
  lightboxImage.src = galleryItems[currentImageIndex].dataset.image;
};

if (galleryItems.length > 0) {
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
}

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', () => showRelativeImage(-1));
lightboxNext?.addEventListener('click', () => showRelativeImage(1));

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('open')) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showRelativeImage(-1);
  if (event.key === 'ArrowRight') showRelativeImage(1);
});

const faqList = document.getElementById('faq-list');
if (faqList) {
  faqList.addEventListener('click', (event) => {
    const question = event.target.closest('.faq-question');
    if (!question) return;

    const faqItem = question.closest('.faq-item');
    const isOpen = faqItem.classList.toggle('open');
    question.setAttribute('aria-expanded', String(isOpen));
  });
}
