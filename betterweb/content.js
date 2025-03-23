let userData = {};
let originalFontSize = null;
let currentFontSize = null;

// Load user preferences and font size on initialization
chrome.storage.local.get(["userData", "fontSize"], function (result) {
  if (result.userData) {
    console.log("Retrieved user preferences:", result.userData);
    userData = result.userData;
  }

  if (result.fontSize) {
    currentFontSize = result.fontSize;
  }

  checkAllUIChanges();
  applySavedFontSize();
});

// Listen for changes in storage
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.userData) {
    console.log("User preferences updated:", changes.userData.newValue);
    userData = changes.userData.newValue;
    checkAllUIChanges();
  }

  if (changes.fontSize) {
    currentFontSize = changes.fontSize.newValue;
    applySavedFontSize();
  }
});

function checkAllUIChanges() {
  console.log("hello from checkAllUIChanges");

  // Dark mode
  if (
    userData.visualDisabilitiesPreferences?.visualSnowDarkMode ||
    userData.photosensitivityPreferences?.useDarkMode
  ) {
    applyDarkMode();
  } else {
    removeDarkMode();
  }

  // Font size
  if (
    userData.visualDisabilitiesPreferences?.lowVisionIncreaseFontSize ||
    userData.visualDisabilitiesPreferences?.glaucomaMacularEnlargedText ||
    userData.visualDisabilitiesPreferences?.presbyopiaIncreaseFontSize ||
    userData.adhdPreferences?.largerFonts
  ) {
    console.log("font size increasing");
    increaseFontSize();
  } else {
    resetFontSize();
  }

  // Dyslexia font
  if (
    userData.dyslexiaLearningPreferences?.dyslexiaOpenDyslexicFont ||
    userData.dyslexiaLearningPreferences?.dysgraphiaClearFonts
  ) {
    applyDyslexiaFont();
  } else {
    removeDyslexiaFont();
  }
}

function applySavedFontSize() {
  if (currentFontSize) {
    document.documentElement.style.fontSize = currentFontSize;
  }
}

function applyDyslexiaFont() {
  document.body.style.fontFamily = '"OpenDyslexic", Arial, sans-serif';
}

function removeDyslexiaFont() {
  document.body.style.fontFamily = "";
}

function increaseFontSize() {
  const root = document.documentElement;
  let currentSize = window.getComputedStyle(root).fontSize;
  let sizeValue = parseFloat(currentSize);
  let sizeUnit = currentSize.replace(sizeValue, "").trim();

  if (!originalFontSize) {
    originalFontSize = currentSize;
  }

  const newSizeValue = sizeValue + 3;
  root.style.fontSize = `${newSizeValue}${sizeUnit}`;

  currentFontSize = `${newSizeValue}${sizeUnit}`;

  // Save to chrome.storage
  chrome.storage.local.set({ fontSize: currentFontSize });

  console.log(`Font size increased to ${newSizeValue}${sizeUnit}`);
}

function resetFontSize() {
  const root = document.documentElement;

  if (originalFontSize) {
    root.style.fontSize = originalFontSize;
    currentFontSize = originalFontSize;
    originalFontSize = null;
  } else {
    root.style.fontSize = "";
    currentFontSize = null;
  }

  // Save to chrome.storage
  chrome.storage.local.set({ fontSize: currentFontSize });

  console.log("Font size reset");
}

function applyDarkMode() {
  document.documentElement.style.backgroundColor = "#000";
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

function removeDarkMode() {
  document.body.style.backgroundColor = "";
  document.body.style.color = "";
  document.documentElement.style.filter = "";

  const media = document.querySelectorAll("img, picture, video, iframe");
  media.forEach((el) => {
    el.style.filter = "";
  });
}

// Speech synthesis function
function speakModifiedSelection() {
  // Implementation would go here
}

// Apply settings from chrome.storage
function applySettings(settings) {
  settings.dyslexiaFont ? applyDyslexiaFont() : removeDyslexiaFont();
}

// Listen for messages to apply fixes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SPEAK_SELECTION") {
    speakHighlightedText();
  } else if (message.type === "applyFix" && message.data) {
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

console.log("content.js is running on this page.");
