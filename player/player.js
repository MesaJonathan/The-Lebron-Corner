const playlistLink = "https://www.youtube.com/playlist?list=PLZ4V_elzG1sd66tVd4T1RRVoNdslRlkyR";

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('pip-toggle');
    const videoUrlInput = document.getElementById('video-url');
    const saveButton = document.getElementById('save-button');
    
    // Load saved state
    chrome.storage.local.get(['pipEnabled', 'videoUrl'], function(result) {
      toggleSwitch.checked = result.pipEnabled || false;
      videoUrlInput.value = result.videoUrl || '';
      
      // Apply initial state
      if (toggleSwitch.checked && videoUrlInput.value) {
        createOrUpdatePiP(videoUrlInput.value);
      }
    });
  
    // Save button handler
    saveButton.addEventListener('click', function() {
      const url = videoUrlInput.value;
      const enabled = toggleSwitch.checked;
      
      // Save settings
      chrome.storage.local.set({
        pipEnabled: enabled,
        videoUrl: url
      });
      
      if (enabled && url) {
        createOrUpdatePiP(url);
      } else {
        removePiP();
      }
    });
    
    // Toggle switch handler
    toggleSwitch.addEventListener('change', function() {
      const url = videoUrlInput.value;
      const enabled = toggleSwitch.checked;
      
      // Save toggle state
      chrome.storage.local.set({
        pipEnabled: enabled
      });
      
      if (enabled && url) {
        createOrUpdatePiP(url);
      } else {
        removePiP();
      }
    });
  });
  
  // Function to create or update PiP player
  function createOrUpdatePiP(url) {
    url = playlistLink;

    // Extract video ID from YouTube URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      console.error('Invalid YouTube URL');
      return;
    }
    
    // Inject the PiP player
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      try {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: function(videoId) {
            // Define the removePiPPlayer function inside the injected code
            function removePiPPlayer() {
              const pipContainer = document.getElementById('yt-pip-container');
              if (pipContainer) {
                pipContainer.parentNode.removeChild(pipContainer);
              }
            }
            
            // First remove any existing player
            removePiPPlayer();
            
            // Create PiP container
            const pipContainer = document.createElement('div');
            pipContainer.id = 'yt-pip-container';
            pipContainer.style.position = 'fixed';
            pipContainer.style.bottom = '20px';
            pipContainer.style.right = '20px';
            pipContainer.style.width = '320px';
            pipContainer.style.height = '180px';
            pipContainer.style.zIndex = '9999';
            pipContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
            pipContainer.style.borderRadius = '8px';
            pipContainer.style.overflow = 'hidden';
            
            // Create iframe for YouTube player
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            // Append iframe to container
            pipContainer.appendChild(iframe);
            
            // Add container to body
            document.body.appendChild(pipContainer);
            
            // Make the PiP player draggable
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            
            pipContainer.onmousedown = function(e) {
              e = e || window.event;
              e.preventDefault();
              // Get the mouse cursor position at startup
              pos3 = e.clientX;
              pos4 = e.clientY;
              document.onmouseup = function() {
                // Stop moving when mouse button is released
                document.onmouseup = null;
                document.onmousemove = null;
              };
              // Call a function whenever the cursor moves
              document.onmousemove = function(e) {
                e = e || window.event;
                e.preventDefault();
                // Calculate the new cursor position
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // Set the element's new position
                pipContainer.style.top = (pipContainer.offsetTop - pos2) + 'px';
                pipContainer.style.left = (pipContainer.offsetLeft - pos1) + 'px';
                // Reset bottom and right if top and left are set
                pipContainer.style.bottom = 'auto';
                pipContainer.style.right = 'auto';
              };
            };
          },
          args: [videoId]
        }).catch(error => {
          console.error('Error executing script:', error);
          alert('Cannot inject player on this page. Please try on a regular webpage.');
        });
      } catch (error) {
        console.error('Error setting up script execution:', error);
        alert('Cannot inject player on this page. Please try on a regular webpage.');
      }
    });
  }
  
  // Function to remove PiP player
  function removePiP() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      try {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: function() {
            const pipContainer = document.getElementById('yt-pip-container');
            if (pipContainer) {
              pipContainer.parentNode.removeChild(pipContainer);
            }
          }
        }).catch(error => {
          console.error('Error executing script:', error);
        });
      } catch (error) {
        console.error('Error setting up script execution:', error);
      }
    });
  }
  
  // Helper function to extract YouTube video ID
  function extractVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  }