let minimumDelay = 3000; // 3 seconds
let startTime = Date.now();
let hiddenElements = []; // Store elements we need to reveal later

document.addEventListener('DOMContentLoaded', () => {
    // Store and hide content elements
    hiddenElements = Array.from(document.querySelectorAll('body > *:not(.loadingOverlay)'));
    hiddenElements.forEach(el => {
        el.style.visibility = 'hidden';
    });
    
    // Configure loading overlay
    const loader = document.querySelector('.loadingOverlay');
    loader.style.visibility = 'visible';
    loader.style.display = 'flex';
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
});

window.addEventListener('load', () => {    
    const loadingScreen = document.querySelector('.loadingOverlay');
    const elapsedTime = Date.now() - startTime;

    const revealContent = () => {
        // Fade out loader
        loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            // Hide loader completely
            loadingScreen.style.display = 'none';
            
            // Reveal all hidden content
            hiddenElements.forEach(el => {
                el.style.visibility = 'visible';
            });
            
            // Restore body scroll
            document.body.style.overflow = 'auto';
        }, 0); // Match transition duration
    };

    // Calculate remaining wait time
    const remainingDelay = Math.max(minimumDelay - elapsedTime, 0);
    
    if (remainingDelay > 0) {
        setTimeout(revealContent, remainingDelay);
    } else {
        revealContent();
    }
});