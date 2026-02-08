// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('visitorName');
    const enterBtn = document.getElementById('enterBtn');
    const guestBtn = document.getElementById('guestBtn');
    const errorMessage = document.getElementById('errorMessage');

    // Check if user already visited
    checkExistingVisitor();

    // Enter button click handler
    enterBtn.addEventListener('click', handleEnter);

    // Guest button click handler
    guestBtn.addEventListener('click', handleGuest);

    // Enter key press handler
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleEnter();
        }
    });

    // Remove error on input
    nameInput.addEventListener('input', () => {
        nameInput.classList.remove('error');
        errorMessage.classList.remove('show');
    });

    // Auto-focus input
    nameInput.focus();
});

// Check if visitor data already exists
function checkExistingVisitor() {
    const visitorName = getVisitorName();
    
    if (visitorName) {
        // User already entered name, redirect to portfolio
        redirectToPortfolio();
    }
}

// Handle Enter button click
function handleEnter() {
    const nameInput = document.getElementById('visitorName');
    const errorMessage = document.getElementById('errorMessage');
    const enterBtn = document.getElementById('enterBtn');
    const name = nameInput.value.trim();

    // Validate name
    if (!name) {
        showError('Please enter your name');
        return;
    }

    if (name.length < 2) {
        showError('Name must be at least 2 characters');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError('Name should contain only letters');
        return;
    }

    // Save name and redirect
    saveVisitorName(name);
    
    // Show loading state
    enterBtn.classList.add('loading');
    
    // Redirect after short delay for smooth transition
    setTimeout(() => {
        redirectToPortfolio();
    }, 500);
}

// Handle Guest button click
function handleGuest() {
    const guestBtn = document.getElementById('guestBtn');
    
    // Save as Guest
    saveVisitorName('Guest');
    
    // Show loading effect
    guestBtn.textContent = 'Loading...';
    
    // Redirect
    setTimeout(() => {
        redirectToPortfolio();
    }, 500);
}

// Show error message
function showError(message) {
    const nameInput = document.getElementById('visitorName');
    const errorMessage = document.getElementById('errorMessage');
    
    nameInput.classList.add('error');
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorMessage.classList.remove('show');
        nameInput.classList.remove('error');
    }, 3000);
}

// Save visitor name to sessionStorage
function saveVisitorName(name) {
    // SessionStorage - data persists only for current session
    sessionStorage.setItem('visitorName', name);
    
    // Also save to localStorage for longer persistence (optional)
    // localStorage.setItem('visitorName', name);
    
    // Save timestamp
    sessionStorage.setItem('visitTime', new Date().toISOString());
}

// Get visitor name from storage
function getVisitorName() {
    // Check sessionStorage first
    let name = sessionStorage.getItem('visitorName');
    
    // If not in session, check localStorage (optional)
    // if (!name) {
    //     name = localStorage.getItem('visitorName');
    // }
    
    return name;
}

// Redirect to main portfolio
function redirectToPortfolio() {
    // Add page transition effect
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    
    // Redirect after fade out
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Optional: Clear visitor data (for logout feature)
function clearVisitorData() {
    sessionStorage.removeItem('visitorName');
    sessionStorage.removeItem('visitTime');
    // localStorage.removeItem('visitorName'); // If using localStorage
}

// Add typing effect to placeholder (optional enhancement)
function animatePlaceholder() {
    const nameInput = document.getElementById('visitorName');
    const placeholders = [
        'Enter your name to continue...',
        'What should I call you?',
        'Your name please...',
        'May I know your name?'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        if (!nameInput.value) {
            nameInput.placeholder = placeholders[currentIndex];
            currentIndex = (currentIndex + 1) % placeholders.length;
        }
    }, 3000);
}

// Initialize placeholder animation
animatePlaceholder();