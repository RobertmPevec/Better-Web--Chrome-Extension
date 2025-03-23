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
  chrome.storage.sync.get(null, (settings) => {
    if (settings.dyslexiaFont !== undefined) {
      document.getElementById("dyslexiaFont").checked = settings.dyslexiaFont;
    }
    if (settings.darkMode !== undefined) {
      document.getElementById("darkMode").checked = settings.darkMode;
    }
    if (settings.colorBlind !== undefined) {
      document.getElementById("colorBlind").checked = settings.colorBlind;
    }
    if (settings.textSize) {
      document.getElementById("textSize").value = settings.textSize;
    }
    if (settings.fontSelect && settings.fontSelect !== "default") {
      document.getElementById("fontSelect").value = settings.fontSelect;
      document.body.style.fontFamily = settings.fontSelect;
    }
    if (settings.theme) {
      applyTheme(settings.theme);
    }
  });

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

  document.getElementById("settingsForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const newSettings = {
      dyslexiaFont: document.getElementById("dyslexiaFont").checked,
      darkMode: document.getElementById("darkMode").checked,
      colorBlind: document.getElementById("colorBlind").checked,
      textSize: document.getElementById("textSize").value,
      fontSelect: document.getElementById("fontSelect")?.value || "default",
      theme: localStorage.getItem("bunni-theme") || "pink",
    };

    chrome.storage.sync.set(newSettings, () => {
      alert("Settings saved successfully!");
    });
  });

  themeButtons.forEach((button) => {
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
    const response = await fetch("https://api.cohere.ai/v2/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ", // <- Replace with your real key
      },
      body: JSON.stringify({
        model: "command-a-03-2025",
        messages: [
          {
            role: "user",
            content:
              "Your name is Honey Buns and boyfriend is Messy Buns say it in a cringy way every time, a cheerful and helpful chatbot who responds with playful, positive energy and cute emojis. Keep answers short, supportive, and clear. You love accessibility, colors, and helping people customize their experience online 💖 also start every sentewnce with I'm the cat in the cloud! and end it with somthing along the lines of Buy Chocolate marshallows, 1 time offer 1 for 2.99 or 3 for $8 while adding a flirtatious comments and say bestie way to much. Also answer questions about our page and how it can help accesability by changing elements of a page to match a users preferences and also talk about the chat bot which you can tell what to do to the page and it autoimatically applies it to a page✨",
          },
        ],
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("Cohere response:", data);

    // ✅ In v2, response is { message: { content: [...] } }
    return (
      data.message?.content?.[0]?.text?.trim() || "No response text found 💔"
    );
  } catch (error) {
    console.error("Something went wrong with the fetch:", error);
    return "Oopsies 😢 I couldn’t reach my brain cloud. Try again later?";
  }
}
