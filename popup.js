// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const status = document.getElementById('status');
    const clearBtn = document.getElementById('clearData');
    
    // Check for cached data when popup opens
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const formUrl = tabs[0].url;
      chrome.storage.local.get([formUrl], (result) => {
        if (result[formUrl]) {
          displayResponse(result[formUrl], true); // true indicates cached data
          clearBtn.style.display = 'block';
        } else {
          clearBtn.style.display = 'none';
        }
      });
    });
    
    document.getElementById('fetchData').addEventListener('click', () => {
      loader.style.display = 'block';
      status.textContent = "Fetching form data...";
      
      // Clear existing storage before making new request
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const formUrl = tabs[0].url;
        chrome.storage.local.remove([formUrl], () => {
          // Execute content script to fetch fresh data
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
          });
        });
      });
    });
  
    // Clear button functionality
    clearBtn.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const formUrl = tabs[0].url;
        chrome.storage.local.remove([formUrl], () => {
          status.textContent = '';
          clearBtn.style.display = 'none';
        });
      });
    });
  });
  
  function displayResponse(data, isFromCache = false) {
    const loader = document.getElementById('loader');
    const status = document.getElementById('status');
    const clearBtn = document.getElementById('clearData');
    
    loader.style.display = 'none';
    clearBtn.style.display = 'block';
    
    const responseData = data.result;
    
    if (Array.isArray(responseData)) {
      status.innerHTML = 
        `<div class="response-header">
          <h3>API Response ${isFromCache ? '<span class="cache-badge">(Cached)</span>' : ''}</h3>
         </div>
         <ul>` +
        responseData.map((item, i) => 
          `<li><strong>${i+1}. ${item.fullQuestion}:</strong>Ans. ${item.answer}</li>`
        ).join('') +
        "</ul>";
    } else {
      status.textContent = "Unexpected response format from API.";
    }
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "apiResponse") {
      displayResponse(message.data, false); // false indicates fresh data
    } else if (message.action === "apiResponseError") {
      const loader = document.getElementById('loader');
      const status = document.getElementById('status');
      const clearBtn = document.getElementById('clearData');
      loader.style.display = 'none';
      clearBtn.style.display = 'none';
      status.textContent = message.error;
    }
  });