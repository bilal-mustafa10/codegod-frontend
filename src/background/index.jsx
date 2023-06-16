// background.js
chrome.action.onClicked.addListener((tab) => {
    // Inject the content script into the current tab
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content_scripts/index.jsx']
    }).then(() => {
        // Send a message to the content script
        chrome.tabs.sendMessage(tab.id, {cmd: 'show_popup'});
    });
});
