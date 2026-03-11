document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    import('./navigation.js').then(module => module.initNavigation());

    // Initialize animations
    import('./animations.js').then(module => module.initAnimations());

    // Initialize form validation
    import('./form-validation.js').then(module => module.initFormValidation());
});
