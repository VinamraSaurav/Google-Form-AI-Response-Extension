document.getElementById('fetchData').addEventListener('click', () => {
    const loader = document.getElementById('loader');
    const status = document.getElementById('status');

    // Show loader and update status
    loader.style.display = 'block';
    status.textContent = "Fetching form data...";

    // Get the active tab and inject content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;

        // Inject content.js into the active tab
        chrome.scripting.executeScript(
            {
                target: { tabId: tabId },
                files: ['content.js']
            }
        );
    });
});

// Listen for the API response message from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const loader = document.getElementById('loader');
    const status = document.getElementById('status');

    if (message.action === "apiResponse") {
        // Hide the loader
        loader.style.display = 'none';

        const responseData = message.data.result;

        // Check if responseData is an array before mapping
        if (Array.isArray(responseData)) {
            status.innerHTML = "<h3>API Response:</h3><ul>" +
                responseData.map((item,i) => `<li><strong>${i+1}. ${item.fullQuestion}:</strong>Ans. ${item.answer}</li>`).join('') +
                "</ul>";
        } else {
            status.textContent = "Unexpected response format from API.";
        }
    } else if (message.action === "apiResponseError") {
        // Hide the loader and show error
        loader.style.display = 'none';
        status.textContent = "Failed to fetch data. Please try again.";
    }
});
