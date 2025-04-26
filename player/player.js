const video_urls =[
  "https://youtu.be/p4Ld-ADVLME?si=rM8NcG7PdDj7PHLM",
  "https://youtu.be/EEq1n6yJGfc?si=N4uq41QiFiUQ_qJ3",
  "https://youtu.be/trTlpteT3fY?si=0-FqvaL-J-8sRWV9",
  "https://youtu.be/TqOeRzg5Epo?si=BEBk0sQOJVspyRa0",
  "https://youtu.be/pQmtrhr9fkc?si=V7q0pc7eyTwTzx77",
  "https://youtu.be/5ot2pEPBEDM?si=hw3G5RnDtSC4-66m",
  "https://youtu.be/LVLePtYNQ88?si=6Fc3Oo4W-C6eTUcx",
  "https://youtu.be/6O8qiBzaKIg?si=64JhAB8Wo8u1r4ms",
  "https://youtu.be/IVS0DTcyqXM?si=IwJZ6N1b0dDj9Xx6",
  "https://youtu.be/TLbXFY40T0Y?si=xQ3XkpEiz-JoUevO",
  "https://youtu.be/Hh7llhlYZIY?si=hZ5nkVdDLOkuNose",
  "https://youtu.be/vZldJ5ocm5g?si=x2eVUFM_o7dirzuN",
  "https://youtu.be/6UKmEb_Dsd8?si=FTyZXsB5c7_lgzU5",
  "https://youtu.be/cRFwaPBjRZw?si=-kPiwCCawDozbwtW",
  "https://youtu.be/_zRsNhnruvw?si=Mz-vWLyCtJb10UzW",
  "https://youtu.be/Y1luHUqYzPs?si=3RxaDgLjzMyfc4i1",
  "https://youtu.be/8iw-qkYDp4g?si=fY9euYAMFzi8q7pl",
  "https://youtu.be/ko2J45CEub8?si=S5Y4NURenlsYbmf7",
  "https://youtu.be/Y7OWbizKH_g?si=AUE3-PMZXyMY0PLD",
  "https://youtu.be/Yh-GsTNME8g?si=KTdLtBxP7clH8V-p",
  "https://youtu.be/8Q7thGs0gRQ?si=ZRu8CZI9Ndb0ZDaZ",
  "https://youtu.be/Pvy_u3QjdkI?si=KR5hSdIeWoHIvfot",
  "https://youtu.be/tzNNYx1VrAY?si=L3l7DwrDJdMAsak-",
  "https://youtu.be/5AhigRIQd44?si=yud-5Cn48LY86Be9",
  "https://youtu.be/7Iqp57V5TaI?si=XQvlkwEkG9TWs8fP",
  "https://youtu.be/ACTloLyKH-0?si=XWEW8ufYx5fnCkg9",
  "https://youtu.be/jDPViN4ItWY?si=fQyJSz0C9Ypriec_",
  "https://youtu.be/SB7CToCs1Hw?si=couMYp1JblUmkrgs",
  "https://youtu.be/iICwXpvOdu8?si=LfGjAT9RqG2MJiyX",
  "https://youtu.be/j-PLkxBrt-I?si=2HsQUyl-DBSOUMpM",
  "https://youtu.be/yB-xamG6VgU?si=H6FpxLk4s2BRL2Vn",
  "https://youtu.be/aVCWCBHzQgM?si=t_O_XDjn6rLWmoXa",
  "https://youtu.be/kzgIzKaqN1k?si=pQ4rbkssQ5vbuY7U",
  "https://youtu.be/N1SLd93oF5w?si=blNK6ve8kWS6tsw3",
  "https://youtu.be/eK2kTEmaxHI?si=zyRocPxtZRkmFCO3",
  "https://youtu.be/myeB0vIO2uI?si=0qBS-_6HP6xci2oP",
  "https://youtu.be/2_c57vzM_fI?si=zsqQwXDhT0cevAcJ",
  "https://youtu.be/q0b3jh0En8Y?si=Yxjaznaq3rhwkNII",
  "https://youtu.be/FqkxcT8X1Mk?si=0Ynkz17AUvZtVxLx",
  "https://youtu.be/mTyJHrNsQro?si=O8Renl5YqRO7ZoRZ",
  "https://youtu.be/HPa1I1pjXjc?si=JpGmC5DfOTZxBiZk",
  "https://youtu.be/2nC9z57MuaI?si=f8F48gcdPuKZTjww",
  "https://youtu.be/PFz1QDGWM7w?si=iUb8NYLfEtAskFxT",
  "https://youtu.be/r_liBadmQtQ?si=kjb3OiKhip3j6dkl",
  "https://youtu.be/RgB5Ub1GNUU?si=9GTA9rqdQjJormcp",
  "https://youtu.be/soXYntMDQec?si=Gjg_GadrulNUagTT",
  "https://youtu.be/meBBC8_2GeU?si=V4wRnEkQZZR3uaQt",
  "https://youtu.be/UJBfgdolGww?si=bOLMD_dgUNWi2RI2",
  "https://youtu.be/xKdMUAr6_vQ?si=YvVtkPFhquRYlB5Q",
  "https://youtu.be/-HccGqAE3c8?si=cC2cPSBHirVxMSVV"
] 

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('pip-toggle');
    const url = video_urls[Math.floor(Math.random() * video_urls.length)]; ;
    
    // Load saved state
    chrome.storage.local.get(['pipEnabled'], function(result) {
      toggleSwitch.checked = result.pipEnabled || false;
      
      // Apply initial state
      if (toggleSwitch.checked) {
        createOrUpdatePiP(url);
      }
    });
    
    // Toggle switch handler
    toggleSwitch.addEventListener('change', function() {
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