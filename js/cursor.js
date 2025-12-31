// Custom Cursor Effects
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (!cursor || !cursorTrail) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    // Create trail particles
    const trailParticles = [];
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(particle);
        trailParticles.push({
            element: particle,
            x: 0,
            y: 0,
            delay: i * 0.05
        });
    }
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animate trail
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        // Update trail particles
        trailParticles.forEach((particle, index) => {
            const delay = particle.delay;
            const targetX = mouseX - (mouseX - trailX) * (1 - delay);
            const targetY = mouseY - (mouseY - trailY) * (1 - delay);
            
            particle.x += (targetX - particle.x) * 0.2;
            particle.y += (targetY - particle.y) * 0.2;
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = '0.5';
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .form-input');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(0, 119, 182, 0.3)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(0, 119, 182, 0.1)';
        });
    });
    
    // Hide default cursor on interactive elements
    interactiveElements.forEach(element => {
        element.style.cursor = 'none';
    });
});

