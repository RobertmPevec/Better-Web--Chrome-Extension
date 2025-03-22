// Define functions to apply or remove each setting
function applyDyslexiaFont() {
  document.body.style.fontFamily = '"OpenDyslexic", Arial, sans-serif';
}

function removeDyslexiaFont() {
  document.body.style.fontFamily = '';
}

function applyDarkMode() {
  document.body.style.backgroundColor = '#121212';
  document.body.style.color = '#FFFFFF';
}

function removeDarkMode() {
  document.body.style.backgroundColor = '';
  document.body.style.color = '';
}

// Function to apply settings based on stored preferences
function applySettings(settings) {
  settings.dyslexiaFont ? applyDyslexiaFont() : removeDyslexiaFont();
  settings.darkMode ? applyDarkMode() : removeDarkMode();
}

// Initial load: Get and apply stored settings
chrome.storage.sync.get(['dyslexiaFont', 'darkMode'], (settings) => {
  applySettings(settings);
});

// Listen for changes to update settings dynamically
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    chrome.storage.sync.get(['dyslexiaFont', 'darkMode'], (settings) => {
      applySettings(settings);
    });
  }
});
