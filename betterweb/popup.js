document.addEventListener('DOMContentLoaded', () => {
    const enableBtn = document.getElementById('enableBtn');
    const disableBtn = document.getElementById('disableBtn');
    const openOptionsButton = document.getElementById('openOptions');
    const sendCommandButton = document.getElementById('sendCommand');
  
    enableBtn.addEventListener('click', () => {
      chrome.storage.sync.set({ extensionEnabled: true }, () => {
        alert('BetterWeb has been enabled!');
      });
    });
  
    disableBtn.addEventListener('click', () => {
      chrome.storage.sync.set({ extensionEnabled: false }, () => {
        alert('BetterWeb has been disabled.');
      });
    });
  
    openOptionsButton.addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  
    sendCommandButton.addEventListener('click', async () => {
      const userCommand = document.getElementById('userCommand').value;
      console.log("User input:", userCommand);
  
      const fix = await getAccessibilityFix(userCommand);
      console.log("Fix received from API:", fix);
  
      if (fix) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log("Sending message to tab:", tab.id);
  
        chrome.tabs.sendMessage(tab.id, { type: 'applyFix', data: fix });

        console.log("Message sent to content script (no callback).");
        
      } else {
        console.warn('No fix returned from the API.');
        alert('No fix returned from the API.');
      }
      document.getElementById('userCommand').value = '';
    });
  
    // The function that calls the Cohere API
    async function getAccessibilityFix(userPrompt) {
      const apiKey = "FdSNITT5WANFBPHHXj645GonfiFZzdMyqkiZ49ha";
      try {
        const response = await fetch("https://api.cohere.ai/v2/chat", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "626f3d0b-210f-4e53-a86b-0d747950d57d-ft",
            messages: [
              {
                role: "user",
                content: `You are a function that returns only JSON instructions to modify a webpage's DOM.
If the user request is accessibility-related (e.g., "make font bigger"), return JSON like:
[{"selector":"body","property":"fontSize","value":"150%"}]
If the prompt is unrelated, return an empty array: []
Do not explain anything and if a user asks to change the contents of a page, like text color or font spacing,
please change it for all elements unless otherwise stated by the user.
Just output the JSON.

Use the following DOM schema as a reference for the page structure:
{
  "pageSchema": {
    "head": [
      {"selector": "meta", "description": "Metadata including charset, viewport, and SEO tags."},
      {"selector": "title", "description": "The page title (e.g., 'Wikipedia, the free encyclopedia')."},
      {"selector": "link", "description": "Links to external stylesheets and resources."},
      {"selector": "script", "description": "Scripts and configuration settings."}
    ],
    "body": [
      {"selector": "div.vector-header-container", "description": "Container for the header section."},
      {"selector": "header.mw-header", "description": "Main header with site logo and primary navigation."},
      {"selector": "a.mw-logo", "description": "Clickable site logo linking to the main page."},
      {"selector": "nav.vector-main-menu-landmark", "description": "Primary navigation bar at the top."},
      {"selector": "div#mw-panel", "description": "Sidebar navigation panel with additional menus."},
      {"selector": "div.mw-content-container", "description": "Main container for the page content."},
      {"selector": "main#content", "description": "Primary content area for the article."},
      {"selector": "div.mw-parser-output", "description": "Contains formatted text, images, and other content elements."},
      {"selector": "div#footer", "description": "Footer section with copyright info and extra links."},
      {"selector": "div.vector-sticky-header-container", "description": "Container for the sticky header that remains during scrolling."},
      {"selector": "div#p-lang-btn", "description": "Language selection dropdown for switching page languages."}
    ]
  }
}

Now here is the prompt: ${userPrompt}`
              }
            ]
          })
        });
  
        const data = await response.json();
        console.log("Cohere raw response:", data);
  
        const text = data.message?.content?.[0]?.text;
        console.log("Text output:", text);
  
        if (!text) {
          console.warn("No text returned by LLM.");
          return null;
        }
        try {
          const parsed = JSON.parse(text);
          console.log("Parsed response:", parsed);
          return parsed;
        } catch (e) {
          console.error("Error parsing LLM response as JSON:", e);
          return null;
        }
  
      } catch (err) {
        console.error("Failed API call:", err);
        return null;
      }
    }
  });  