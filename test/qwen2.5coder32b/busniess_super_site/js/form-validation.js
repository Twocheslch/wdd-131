export function initFormValidation() {
    const form = document.querySelector('.contact-form');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            validateForm(form);
        });
    }
}

function validateForm(form) {
    let isValid = true;

    // Clear previous error messages
    form.querySelectorAll('.error-message').forEach(msg => msg.remove());

    // Validate name
    const nameInput = form.querySelector('#name');
    if (!nameInput.value.trim()) {
        isValid = false;
        showError(nameInput, 'Name is required.');
    }

    // Validate email
    const emailInput = form.querySelector('#email');
    if (!validateEmail(emailInput.value)) {
        isValid = false;
        showError(emailInput, 'Please enter a valid email address.');
    }

    // Validate message
    const messageInput = form.querySelector('#message');
    if (!messageInput.value.trim()) {
        isValid = false;
        showError(messageInput, 'Message is required.');
    }

    // If all validations pass, submit the form
    if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showError(input, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    input.parentNode.appendChild(errorMessage);
}
