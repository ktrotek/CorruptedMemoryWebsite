let minimumDelay = 3000; // 3 seconds
let startTime = Date.now();

window.onload = function() {
    const loadingScreen = document.querySelector('.loadingOverlay');
    const elapsedTime = Date.now() - startTime;

    if (elapsedTime < minimumDelay) {
        // If the page loads too quickly, wait the remaining time
        setTimeout(() => {
            loadingScreen.style.opacity = '0'; // Fade out
            setTimeout(() => {
                loadingScreen.style.display = 'none'; // Hide after fade
            }, 1000); // Match CSS transition duration
        }, minimumDelay - elapsedTime);
    } else {
        // If the page takes longer than 3 seconds, hide immediately after load
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }

    console.log('Page loaded, loading hidden');
};