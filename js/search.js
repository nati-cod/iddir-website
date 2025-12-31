// Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const publicSearchForm = document.getElementById('publicSearchForm');
    const privateSearchForm = document.getElementById('privateSearchForm');
    const searchResults = document.getElementById('searchResults');
    
    // Public search
    if (publicSearchForm) {
        publicSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(publicSearchForm);
            const searchTerm = formData.get('iddirName') || publicSearchForm.querySelector('input[type="text"]').value;
            
            performSearch(searchTerm, null, 'public');
        });
    }
    
    // Private search
    if (privateSearchForm) {
        privateSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(privateSearchForm);
            const inputs = privateSearchForm.querySelectorAll('input');
            const searchTerm = inputs[0].value;
            const password = inputs[1].value;
            
            performSearch(searchTerm, password, 'private');
        });
    }
    
    function performSearch(searchTerm, password, searchType) {
        if (!searchTerm.trim()) {
            showNotification('Please enter an iddir name', 'error');
            return;
        }
        
        // Show loading
        showSkeletonLoader();
        
        // Get iddirs from localStorage
        setTimeout(() => {
            const allIddirs = JSON.parse(localStorage.getItem('iddirs') || '[]');
            let results = [];
            
            if (searchType === 'public') {
                results = allIddirs.filter(iddir => 
                    iddir.visibility === 'public' && 
                    iddir.iddirName.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else {
                results = allIddirs.filter(iddir => 
                    iddir.visibility === 'private' && 
                    iddir.iddirName.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    iddir.password === password
                );
            }
            
            hideSkeletonLoader();
            displaySearchResults(results, searchType);
        }, 1000);
    }
    
    function displaySearchResults(results, searchType) {
        if (!searchResults) return;
        
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results glass-card">
                    <p>No ${searchType} iddirs found matching your search.</p>
                </div>
            `;
            searchResults.classList.add('active');
            return;
        }
        
        results.forEach((iddir, index) => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            resultCard.style.animationDelay = `${index * 0.1}s`;
            resultCard.innerHTML = `
                <h3>${iddir.iddirName}</h3>
                <p><strong>Admin:</strong> ${iddir.adminName}</p>
                <p><strong>Monthly Payment:</strong> ${iddir.monthlyPayment} Birr</p>
                <p><strong>Penalty:</strong> ${iddir.penaltyAmount} Birr</p>
                <p><strong>Calendar:</strong> ${iddir.calendarType}</p>
                <p><strong>Members:</strong> ${iddir.members?.length || 0}</p>
                <button class="btn-primary" onclick="viewIddir('${iddir.id}')">View Details</button>
            `;
            searchResults.appendChild(resultCard);
        });
        
        searchResults.classList.add('active');
    }
});

function viewIddir(iddirId) {
    // Navigate to iddir details page
    console.log('Viewing iddir:', iddirId);
    // In a real app, this would navigate to a details page
    showNotification('Iddir details feature coming soon!', 'info');
}

// Helper function from form-handler.js
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
}

