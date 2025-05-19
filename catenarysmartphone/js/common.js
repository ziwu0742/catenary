// Update current time in status bar
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    const timeElements = document.querySelectorAll('.status-bar-time');
    timeElements.forEach(el => {
        el.textContent = timeString;
    });
}

// Initialize status bar time and set interval to update it
function initStatusBarTime() {
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
}

// Create meteor animation in LED preview
function createMeteor() {
    const ledPreview = document.querySelector('.led-preview');
    if (!ledPreview) return;
    
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    
    // Random position and angle
    const startX = Math.random() * 20;
    const startY = Math.random() * 20;
    meteor.style.top = `${startY}%`;
    meteor.style.left = `${startX}%`;
    meteor.style.transform = `rotate(${Math.random() * 45 + 22.5}deg)`;
    
    ledPreview.appendChild(meteor);
    
    // Remove meteor after animation completes
    setTimeout(() => {
        meteor.remove();
    }, 2000);
}

// Trigger meteor animation
function triggerMeteor() {
    // This function is overridden in nurse_dashboard.html
    // for Z-shaped LED animation
    createMeteor();
}

// Update birth count
function updateBirthCount(count) {
    const birthCountElement = document.getElementById('birth-count');
    if (birthCountElement) {
        birthCountElement.textContent = count;
    }
}

// Increment birth count
function incrementBirthCount() {
    const birthCountElement = document.getElementById('birth-count');
    if (birthCountElement) {
        const currentCount = parseInt(birthCountElement.textContent) || 0;
        updateBirthCount(currentCount + 1);
        triggerMeteor();
        
        // Save to local storage for demo purposes
        localStorage.setItem('birthCount', currentCount + 1);
    }
}

// Initialize birth count from local storage or set to 0
function initBirthCount() {
    const storedCount = localStorage.getItem('birthCount') || 0;
    updateBirthCount(storedCount);
}

// Simulate heartbeat detection
function simulateHeartbeat() {
    const heartbeatContainer = document.querySelector('.heartbeat-container');
    if (!heartbeatContainer) return;
    
    // Generate random BPM between 60-100
    const bpm = Math.floor(Math.random() * 40) + 60;
    const bpmElement = document.getElementById('bpm-value');
    if (bpmElement) {
        bpmElement.textContent = bpm;
    }
    
    // Generate random HRV between 20-80
    const hrv = Math.floor(Math.random() * 60) + 20;
    const hrvElement = document.getElementById('hrv-value');
    if (hrvElement) {
        hrvElement.textContent = hrv;
    }
    
    // Update pulse animation speed based on BPM
    const heartbeatIcon = document.querySelector('.heartbeat-icon');
    if (heartbeatIcon) {
        const animationDuration = 60 / bpm;
        heartbeatIcon.style.animationDuration = `${animationDuration}s`;
    }
}

// Select color option
function selectColor(element) {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    element.classList.add('selected');
    
    // Get selected color and update LED preview
    const color = window.getComputedStyle(element).backgroundColor;
    const ledPreview = document.querySelector('.led-preview');
    if (ledPreview) {
        ledPreview.style.boxShadow = `0 0 30px ${color}`;
    }
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    initStatusBarTime();
    
    // Set up event listeners
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectColor(this);
        });
    });
    
    const heartbeatStartButton = document.getElementById('heartbeat-start');
    if (heartbeatStartButton) {
        heartbeatStartButton.addEventListener('click', function() {
            this.textContent = 'Measuring...';
            this.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                simulateHeartbeat();
                document.getElementById('heartbeat-results').classList.remove('hidden');
                this.textContent = 'Measure Again';
                this.disabled = false;
            }, 3000);
        });
    }
}); 