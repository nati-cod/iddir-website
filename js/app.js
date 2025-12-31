// Main App Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize app
    initApp();
    
    // Hide skeleton loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('skeletonLoader');
            if (loader) {
                loader.classList.add('hidden');
            }
        }, 1000);
    });
    
    // Navigation smooth scroll
    initNavigation();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Button interactions
    initButtonInteractions();
});

function initApp() {
    // Initialize localStorage if empty
    if (!localStorage.getItem('iddirs')) {
        localStorage.setItem('iddirs', '[]');
    }
    
    // Initialize users if empty
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', '[]');
    }
    
    // Check authentication
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        updateAuthUI(JSON.parse(currentUser));
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const offCanvasMenu = document.getElementById('offCanvasMenu');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuToggle && offCanvasMenu && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            offCanvasMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    const closeMenu = () => {
        if (offCanvasMenu) {
            offCanvasMenu.classList.remove('active');
        }
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    };
    
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking on mobile menu links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMenu, 300);
        });
    });
}

function initButtonInteractions() {
    const getStartedBtn = document.getElementById('getStartedBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const authBtn = document.getElementById('authBtn');
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            document.querySelector('#create').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            document.querySelector('#search').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    if (authBtn) {
        authBtn.addEventListener('click', () => {
            showAuthModal();
        });
    }
}

function showAuthModal() {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content glass-card">
            <button class="modal-close">&times;</button>
            <h2>Login / Register</h2>
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">Login</button>
                <button class="auth-tab" data-tab="register">Register</button>
            </div>
            <form class="auth-form" id="authForm">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-input" name="email" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-input" name="password" required>
                </div>
                <div class="form-group" id="confirmPasswordGroup" style="display: none;">
                    <label>Confirm Password</label>
                    <input type="password" class="form-input" name="confirmPassword">
                </div>
                <button type="submit" class="btn-primary neon-glow">Submit</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Tab switching
    const authTabs = modal.querySelectorAll('.auth-tab');
    const confirmPasswordGroup = modal.querySelector('#confirmPasswordGroup');
    const confirmPasswordInput = modal.querySelector('input[name="confirmPassword"]');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const isRegister = tab.dataset.tab === 'register';
            confirmPasswordGroup.style.display = isRegister ? 'block' : 'none';
            if (isRegister) {
                confirmPasswordInput.required = true;
            } else {
                confirmPasswordInput.required = false;
            }
        });
    });
    
    // Form submission
    const authForm = modal.querySelector('#authForm');
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(authForm);
        const isRegister = modal.querySelector('.auth-tab.active').dataset.tab === 'register';
        
        if (isRegister) {
            handleRegister(formData);
        } else {
            handleLogin(formData);
        }
        
        modal.remove();
    });
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.remove();
    });
    
    // Add modal styles
    if (!document.querySelector('#auth-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'auth-modal-styles';
        style.textContent = `
            .auth-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }
            .modal-content {
                position: relative;
                z-index: 1;
                max-width: 400px;
                width: 90%;
                animation: modalSlideIn 0.3s ease;
            }
            .modal-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-primary);
            }
            .auth-tabs {
                display: flex;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            .auth-tab {
                flex: 1;
                padding: 0.8rem;
                background: transparent;
                border: 2px solid var(--glass-border);
                border-radius: 10px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            .auth-tab.active {
                background: var(--primary-color);
                color: white;
                border-color: var(--primary-color);
            }
            @keyframes modalSlideIn {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function handleLogin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthUI(user);
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid credentials!', 'error');
    }
}

function handleRegister(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showNotification('Email already registered!', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        email,
        password,
        createdAt: new Date().toISOString(),
        createdIddirs: [],
        joinedIddirs: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    updateAuthUI(newUser);
    showNotification('Registration successful!', 'success');
}

function updateAuthUI(user) {
    const authBtn = document.getElementById('authBtn');
    if (authBtn && user) {
        authBtn.textContent = user.email.split('@')[0];
        authBtn.onclick = () => {
            localStorage.removeItem('currentUser');
            authBtn.textContent = 'Login';
            authBtn.onclick = () => showAuthModal();
            showNotification('Logged out successfully!', 'success');
        };
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#00b894' : type === 'error' ? '#d90429' : '#0077b6'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

