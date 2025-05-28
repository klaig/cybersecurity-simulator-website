// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImage = document.getElementById('lightboxImage') || lightbox?.querySelector('img');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    if (item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;

            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    // Close lightbox on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Load more functionality
    let additionalItemsLoaded = false;

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            if (!additionalItemsLoaded) {
                // Additional gallery items to load
                const additionalItems = [
                    {
                        category: 'stsenaariumid',
                        image: '/assets/images/screenshots/placeholder-9.jpg',
                        title: 'WiFi Security Master',
                        description: 'Õpi, miks "FreeWiFi123" pole turvaline'
                    },
                    {
                        category: 'statistika',
                        image: '/assets/images/screenshots/placeholder-10.jpg',
                        title: 'Leaderboard Elite',
                        description: 'Top 3 kasutajat (kokku on 3)'
                    },
                    {
                        category: 'tulemused',
                        image: '/assets/images/screenshots/placeholder-11.jpg',
                        title: 'Certificate Generator',
                        description: 'Print oma diplom Comic Sans fondiga'
                    },
                    {
                        category: 'peamenyy',
                        image: '/assets/images/screenshots/placeholder-12.jpg',
                        title: 'Settings Extravaganza',
                        description: 'Toggle switches that actually work!'
                    }
                ];

                const galleryGrid = document.querySelector('.gallery-grid');

                additionalItems.forEach((item, index) => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.setAttribute('data-category', item.category);
                    galleryItem.style.opacity = '0';
                    galleryItem.style.transform = 'translateY(20px)';

                    galleryItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="gallery-overlay">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    `;

                    galleryGrid.appendChild(galleryItem);

                    // Animate in
                    setTimeout(() => {
                        galleryItem.classList.add('slide-up');
                        galleryItem.style.opacity = '1';
                        galleryItem.style.transform = 'translateY(0)';
                    }, index * 100);

                    // Add click event for lightbox
                    galleryItem.addEventListener('click', () => {
                        const img = galleryItem.querySelector('img');
                        const title = galleryItem.querySelector('h3').textContent;
                        const description = galleryItem.querySelector('p').textContent;

                        lightboxImage.src = img.src;
                        lightboxImage.alt = img.alt;
                        lightboxTitle.textContent = title;
                        lightboxDescription.textContent = description;

                        lightbox.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    });
                });

                // Update button
                loadMoreBtn.innerHTML = '<span>Kõik pildid laetud!</span>';
                loadMoreBtn.disabled = true;
                additionalItemsLoaded = true;
            }
        });
    }
});