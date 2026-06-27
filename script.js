// Form validation and dynamic year
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Contact form handling
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            // Simple validation
            if (!name || !email || !message) {
                showStatus('Proszę wypełnić wszystkie pola.', 'error');
                return;
            }

            // Basic email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showStatus('Proszę podać poprawny adres email.', 'error');
                return;
            }

            // Simulate successful submission (in real app, you'd send to a server)
            showStatus('Dziękujemy! Twoja wiadomość została wysłana.', 'success');
            form.reset();

            // Hide status after 5 seconds
            setTimeout(() => {
                status.style.display = 'none';
            }, 5000);
        });
    }

    function showMessage(message, type) {
        if (status) {
            status.textContent = message;
            status.className = `form-status ${type}`;
            status.style.display = 'block';
        }
    }
});