

async function speakWithGoogleTTS(text) {
    const apiKey = GOOGLE_API_KEY; 
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: { text: text },
        voice: {
          languageCode: "en-US",
          name: "en-US-Neural2-A", 
          ssmlGender: "MALE"
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: 1.0,
          pitch: 0
        }
      })
    });
  
    const data = await response.json();
    if (data.audioContent) {
      const audio = new Audio("data:audio/mp3;base64," + data.audioContent);
      audio.play();
    } else {
      console.error("No audio content returned:", data);
    }
  }
  