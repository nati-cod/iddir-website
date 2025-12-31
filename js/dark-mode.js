// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Update theme icon
    function updateThemeIcon() {
        const themeIcon = themeToggle.querySelector('.theme-icon');
        if (body.classList.contains('dark-mode')) {
            // Moon icon
            themeIcon.innerHTML = `
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9zM12 19v1M12 4v1M5.636 5.636l.707.707M18.364 18.364l.707.707M1 12h1M20 12h1M5.636 18.364l.707-.707M18.364 5.636l.707-.707"/>
            `;
        } else {
            // Sun icon
            themeIcon.innerHTML = `
                <path class="sun" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
            `;
        }
    }
    
    updateThemeIcon();
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save theme preference
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Update icon with animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
            updateThemeIcon();
        }, 300);
    });
    
    // Smooth transition for theme change
    const style = document.createElement('style');
    style.textContent = `
        body {
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        .theme-toggle {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

