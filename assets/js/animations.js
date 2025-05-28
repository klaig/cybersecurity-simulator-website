// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
});

// Add animation classes to CSS
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transition: opacity 0.6s ease-out;
    }

    .fade-in.animate-in {
        opacity: 1;
    }

    .slide-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .slide-up.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .scale-in {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .scale-in.animate-in {
        opacity: 1;
        transform: scale(1);
    }

    /* Stagger animations for grid items */
    .feature-grid > *,
    .problem-grid > *,
    .category-grid > *,
    .testimonial-grid > *,
    .specs-grid > * {
        transition-delay: calc(var(--item-index, 0) * 100ms);
    }
`;
document.head.appendChild(style);

// Set animation delays for grid items
document.addEventListener('DOMContentLoaded', function() {
    const grids = document.querySelectorAll('.feature-grid, .problem-grid, .category-grid, .testimonial-grid, .specs-grid');

    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });
    });
});

// Add subtle hover animations
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);