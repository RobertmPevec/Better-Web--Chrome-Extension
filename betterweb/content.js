chrome.storage.sync.get(['dyslexiaFont', 'darkMode'], (settings) => {
    if (settings.dyslexiaFont) {
      document.body.style.fontFamily = '"OpenDyslexic", Arial, sans-serif';
    }
    if (settings.darkMode) {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#FFFFFF";
    }
  });
  