const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate: (value) => value.trim().length >= 2,
      message: 'Please enter at least 2 characters for your name.'
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: 'Please enter a valid email address.'
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate: (value) => value.trim().length >= 15,
      message: 'Please provide at least 15 characters about your project.'
    }
  };

  const validateField = ({ input, error, validate, message }) => {
    const isValid = validate(input.value);
    error.textContent = isValid ? '' : message;
    input.setAttribute('aria-invalid', String(!isValid));
    return isValid;
  };

  Object.values(fields).forEach((field) => {
    field.input.addEventListener('blur', () => validateField(field));
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const allValid = Object.values(fields).every((field) => validateField(field));
    const successMessage = document.getElementById('form-success');

    if (!allValid) {
      successMessage.textContent = '';
      return;
    }

    successMessage.textContent = 'Thanks! Your inquiry has been validated and is ready to be sent to a server endpoint.';
    contactForm.reset();

    Object.values(fields).forEach(({ input, error }) => {
      input.setAttribute('aria-invalid', 'false');
      error.textContent = '';
    });
  });
}
