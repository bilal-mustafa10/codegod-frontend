/*
// contentScript.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd === 'show_popup') {
        showPopup();
    }
});

function showPopup() {
    // Check if the popup already exists
    let popup = document.querySelector('#my-extension-popup');
    if (!popup) {
        // If not, create it
        let div = document.createElement('div');
        div.id = 'my-extension-popup';
        document.body.appendChild(div);
        popup = document.querySelector('#my-extension-popup');
    }

    // Load the popup.html content into the popup
    fetch(chrome.runtime.getURL('popup.html'))
        .then(r => r.text())
        .then(html => {
            popup.innerHTML = html;

            // Delay positioning of the popup until after the HTML has been inserted and had time to render
            setTimeout(() => {
                // Position the popup in the center of the screen
                let top = Math.max(window.innerHeight / 2 - popup.offsetHeight / 2, 0);
                let left = Math.max(window.innerWidth / 2 - popup.offsetWidth / 2, 0);
                popup.style.position = 'fixed';
                popup.style.top = `${top}px`;
                popup.style.left = `${left}px`;
                popup.style.display = 'block';
                popup.style.zIndex = 1000; // Ensure popup appears above all other elements
            }, 0);
        });
}
*/
