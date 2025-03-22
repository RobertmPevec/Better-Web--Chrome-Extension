document.addEventListener('DOMContentLoaded', () => {
  const enableBtn = document.getElementById('enableBtn');
  const disableBtn = document.getElementById('disableBtn');
  const openOptionsButton = document.getElementById('openOptions');

  // Handle "Enable"
  enableBtn.addEventListener('click', () => {
    chrome.storage.sync.set({ extensionEnabled: true }, () => {
      alert('BetterWeb has been enabled!');
    });
  });

  // Handle "Disable"
  disableBtn.addEventListener('click', () => {
    chrome.storage.sync.set({ extensionEnabled: false }, () => {
      alert('BetterWeb has been disabled.');
    });
  });

  // Open the full Options page
  openOptionsButton.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
});
