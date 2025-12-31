// Scroll Effects and Parallax
document.addEventListener('DOMContentLoaded', () => {
    // Parallax scrolling
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Navbar hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        // Scroll-triggered animations
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    });
    
    // Smooth scroll for anchor links
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
    
    // Horizontal scroll sections
    const horizontalSections = document.querySelectorAll('.horizontal-scroll-section');
    horizontalSections.forEach(section => {
        let isScrolling = false;
        
        section.addEventListener('wheel', (e) => {
            if (isScrolling) return;
            
            e.preventDefault();
            isScrolling = true;
            
            const scrollAmount = e.deltaY;
            section.scrollLeft += scrollAmount;
            
            setTimeout(() => {
                isScrolling = false;
            }, 100);
        });
    });
    
    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 10000;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // Stagger animation for cards
    const cardContainers = document.querySelectorAll('.dashboard-grid, .search-results');
    cardContainers.forEach(container => {
        const cards = container.querySelectorAll('.glass-card, .result-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in-up');
        });
    });
});

