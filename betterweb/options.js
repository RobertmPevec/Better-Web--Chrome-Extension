document.addEventListener('DOMContentLoaded', () => {
  // Load stored settings and populate the form
  chrome.storage.sync.get(
    ['dyslexiaFont', 'darkMode', 'colorBlind', 'textSize'],
    (settings) => {
      document.getElementById('dyslexiaFont').checked = settings.dyslexiaFont || false;
      document.getElementById('darkMode').checked = settings.darkMode || false;
      document.getElementById('colorBlind').checked = settings.colorBlind || false;
      document.getElementById('textSize').value = settings.textSize || 'default';
    }
  );

  // Handle form submission
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
});
