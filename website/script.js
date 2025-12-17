document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // L'élément est visible à 20%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Arrête d'observer une fois l'animation déclenchée
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });

    // Modal functionality
    const navItems = document.querySelectorAll('.bottom-nav .nav-item[data-modal-target]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal .close-button');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to the clicked item
            item.classList.add('active');

            // Hide all modals
            modals.forEach(modal => modal.style.display = 'none');

            // Show the target modal
            const targetModalId = item.dataset.modalTarget;
            const targetModal = document.getElementById(targetModalId);
            if (targetModal) {
                targetModal.style.display = 'flex'; // Use flex to center content
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking outside the modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Smooth scroll for all nav-items that are anchor links
    document.querySelectorAll('.bottom-nav a.nav-item[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Remove active class from all nav items
            document.querySelectorAll('.bottom-nav .nav-item').forEach(nav => nav.classList.remove('active'));
            // Add active class to the clicked item
            this.classList.add('active');
        });
    });

    // Typewriter effect for the main slogan
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const textToType = typewriterElement.textContent;
        typewriterElement.textContent = ''; // Clear the text initially

        let i = 0;
        const speed = 50; // Typing speed in milliseconds

        function typeWriter() {
            if (i < textToType.length) {
                typewriterElement.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }

        // Trigger the typewriter effect when the element becomes visible
        const typewriterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target); // Stop observing once animation starts
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

        typewriterObserver.observe(typewriterElement);
    }
});