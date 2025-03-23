chrome.storage.local.get(["userData"], function (result) {
  if (result.userData) {
    console.log("Retrieved user preferences:", result.userData);
    // Update UI
  }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.userData) {
    console.log("User preferences updated:", changes.userData.newValue);
    // Update UI
  }
});

function checkAllUIChanges() {
  // dark mode
  if (
    userData.visualDisabilitiesPreferences.visualSnowDarkMode ||
    userData.photosensitivityPreferences.useDarkMode
  ) {
    applyDarkMode();
  } else {
    removeDarkMode();
  }
  // font size
  if (
    userData.visualDisabilitiesPreferences.lowVisionIncreaseFontSize ||
    userData.visualDisabilitiesPreferences.glaucomaMacularEnlargedText ||
    userData.visualDisabilitiesPreferences.presbyopiaIncreaseFontSize ||
    userData.adhdPreferences.largerFonts
  ) {
    // call font size increasing function
  } else {
    // call function to revert it
  }
  // dyslexia font
  if (
    userData.dyslexiaLearningPreferences.dyslexiaOpenDyslexicFont ||
    userData.dyslexiaLearningPreferences.dysgraphiaClearFonts
  ) {
    applyDyslexiaFont();
  } else {
    removeDyslexiaFont();
  }
}

console.log("content.js is running on this page.");
function applyDyslexiaFont() {
  document.body.style.fontFamily = '"OpenDyslexic", Arial, sans-serif';
}

function removeDyslexiaFont() {
  document.body.style.fontFamily = "";
}

function applyDarkMode() {
  document.documentElement.style.backgroundColor = "#000"; // optional
  document.documentElement.style.color = "#fff";
  document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";

  const media = document.querySelectorAll("img, picture, video, iframe");
  media.forEach((el) => {
    el.style.filter = "invert(1) hue-rotate(180deg)";
  });
}

function speakHighlightedText(text = null) {
  const selection = text || window.getSelection().toString().trim();
  if (selection.length > 0) {
    const utterance = new SpeechSynthesisUtterance(selection);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SPEAK_SELECTION") {
    //speakText(message.text);
    speakModifiedSelection();
  }
});

function removeDarkMode() {
  document.body.style.backgroundColor = "";
  document.body.style.color = "";
}
// Settings and Storage

// start of "what"
function applySettings(settings) {
  settings.dyslexiaFont ? applyDyslexiaFont() : removeDyslexiaFont();
  //   settings.darkMode ? applyDarkMode() : removeDarkMode();
}

// On initial load, get settings from chrome.storage
chrome.storage.sync.get(["dyslexiaFont", "darkMode"], (settings) => {
  applySettings(settings);
});

// Listen for changes in storage to update settings dynamically
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "sync") {
    chrome.storage.sync.get(["dyslexiaFont", "darkMode"], (settings) => {
      applySettings(settings);
    });
  }
});
// end of "what"

// Cohere API Fixes Section (from File 2)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "applyFix" && message.data) {
    try {
      const rules =
        typeof message.data === "string"
          ? JSON.parse(message.data)
          : message.data;
      rules.forEach((rule) => {
        document.querySelectorAll(rule.selector).forEach((el) => {
          el.style.setProperty(rule.property, rule.value, "important");
        });
      });
      console.log("DOM modifications applied:", rules);
    } catch (e) {
      console.error("Error applying fix:", e);
    }
  }
});
