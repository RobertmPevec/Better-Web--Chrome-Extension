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
        console.warn('⚠️ No fix returned from the API.');
        alert('No fix returned from the API.');
      }
    });
  
    // The function that calls the Cohere API
    async function getAccessibilityFix(userPrompt) {
      const apiKey = "";
      try {
        const response = await fetch("https://api.cohere.ai/v2/chat", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "46567e86-321c-4bd9-a7b8-4d2bbe99d294-ft",
            messages: [
              {
                role: "user",
                content: `You are a function that returns only JSON instructions to modify a webpage's DOM.
  If the user request is accessibility-related (e.g., "make font bigger"), return JSON like:
  [{"selector":"body","property":"fontSize","value":"150%"}]
  If the prompt is unrelated, return an empty array: []
  Do not explain anything. Just output the JSON.
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
  openOptionsButton.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});