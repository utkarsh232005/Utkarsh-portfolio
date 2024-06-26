document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a, .gallery a');
    const galleryLinks = document.querySelectorAll('.gallery a');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for internal links
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== '') {
                e.preventDefault();
                const hash = this.hash;
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Blur effect for gallery images
    galleryLinks.forEach(link => {
        link.addEventListener('click', function() {
            galleryLinks.forEach(otherLink => {
                if (otherLink !== link) {
                    const img = otherLink.querySelector('img');
                    img.style.transition = 'filter 0.3s ease-in-out'; // Add transition
                    img.style.filter = 'blur(5px)';
                }
            });
        });
    });

    // Remove blur effect when clicking outside the gallery links
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.gallery a')) {
            galleryLinks.forEach(link => {
                const img = link.querySelector('img');
                img.style.transition = 'filter 0.3s ease-in-out'; // Add transition
                img.style.filter = 'none';
            });
        }
    });

    // Fade-in effect for sections
    const options = {
        threshold: 0.5
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.style.transition = 'opacity 0.5s ease-in-out'; // Add transition
            entry.target.style.opacity = 1;
            observer.unobserve(entry.target);
        });
    }, options);
    sections.forEach(section => {
        observer.observe(section);
    });
});
