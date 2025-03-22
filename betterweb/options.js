document.getElementById('save').addEventListener('click', () => {
    const settings = {
      dyslexiaFont: document.getElementById('dyslexiaFont').checked,
      darkMode: document.getElementById('darkMode').checked
    };
  
    chrome.storage.sync.set(settings, () => {
      alert("Settings saved!");
    });
  });
  