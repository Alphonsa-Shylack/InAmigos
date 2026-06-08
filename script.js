// Empty script file for future animations, parallax, and mobile menu
document.addEventListener("DOMContentLoaded", () => {
    // Parallax effect for hero shapes on mousemove
    const heroSection = document.querySelector('.hero-section');
    const shapes = document.querySelectorAll('.shape');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX) / 50;
            const y = (window.innerHeight - e.pageY) / 50;

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 1.5;
                shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If it's a stat card, trigger counter animation
                if (entry.target.classList.contains('pop-in-element')) {
                    const numberEl = entry.target.querySelector('.stat-number');
                    if (numberEl && !numberEl.classList.contains('counted')) {
                        animateCounter(numberEl);
                        numberEl.classList.add('counted');
                    }
                }
                
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.slide-up-element, .slide-left-element, .slide-right-element, .pop-in-element');
    animatedElements.forEach(el => observer.observe(el));

    // Number Counter Animation Function
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.innerText = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.innerText = target.toLocaleString();
            }
        };

        updateCounter();
    }

    // Horizontal Carousel Drag to Scroll
    const carousel = document.querySelector('.projects-carousel-container');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            carousel.scrollLeft = scrollLeft - walk;
        });
    }

    // Apply Drag to Scroll to Testimonials too
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        let isDownT = false;
        let startXT;
        let scrollLeftT;

        testimonialSlider.addEventListener('mousedown', (e) => {
            isDownT = true;
            testimonialSlider.style.cursor = 'grabbing';
            startXT = e.pageX - testimonialSlider.offsetLeft;
            scrollLeftT = testimonialSlider.scrollLeft;
        });
        testimonialSlider.addEventListener('mouseleave', () => {
            isDownT = false;
            testimonialSlider.style.cursor = 'grab';
        });
        testimonialSlider.addEventListener('mouseup', () => {
            isDownT = false;
            testimonialSlider.style.cursor = 'grab';
        });
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDownT) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startXT) * 2;
            testimonialSlider.scrollLeft = scrollLeftT - walk;
        });
        // Default cursor
        testimonialSlider.style.cursor = 'grab';
    }
});
