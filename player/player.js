document.addEventListener('DOMContentLoaded', function() {
    // Get references to our elements
    const toggleSwitch = document.getElementById('toggleSwitch');
    const youtubePlayerContainer = document.getElementById('youtubePlayerContainer');
    const youtubePlayer = document.getElementById('youtubePlayer');
    
    // Set up event listener for the toggle switch
    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            // Show the YouTube player when checked
            youtubePlayerContainer.style.display = 'block';
        } else {
            // Hide the YouTube player when unchecked
            youtubePlayerContainer.style.display = 'none';
            
            // Optionally pause the video when hiding
            // This resets the src which effectively pauses the video
            const currentSrc = youtubePlayer.src;
            youtubePlayer.src = '';
            youtubePlayer.src = currentSrc;
        }
    });
    
    // If you want to save the toggle state between sessions
    // You could use Chrome's storage API like this:
    
    // Load saved state (uncomment if you want this feature)
    chrome.storage.sync.get(['playerVisible'], function(result) {
        if (result.playerVisible) {
            toggleSwitch.checked = true;
            youtubePlayerContainer.style.display = 'block';
        }
    });
    
    // Save state when toggle changes
    toggleSwitch.addEventListener('change', function() {
        chrome.storage.sync.set({playerVisible: this.checked});
    });
});