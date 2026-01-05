// Initialize EmailJS
        emailjs.init('9LFH5CiQlDDU6rV4m');

        // Background particles
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 30;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (15 + Math.random() * 20) + 's';
                container.appendChild(particle);
            }
        }

        // FAQ toggle
        function toggleFAQ(element) {
            const wasActive = element.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            if (!wasActive) {
                element.classList.add('active');
            }
        }

        // Contact form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const name = document.querySelector('input[name="name"]').value.trim();
                const email = document.querySelector('input[name="email"]').value.trim();
                const message = document.querySelector('textarea[name="comment"]').value.trim();

                if (!name || !email || !message) {
                    alert('Please fill in all fields.');
                    return;
                }

                console.log('Sending email with:', { name, email, message });

                emailjs.send('service_6i5blxb', 'template_5sv8p2l', {
                    from_name: name,
                    from_email: email,
                    message: message
                },'9LFH5CiQlDDU6rV4m')
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    alert('Message sent successfully!');
                    contactForm.reset();
                }, function(error) {
                    console.error('EmailJS error:', error);
                    alert('Failed to send message. Please try again.');
                });
            });
        } else {
            console.error('Contact form not found');
        }

        // Initialize
        createParticles();