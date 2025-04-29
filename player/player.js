const video_urls = [
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
  "https://youtu.be/-HccGqAE3c8?si=cC2cPSBHirVxMSVV",
];

document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("pip-toggle");
  const iframe = document.getElementById("iframe");

  // Load saved state
  chrome.storage.sync.get(["pipEnabled"], function (result) {
    toggleSwitch.checked = result.pipEnabled || false;
    // Apply initial state

    if (toggleSwitch.checked ) {
      createOrUpdatePiP();
    }
  });

  // Toggle switch handler
  toggleSwitch.addEventListener("change", function () {
    const enabled = toggleSwitch.checked;

    // Save toggle state
    chrome.storage.sync.set({
      pipEnabled: enabled,
    });

    if (enabled) {
      createOrUpdatePiP();
    } else {
      removePiP();
    }
  });
});

// Function to create or update PiP player
function createOrUpdatePiP() {
  const url = video_urls[Math.floor(Math.random() * video_urls.length)];

  // Extract video ID from YouTube URL
  const videoId = extractVideoId(url);
  if (!videoId) {
    console.error("Invalid YouTube URL");
    return;
  }

  // Inject the PiP player
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    try {
      chrome.scripting
        .executeScript({
          target: { tabId: tabs[0].id },
          func: function (videoId) {
            // Remove any existing player
            const existingContainer =
              document.getElementById("yt-pip-container");
            if (existingContainer) {
              return;
              existingContainer.remove();
            }

            // Create PiP container
            const pipContainer = document.createElement("div");
            pipContainer.id = "yt-pip-container";
            pipContainer.style.position = "fixed";
            pipContainer.style.bottom = "20px";
            pipContainer.style.right = "20px";
            pipContainer.style.width = "320px";
            pipContainer.style.height = "180px";
            pipContainer.style.zIndex = "9999";
            pipContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
            pipContainer.style.borderRadius = "8px";
            pipContainer.style.overflow = "hidden";
            pipContainer.style.cursor = "move";

            // Create a header/drag handle
            const dragHandle = document.createElement("div");
            dragHandle.style.position = "absolute";
            dragHandle.style.top = "0";
            dragHandle.style.left = "0";
            dragHandle.style.width = "100%";
            dragHandle.style.height = "30px";
            dragHandle.style.background = "rgba(0, 0, 0, 0.4)";
            dragHandle.style.cursor = "move";
            dragHandle.style.zIndex = "10000";
            dragHandle.style.opacity = "0.4";
            dragHandle.style.transition = "opacity 0.3s";

            dragHandle.onmouseover = function () {
              this.style.opacity = "0.7";
            };
            dragHandle.onmouseout = function () {
              this.style.opacity = "0.4";
            };

            // Create iframe for YouTube player
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&mute=1`;
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.frameBorder = "0";
            iframe.allow =
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.pointerEvents = "auto";

            // Create resize handles
            const positions = ["se", "sw", "ne", "nw", "n", "s", "e", "w"];

            const cursors = {
              n: "ns-resize",
              s: "ns-resize",
              e: "ew-resize",
              w: "ew-resize",
              ne: "nesw-resize",
              nw: "nwse-resize",
              se: "nwse-resize",
              sw: "nesw-resize",
            };

            // Create all resize handles
            positions.forEach((pos) => {
              const handle = document.createElement("div");
              handle.className = `resize-handle resize-${pos}`;
              handle.style.position = "absolute";
              handle.style.width = "16px";
              handle.style.height = "16px";
              handle.style.background = "transparent"; // Initially transparent
              handle.style.zIndex = "10001";
              handle.style.cursor = cursors[pos];

              // Position the handle
              if (pos.includes("n")) handle.style.top = "-8px";
              if (pos.includes("s")) handle.style.bottom = "-8px";
              if (pos.includes("e")) handle.style.right = "-8px";
              if (pos.includes("w")) handle.style.left = "-8px";

              // Center the handle
              if (pos === "n" || pos === "s")
                handle.style.left = "calc(50% - 8px)";
              if (pos === "e" || pos === "w")
                handle.style.top = "calc(50% - 8px)";

              // Add hover effect - only show handles on container hover
              pipContainer.addEventListener("mouseover", function () {
                handle.style.background = "rgba(0, 136, 255, 0.3)";
              });

              pipContainer.addEventListener("mouseout", function () {
                if (!document.querySelector(".resize-handle.resizing")) {
                  handle.style.background = "transparent";
                }
              });

              // Add resize functionality
              handle.addEventListener("mousedown", function (e) {
                e.stopPropagation();
                e.preventDefault();

                // Mark this handle as actively resizing
                handle.classList.add("resizing");

                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = parseInt(pipContainer.style.width);
                const startHeight = parseInt(pipContainer.style.height);
                const startLeft = pipContainer.offsetLeft;
                const startTop = pipContainer.offsetTop;

                // Prevent text selection while resizing
                document.body.style.userSelect = "none";

                // Resize function
                function handleResize(e) {
                  // Define min size
                  const minWidth = 200;
                  const minHeight = 120;

                  // Calculate changes
                  let newWidth = startWidth;
                  let newHeight = startHeight;
                  let newLeft = startLeft;
                  let newTop = startTop;

                  // Update dimensions based on handle position
                  if (pos.includes("e")) {
                    newWidth = Math.max(
                      minWidth,
                      startWidth + (e.clientX - startX)
                    );
                  }
                  if (pos.includes("w")) {
                    const widthChange = startX - e.clientX;
                    if (startWidth + widthChange >= minWidth) {
                      newWidth = startWidth + widthChange;
                      newLeft = startLeft - widthChange;
                    }
                  }
                  if (pos.includes("s")) {
                    newHeight = Math.max(
                      minHeight,
                      startHeight + (e.clientY - startY)
                    );
                  }
                  if (pos.includes("n")) {
                    const heightChange = startY - e.clientY;
                    if (startHeight + heightChange >= minHeight) {
                      newHeight = startHeight + heightChange;
                      newTop = startTop - heightChange;
                    }
                  }

                  // Apply new dimensions
                  pipContainer.style.width = newWidth + "px";
                  pipContainer.style.height = newHeight + "px";
                  pipContainer.style.left = newLeft + "px";
                  pipContainer.style.top = newTop + "px";
                }

                function stopResize() {
                  handle.classList.remove("resizing");
                  handle.style.background = "transparent";
                  document.removeEventListener("mousemove", handleResize);
                  // document.removeEventListener("mouseup", stopResize);
                  document.body.style.userSelect = "";
                }

                document.addEventListener("mousemove", handleResize);
                document.addEventListener("mouseup", stopResize);
              });

              pipContainer.appendChild(handle);
            });

            // Append iframe and drag handle to container
            pipContainer.appendChild(iframe);
            pipContainer.appendChild(dragHandle);

            // Add container to body
            document.body.appendChild(pipContainer);

            // Make the PiP player draggable using the handle
            dragHandle.addEventListener("mousedown", function (e) {
              e.preventDefault();

              const startX = e.clientX;
              const startY = e.clientY;
              const startLeft = pipContainer.offsetLeft;
              const startTop = pipContainer.offsetTop;

              // Prevent text selection while dragging
              document.body.style.userSelect = "none";

              function handleDrag(e) {
                // Calculate new position
                const x = startLeft + (e.clientX - startX);
                const y = startTop + (e.clientY - startY);

                // Apply new position with boundaries
                const maxX = window.innerWidth - pipContainer.offsetWidth;
                const maxY = window.innerHeight - pipContainer.offsetHeight;

                pipContainer.style.left = Math.max(0, Math.min(x, maxX)) + "px";
                pipContainer.style.top = Math.max(0, Math.min(y, maxY)) + "px";
                pipContainer.style.right = "auto";
                pipContainer.style.bottom = "auto";
              }

              function stopDrag() {
                document.removeEventListener("mousemove", handleDrag);
                document.removeEventListener("mouseup", stopDrag);
                document.body.style.userSelect = "";
              }

              document.addEventListener("mousemove", handleDrag);
              document.addEventListener("mouseup", stopDrag);
            });

            // Add close button
            const closeButton = document.createElement("div");
            closeButton.innerHTML = "✕";
            closeButton.style.position = "absolute";
            closeButton.style.top = "5px";
            closeButton.style.right = "10px";
            closeButton.style.color = "white";
            closeButton.style.cursor = "pointer";
            closeButton.style.zIndex = "10001";
            closeButton.style.fontSize = "16px";

            closeButton.onclick = function () {
              chrome.storage.sync.set({
                pipEnabled: false
              });
              
              pipContainer.remove();
            };

            dragHandle.appendChild(closeButton);
          },
          args: [videoId],
        })
        .catch((error) => {
          console.error("Error executing script:", error);
          alert(
            "Cannot inject player on this page. Please try on a regular webpage."
          );
        });
    } catch (error) {
      console.error("Error setting up script execution:", error);
      alert(
        "Cannot inject player on this page. Please try on a regular webpage."
      );
    }
  });
}

// Function to remove PiP player
function removePiP() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    try {
      chrome.scripting
        .executeScript({
          target: { tabId: tabs[0].id },
          func: function () {
            const pipContainer = document.getElementById("yt-pip-container");
            if (pipContainer) {
              pipContainer.parentNode.removeChild(pipContainer);
            }
          },
        })
        .catch((error) => {
          console.error("Error executing script:", error);
        });
    } catch (error) {
      console.error("Error setting up script execution:", error);
    }
  });
}

// Helper function to extract YouTube video ID
function extractVideoId(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}
