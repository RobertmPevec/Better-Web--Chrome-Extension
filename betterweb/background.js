chrome.runtime.onInstalled.addListener(() => {
  console.log("BetterWeb installed.");
  chrome.runtime.openOptionsPage();

  chrome.contextMenus.create({
    id:"speak",
    title: "🔊 Speak selected text",
    contexts: ["selection"]
  });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "speak" && info.selectionText) {
    chrome.tabs.sendMessage(tab.id, {
      action: "SPEAK_SELECTION",
      text: info.selectionText
    });
  }
});

