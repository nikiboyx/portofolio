const app = {
    init: function () {
        this.initTyped();
        this.initTheme();
        this.initBackground();
        this.initScrollObserver();
    },

    initTyped: function () {
        if (document.getElementById('typed-role')) {
            new Typed('#typed-role', {
                strings: ['Editor', 'Education Enthusiast', 'Web Developer', 'Content Creator'],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            });
        }

        if (document.getElementById('typed-motto')) {
            new Typed('#typed-motto', {
                strings: ['"Hidup akan susah bila terlalu dipikirkan"'],
                typeSpeed: 40,
                startDelay: 1000,
                showCursor: false
            });
        }
    },

    initTheme: function () {
        const toggleBtn = document.getElementById('theme-toggle');
        const icon = toggleBtn.querySelector('i');
        const body = document.body;

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(icon, savedTheme);

        toggleBtn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Add animation class
            toggleBtn.classList.add('rotate');
            setTimeout(() => {
                toggleBtn.classList.remove('rotate');
            }, 500);

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(icon, newTheme);
        });
    },

    updateThemeIcon: function (icon, theme) {
        if (theme === 'light') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    },

    initBackground: function () {
        const slides = document.querySelectorAll('.bg-slide');
        let currentSlide = 0;

        // If no slides, skip
        if (slides.length === 0) return;

        // Show first slide
        slides[0].classList.add('active');

        setInterval(() => {
            // Remove active from current
            slides[currentSlide].classList.remove('active');

            // Move to next
            currentSlide = (currentSlide + 1) % slides.length;

            // Add active to next
            slides[currentSlide].classList.add('active');
        }, 5000); // Change every 5 seconds
    },

    initScrollObserver: function () {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    entry.target.classList.remove('out-view-top', 'out-view-bottom');

                    // Update Active Nav
                    this.updateActiveNav(entry.target.id);
                } else {
                    entry.target.classList.remove('in-view');
                    // Check scroll direction to determine exit animation
                    if (entry.boundingClientRect.y < 0) {
                        entry.target.classList.add('out-view-top');
                    } else {
                        entry.target.classList.add('out-view-bottom');
                    }
                }
            });
        }, {
            threshold: 0.1 // Lowered from 0.2 to 0.1 to trigger earlier
        });

        sections.forEach(sec => observer.observe(sec));
    },

    updateActiveNav: function (id) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${id}`) {
                item.classList.add('active');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
