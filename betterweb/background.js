chrome.runtime.onInstalled.addListener(() => {
  console.log("BetterWeb installed.");
  chrome.runtime.openOptionsPage();
});
