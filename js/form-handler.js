// Form Handling and Validation
document.addEventListener('DOMContentLoaded', () => {
    const iddirForm = document.getElementById('iddirForm');
    
    if (iddirForm) {
        iddirForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            showSkeletonLoader();
            
            // Get form data
            const formData = new FormData(iddirForm);
            const data = {
                iddirName: formData.get('iddirName'),
                adminName: formData.get('adminName'),
                calendarType: formData.get('calendarType'),
                monthlyPayment: parseFloat(formData.get('monthlyPayment')),
                penaltyAmount: parseFloat(formData.get('penaltyAmount')),
                visibility: formData.get('visibility'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword')
            };
            
            // Validation
            if (data.password !== data.confirmPassword) {
                hideSkeletonLoader();
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            if (data.monthlyPayment <= 0 || data.penaltyAmount <= 0) {
                hideSkeletonLoader();
                showNotification('Payment amounts must be greater than 0!', 'error');
                return;
            }
            
            // Simulate API call
            setTimeout(() => {
                // Save to localStorage (in real app, this would be an API call)
                const iddirs = JSON.parse(localStorage.getItem('iddirs') || '[]');
                const newIddir = {
                    id: Date.now().toString(),
                    ...data,
                    createdAt: new Date().toISOString(),
                    members: [],
                    createdBy: 'current-user' // In real app, get from auth
                };
                
                iddirs.push(newIddir);
                localStorage.setItem('iddirs', JSON.stringify(iddirs));
                
                hideSkeletonLoader();
                showNotification('Iddir created successfully!', 'success');
                iddirForm.reset();
                
                // Animate success
                animateSuccess();
            }, 1500);
        });
    }
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Floating label effect
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

function showSkeletonLoader() {
    const loader = document.getElementById('skeletonLoader');
    if (loader) {
        loader.classList.remove('hidden');
    }
}

function hideSkeletonLoader() {
    const loader = document.getElementById('skeletonLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
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
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
}

function animateSuccess() {
    const form = document.getElementById('iddirForm');
    if (form) {
        form.style.animation = 'successPulse 0.6s ease';
        setTimeout(() => {
            form.style.animation = '';
        }, 600);
    }
    
    // Add success animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes successPulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
                box-shadow: 0 0 30px rgba(0, 184, 148, 0.5);
            }
        }
    `;
    if (!document.querySelector('#success-animation')) {
        style.id = 'success-animation';
        document.head.appendChild(style);
    }
}

