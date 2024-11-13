document.getElementById('fetchData').addEventListener('click', () => {
    // Update status in popup
    document.getElementById('status').textContent = "Fetching form data...";

    // Get the active tab and inject content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;

        // Inject content.js into the active tab to log form data
        chrome.scripting.executeScript(
            {
                target: { tabId: tabId },
                files: ['content.js']
            },
            () => {
                // Update status to indicate the process is complete
                document.getElementById('status').textContent = "Form data logged in console!";
            }
        );
    });
});
