// Fake analytics counter animation
class FakeAnalytics {
    constructor() {
        this.users = 2;
        this.downloads = 17;
        this.satisfaction = 127;
        this.init();
    }
    
    init() {
        this.animateCounter('user-count', this.users, 2000);
        this.animateCounter('download-count', this.downloads, 2500);
        this.animateCounter('satisfaction-rate', this.satisfaction, 3000);
        
        // Randomly increment counters
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.users++;
                this.updateCounter('user-count', this.users);
            }
            if (Math.random() > 0.8) {
                this.downloads++;
                this.updateCounter('download-count', this.downloads);
            }
        }, 5000);
    }
    
    animateCounter(id, target, duration) {
        const element = document.getElementById(id);
        if (!element) return;
        
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(start);
        }, 16);
    }
    
    updateCounter(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
            element.classList.add('pulse');
            setTimeout(() => element.classList.remove('pulse'), 600);
        }
    }
}

// Initialize fake analytics when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FakeAnalytics();
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .pulse {
        animation: pulse 0.6s ease-in-out;
    }
    
    /* Counter styling */
    #user-count,
    #download-count,
    #satisfaction-rate {
        font-weight: 700;
        color: var(--primary-green);
        display: inline-block;
    }
`;
document.head.appendChild(pulseStyle);