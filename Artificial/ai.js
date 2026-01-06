// Generate floating particles around the head (CSS animation uses --tx/--ty)
        function generateParticles() {
            const container = document.getElementById('particles');
            container.innerHTML = '';
            const particleCount = 22;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';

                const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.5;
                const distance = 70 + Math.random() * 120;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                particle.style.left = 'calc(50% - 2px)';
                particle.style.top = 'calc(50% - 2px)';

                const duration = 8 + Math.random() * 6;
                const delay = Math.random() * 4;
                particle.style.animation = `particleFloat ${duration}s ease-in-out ${delay}s infinite`;

                container.appendChild(particle);
            }
        }

        // Initialize AI face interactions: pupil tracking, blinking, head tilt
        function initAIFace() {
            const container = document.getElementById('aiContainer');
            const aiHead = document.getElementById('aiHead');
            const pupilL = document.getElementById('pupilLeft');
            const pupilR = document.getElementById('pupilRight');
            const lidL = document.getElementById('lidLeft');
            const lidR = document.getElementById('lidRight');
            const mouth = document.getElementById('mouthPath');

            if (!container || !pupilL || !pupilR) return;

            // helper for limiting values
            const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const max = 10; // max pupil offset
                const dx = clamp(((e.clientX - cx) / rect.width) * max * 2, -max, max);
                const dy = clamp(((e.clientY - cy) / rect.height) * max * 2, -max, max);

                // move pupils via SVG transform
                pupilL.setAttribute('transform', `translate(${dx}, ${dy})`);
                pupilR.setAttribute('transform', `translate(${dx}, ${dy})`);

                // gentle 3D tilt
                aiHead.style.transform = `rotateX(${(-dy * 0.6)}deg) rotateY(${dx * 0.8}deg)`;
            });

            container.addEventListener('mouseleave', () => {
                pupilL.setAttribute('transform', `translate(0, 0)`);
                pupilR.setAttribute('transform', `translate(0, 0)`);
                aiHead.style.transform = '';
            });

            // blinking (lid drop)
            function blinkOnce() {
                lidL.classList.add('blink');
                lidR.classList.add('blink');
                setTimeout(() => {
                    lidL.classList.remove('blink');
                    lidR.classList.remove('blink');
                }, 160 + Math.random() * 120);
            }

            // random blink interval
            let blinkTimer = setInterval(blinkOnce, 2500 + Math.random() * 3000);

            // mouth micro-expression loop (adjusted to new face coordinates)
            setInterval(() => {
                mouth.setAttribute('d', 'M60 150 q50 20 100 0');
                setTimeout(() => mouth.setAttribute('d', 'M60 150 q50 30 100 0'), 600);
            }, 2600 + Math.random() * 2200);
        }

        // Generate space stars
        function generateSpaceStars() {
            const starsContainer = document.getElementById('spaceStars');
            const starCount = 100;

            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (2 + Math.random() * 3) + 's';
                starsContainer.appendChild(star);
            }
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Initialize on load
        window.addEventListener('load', () => {
            generateSpaceStars();
            generateParticles();
            initAIFace();
        });