// Humorous alerts for various interactions
const humorousMessages = [
    "Oled kindel? See võib muuta su elu 127% paremaks!",
    "TÄHELEPANU: See nupp töötab! Uskumatu, eks?",
    "Klikk registreeritud. NSA-le saadetud. (Nali!)",
    "Error 404: Huumor not found. Aga simulaator töötab!",
    "Oota... kas sa tõesti usud, et see midagi teeb?",
    "Õnnitleme! Sa oled meie 3. kasutaja! (Teised kaks on testijad)",
    "See funktsioon on veel pre-alpha-pre-beta faasis",
    "JavaFX on tuleviku tehnoloogia! (Aastast 2008)",
    "Hoiatus: Liiga palju klikke võib põhjustada sõltuvust",
    "Fun fact: 60% ajast töötab see 100% ajast"
];

function getRandomMessage() {
    return humorousMessages[Math.floor(Math.random() * humorousMessages.length)];
}

// Add alerts to various elements
function addHumorousAlerts() {
    // Alert for logo clicks
    document.querySelectorAll('.nav-brand').forEach(brand => {
        brand.addEventListener('click', function(e) {
            if (Math.random() > 0.7) { // 30% chance
                e.preventDefault();
                alert("KyberSim™ - Kus iga klikk on investeering tulevikku!");
                setTimeout(() => window.location.href = this.href, 100);
            }
        });
    });
    
    // Alert for CTA buttons
    document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
        if (!btn.classList.contains('download-btn')) {
            btn.addEventListener('click', function(e) {
                if (Math.random() > 0.6) { // 40% chance
                    e.preventDefault();
                    alert(getRandomMessage());
                    setTimeout(() => {
                        if (this.href) window.location.href = this.href;
                    }, 100);
                }
            });
        }
    });
    
    // Alert for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function() {
            if (Math.random() > 0.8) { // 20% chance
                alert("See funktsioon on 200% efektiivsem kui konkurentidel!\n\n*Konkurente pole");
            }
        });
    });
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    addHumorousAlerts();
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current navigation item
const currentLocation = location.pathname;
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    if(link.getAttribute('href') === currentLocation || 
       (currentLocation === '/' && link.getAttribute('href') === '/index.html') ||
       (currentLocation.endsWith('index.html') && link.getAttribute('href') === '/')){
        link.classList.add('active');
    }
});

// Gallery Filter (for screenshots page)
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 10);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
    
    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('.lightbox-image');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (lightbox && lightboxImg && img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox?.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ESC key to close lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
            closeLightbox();
        }
    });
});

// Hero image toggle between fake and real
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.getElementById('heroImage');
    const heroImageContainer = document.getElementById('heroImageContainer');
    let isShowingReal = false;
    
    function toggleImage() {
        if (!isShowingReal) {
            heroImage.src = '/assets/images/screenshots/Peamenuu.png';
            heroImage.alt = 'KyberSim tegelik interface';
            alert("HOIATUS: Näed nüüd TEGELIKKU produkti!\n\nMeie turundusmeeskond ei vastuta emotsionaalse kahju eest.");
        } else {
            heroImage.src = '/assets/images/hero/app-screenshot.svg';
            heroImage.alt = 'KyberSim Interface';
            alert("Ahh, palju parem! Tagasi fantaasiamaailma 🦄");
        }
        isShowingReal = !isShowingReal;
    }
    
    if (heroImageContainer && heroImage) {
        heroImageContainer.style.cursor = 'pointer';
        heroImageContainer.addEventListener('click', toggleImage);
    }
});

// Handle download buttons - download screenshot instead
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-btn, a[href="/download.html"]');
    
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('download-btn') || this.href.includes('/download.html')) {
                e.preventDefault();
                
                // Show alert first
                alert("Õnnitleme! Sa laadid alla revolutsioonilise PNG faili!\n\nP.S. Päris simulaator on veel 'coming soon' faasis (aastast 2023)");
                
                // Create download link for screenshot
                const link = document.createElement('a');
                link.href = '/assets/images/screenshots/Peamenuu.png';
                link.download = 'KyberSim-Enterprise-Edition-v127.0.png';
                link.click();
                
                // If it's a navigation link, still navigate after download
                if (this.href && this.href.includes('/download.html')) {
                    setTimeout(() => {
                        window.location.href = this.href;
                    }, 100);
                }
            }
        });
    });
});