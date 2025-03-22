document.getElementById('openOptions').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
  document.addEventListener('DOMContentLoaded', () => {
    const dyslexiaCheckbox = document.getElementById('enableDyslexia');
    const darkModeCheckbox = document.getElementById('enableDarkMode');
    const colorBlindCheckbox = document.getElementById('enableColorBlind');
    const openOptionsButton = document.getElementById('openOptions');
  
    // Load saved settings from chrome.storage.sync
    chrome.storage.sync.get(['dyslexiaFont', 'darkMode', 'colorBlind'], (result) => {
      dyslexiaCheckbox.checked = result.dyslexiaFont || false;
      darkModeCheckbox.checked = result.darkMode || false;
      colorBlindCheckbox.checked = result.colorBlind || false;
    });
  
    // Save changes when toggles are switched
    dyslexiaCheckbox.addEventListener('change', () => {
      chrome.storage.sync.set({ dyslexiaFont: dyslexiaCheckbox.checked });
    });
  
    darkModeCheckbox.addEventListener('change', () => {
      chrome.storage.sync.set({ darkMode: darkModeCheckbox.checked });
    });
  
    colorBlindCheckbox.addEventListener('change', () => {
      chrome.storage.sync.set({ colorBlind: colorBlindCheckbox.checked });
    });
  
    // Open the full Options page (options.html)
    openOptionsButton.addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  });
  