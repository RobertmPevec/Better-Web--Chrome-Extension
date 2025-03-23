
function applyDyslexiaFont() {
  document.body.style.fontFamily = '"OpenDyslexic", Arial, sans-serif';
}

function removeDyslexiaFont() {
  document.body.style.fontFamily = '';
}

function applyDarkMode() {
  document.documentElement.style.backgroundColor = '#000'; // optional
  document.documentElement.style.color = '#fff';
  document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';

  const media = document.querySelectorAll('img, picture, video, iframe');
  media.forEach(el => {
    el.style.filter = 'invert(1) hue-rotate(180deg)';
  });
}

function speakHighlightedText(text = null) {
  const selection = text || window.getSelection().toString().trim();
  if (selection.length > 0) {
    const utterance = new SpeechSynthesisUtterance(selection);
    utterance.lang = 'en-US';      
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


function isVeryDarkColor(color) {
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return false;
  const [r, g, b] = rgb.map(Number);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 80; // tweak this if you want to be stricter
}


function getBrightness(color) {
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return 0;
  const [r, g, b] = rgb.map(Number);
  return (r * 299 + g * 587 + b * 114) / 1000;
}


function isLightColor(color){
  const rgb = color.match(/\d+/g);
  if(!rgb || rgb.length < 3) return false;
  const [r, g, b] = rgb.map(Number);
  const brightness = (r * 299 + g * 587 +  b*114)/1000;
  return brightness > 180;

}

function removeDarkMode() {
  document.body.style.backgroundColor = '';
  document.body.style.color = '';
}

//We need to store the old version first

function applySettings(settings) {
  settings.dyslexiaFont ? applyDyslexiaFont() : removeDyslexiaFont();
  settings.darkMode ? applyDarkMode() : removeDarkMode();
}

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
