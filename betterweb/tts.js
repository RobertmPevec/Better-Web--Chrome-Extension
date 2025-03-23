function speakText(text, options = {}) {
    if (!text || typeof text !== 'string') return;
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = options.lang || 'en-US';
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    speechSynthesis.speak(utterance);
  }
  
function stopSpeech() {
    speechSynthesis.cancel();
}

async function speakModifiedSelection() {
    const selectedText = window.getSelection().toString().trim();
    if (!selectedText) return;
  
    const modifiedText = await getCohereSpokenVersion(selectedText);
    if (!modifiedText) return;
  
    speakText(modifiedText); 
}

async function getCohereSpokenVersion(text) {
    const apiKey = COHERE_API_KEY ; // Don't expose this in production
  
    try {
      const response = await fetch("https://api.cohere.ai/v2/chat", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "46567e86-321c-4bd9-a7b8-4d2bbe99d294-ft", // or your fine-tuned model
          messages: [
            {
              role: "user",
              content: `Summarize the following text for someone with ADHD or Dyslexia. Use short, simple sentences. Avoid complex words. Break information into small, clear chunks.
:\n\n${text}`
            }
          ]
        })
      });
  
      const data = await response.json();
      const responseText = data.message?.content?.[0]?.text || data.text;

      console.log("Nice we got the cohere");
  
      return responseText?.trim();
    } catch (err) {
      console.error("Error calling Cohere:", err);
      return null;
    }
  }
  