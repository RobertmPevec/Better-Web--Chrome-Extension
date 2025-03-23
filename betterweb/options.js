// 🌸 BunniBot: The Smart + Cute Chatbot
window.addEventListener("DOMContentLoaded", () => {
    const chatLog = document.getElementById("chatLog");
    const chatInput = document.getElementById("chatInput");
    const themeButtons = document.querySelectorAll(".theme-btn");
  
    // ⏪ Load saved theme if it exists
    const savedTheme = localStorage.getItem("bunni-theme");
    if (savedTheme) {
      applyTheme(savedTheme);
    }
  
    // 💬 Chat Input Handler
    chatInput.addEventListener("keypress", async function (e) {
      if (e.key === "Enter") {
        const msg = chatInput.value;
        if (msg.trim() === "") return;
  
        addMessage("user", msg);
        chatInput.value = "";
  
        const loadingMsg = document.createElement("div");
        loadingMsg.className = "chat-bubble bot";
        loadingMsg.textContent = "typing... ✨";
        chatLog.appendChild(loadingMsg);
        chatLog.scrollTop = chatLog.scrollHeight;
  
        const reply = await getBotResponse(msg);
        loadingMsg.remove();
        addMessage("bot", reply);
      }
    });
  
    // 💖 Save Accessibility Settings
    document.getElementById('settingsForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const newSettings = {
        dyslexiaFont: document.getElementById('dyslexiaFont').checked,
        darkMode: document.getElementById('darkMode').checked,
        colorBlind: document.getElementById('colorBlind').checked,
        textSize: document.getElementById('textSize').value,
      };
  
      chrome.storage.sync.set(newSettings, () => {
        alert('Settings saved successfully!');
      });
    });
  
    // 🌈 Theme Toggle Buttons
    themeButtons.forEach(button => {
      button.addEventListener("click", () => {
        const theme = button.dataset.theme;
        applyTheme(theme);
      });
    });
  
    function addMessage(type, text) {
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${type}`;
      bubble.textContent = text;
      chatLog.appendChild(bubble);
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  
    function applyTheme(theme) {
      const root = document.documentElement;
      let reply = "";
  
      if (theme === "pink") {
        root.style.setProperty("--bg-color", "#fff7fc");
        root.style.setProperty("--card-bg", "#ffe0f0");
        root.style.setProperty("--header-color", "#ff6fa7");
        root.style.setProperty("--button-color", "#ff9aa2");
        root.style.setProperty("--button-hover", "#ff6f91");
        root.style.setProperty("--bubble-bg", "#fff0fa");
        root.style.setProperty("--user-bubble-bg", "#ffcee0");
  
        reply = "Pastel Pink 💖";
      } else if (theme === "lavender") {
        root.style.setProperty("--bg-color", "#f3e5f5");
        root.style.setProperty("--card-bg", "#e1bee7");
        root.style.setProperty("--header-color", "#8e24aa");
        root.style.setProperty("--button-color", "#ba68c8");
        root.style.setProperty("--button-hover", "#ab47bc");
        root.style.setProperty("--bubble-bg", "#f8e3f9");
        root.style.setProperty("--user-bubble-bg", "#e1bee7");
  
        reply = "Lavender Haze 💜";
      } else if (theme === "mint") {
        root.style.setProperty("--bg-color", "#e0f7fa");
        root.style.setProperty("--card-bg", "#b2ebf2");
        root.style.setProperty("--header-color", "#00acc1");
        root.style.setProperty("--button-color", "#4dd0e1");
        root.style.setProperty("--button-hover", "#26c6da");
        root.style.setProperty("--bubble-bg", "#e0ffff");
        root.style.setProperty("--user-bubble-bg", "#b2ebf2");
  
        reply = "Minty Fresh 🍃";
      } else if (theme === "peach") {
        root.style.setProperty("--bg-color", "#fff3e0");
        root.style.setProperty("--card-bg", "#ffe0b2");
        root.style.setProperty("--header-color", "#fb8c00");
        root.style.setProperty("--button-color", "#ffb74d");
        root.style.setProperty("--button-hover", "#ffa726");
        root.style.setProperty("--bubble-bg", "#fff8e1");
        root.style.setProperty("--user-bubble-bg", "#ffe0b2");
  
        reply = "Peachy Keen 🍑";
      } else if (theme === "sky") {
        root.style.setProperty("--bg-color", "#e3f2fd");
        root.style.setProperty("--card-bg", "#bbdefb");
        root.style.setProperty("--header-color", "#1e88e5");
        root.style.setProperty("--button-color", "#64b5f6");
        root.style.setProperty("--button-hover", "#42a5f5");
        root.style.setProperty("--bubble-bg", "#e1f5fe");
        root.style.setProperty("--user-bubble-bg", "#bbdefb");
        reply = "Sky Cloud ☁️";
      }
  
      localStorage.setItem("bunni-theme", theme);
  
      const savedTheme = localStorage.getItem("bunni-theme");
  
      addMessage("bot", `Theme changed to ${reply} ✨`);
    }
  
  });
  
  // 🧠 AI Response from GPT
  async function getBotResponse(msg) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_KEY_HERE"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You're a super cute chatbot named Bunni, and you reply with lots of emojis, sparkles, and positivity! Keep it playful."
            },
            {
              role: "user",
              content: msg
            }
          ],
          temperature: 0.8
        })
      });
  
      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Something went wrong with the fetch:", error);
      return "Oopsies 😢 I couldn’t reach my brain cloud. Try again later?";
    }
  }