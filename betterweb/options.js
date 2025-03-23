let userData = {}; // Declare userData in the global scope

document.addEventListener("DOMContentLoaded", function () {
  loadPreferences();

  document
    .getElementById("settingsForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      savePreferences();
    });
});

function savePreferences() {
  // Create userData object with all preferences
  const userData = {
    visualDisabilitiesPreferences: {
      lowVisionIncreaseFontSize: document.getElementById(
        "lowVisionIncreaseFontSize"
      ).checked,
      lowVisionIncreaseContrast: document.getElementById(
        "lowVisionIncreaseContrast"
      ).checked,
      colorBlindnessHighContrast: document.getElementById(
        "colorBlindnessHighContrast"
      ).checked,
      colorBlindnessAvoidRedGreen: document.getElementById(
        "colorBlindnessAvoidRedGreen"
      ).checked,
      cataractsBoldText: document.getElementById("cataractsBoldText").checked,
      cataractsHighContrast: document.getElementById("cataractsHighContrast")
        .checked,
      cataractsReduceGlare: document.getElementById("cataractsReduceGlare")
        .checked,
      glaucomaMacularEnlargedText: document.getElementById(
        "glaucomaMacularEnlargedText"
      ).checked,
      glaucomaMacularHighContrast: document.getElementById(
        "glaucomaMacularHighContrast"
      ).checked,
      glaucomaMacularReduceClutter: document.getElementById(
        "glaucomaMacularReduceClutter"
      ).checked,
      presbyopiaIncreaseFontSize: document.getElementById(
        "presbyopiaIncreaseFontSize"
      ).checked,
      presbyopiaHighContrast: document.getElementById("presbyopiaHighContrast")
        .checked,
      visualSnowDarkMode: document.getElementById("visualSnowDarkMode").checked,
      visualSnowReducedContrast: document.getElementById(
        "visualSnowReducedContrast"
      ).checked,
      tunnelVisionContentCentered: document.getElementById(
        "tunnelVisionContentCentered"
      ).checked,
      tunnelVisionNarrowWidth: document.getElementById(
        "tunnelVisionNarrowWidth"
      ).checked,
    },
    dyslexiaLearningPreferences: {
      dyslexiaOpenDyslexicFont: document.getElementById(
        "dyslexiaOpenDyslexicFont"
      ).checked,
      dyslexiaIncreaseLetterSpacing: document.getElementById(
        "dyslexiaIncreaseLetterSpacing"
      ).checked,
      dysgraphiaClearFonts: document.getElementById("dysgraphiaClearFonts")
        .checked,
      dysgraphiaStructuredLayout: document.getElementById(
        "dysgraphiaStructuredLayout"
      ).checked,
      dyscalculiaClearNumericFonts: document.getElementById(
        "dyscalculiaClearNumericFonts"
      ).checked,
      dyscalculiaSpacedOutNumbers: document.getElementById(
        "dyscalculiaSpacedOutNumbers"
      ).checked,
    },
    adhdPreferences: {
      cleanInterface: document.getElementById("cleanInterface").checked,
      largerFonts: document.getElementById("largerFonts").checked,
      minimalVisualClutter: document.getElementById("minimalVisualClutter")
        .checked,
    },
    photosensitivityPreferences: {
      avoidFlashingElements: document.getElementById("avoidFlashingElements")
        .checked,
      useDarkMode: document.getElementById("useDarkMode").checked,
      reduceScreenGlare: document.getElementById("reduceScreenGlare").checked,
    },
    neurologicalCognitivePreferences: {
      migraineReduceBrightness: document.getElementById(
        "migraineReduceBrightness"
      ).checked,
      migraineSoftContrast: document.getElementById("migraineSoftContrast")
        .checked,
      migraineRemoveAnimations: document.getElementById(
        "migraineRemoveAnimations"
      ).checked,
      auditoryProcessingIncreaseFontSize: document.getElementById(
        "auditoryProcessingIncreaseFontSize"
      ).checked,
      auditoryProcessingStructuredLayout: document.getElementById(
        "auditoryProcessingStructuredLayout"
      ).checked,
      autismSpectrumSoftColors: document.getElementById(
        "autismSpectrumSoftColors"
      ).checked,
      autismSpectrumStructuredLayout: document.getElementById(
        "autismSpectrumStructuredLayout"
      ).checked,
    },
    motionSensitivityPreferences: {
      reduceScrolling: document.getElementById("reduceScrolling").checked,
      reduceAnimations: document.getElementById("reduceAnimations").checked,
    },
    autoAlterExperience: document.getElementById("autoAlterExperience").checked,
  };

  // Save to chrome.storage
  chrome.storage.local.set({ userData: userData }, function () {
    console.log("Preferences saved");
    alert("Preferences saved successfully!");
  });
}

function loadPreferences() {
  chrome.storage.local.get(["userData"], function (result) {
    if (result.userData) {
      window.userData = result.userData; // Make userData available globally

      // Now you can safely access userData properties
      // Visual Disabilities Preferences
      document.getElementById("lowVisionIncreaseFontSize").checked =
        result.userData.visualDisabilitiesPreferences.lowVisionIncreaseFontSize;
      document.getElementById("lowVisionIncreaseContrast").checked =
        result.userData.visualDisabilitiesPreferences.lowVisionIncreaseContrast;
      document.getElementById("colorBlindnessHighContrast").checked =
        result.userData.visualDisabilitiesPreferences.colorBlindnessHighContrast;
      document.getElementById("colorBlindnessAvoidRedGreen").checked =
        result.userData.visualDisabilitiesPreferences.colorBlindnessAvoidRedGreen;
      document.getElementById("cataractsBoldText").checked =
        result.userData.visualDisabilitiesPreferences.cataractsBoldText;
      document.getElementById("cataractsHighContrast").checked =
        result.userData.visualDisabilitiesPreferences.cataractsHighContrast;
      document.getElementById("cataractsReduceGlare").checked =
        result.userData.visualDisabilitiesPreferences.cataractsReduceGlare;
      document.getElementById("glaucomaMacularEnlargedText").checked =
        result.userData.visualDisabilitiesPreferences.glaucomaMacularEnlargedText;
      document.getElementById("glaucomaMacularHighContrast").checked =
        result.userData.visualDisabilitiesPreferences.glaucomaMacularHighContrast;
      document.getElementById("glaucomaMacularReduceClutter").checked =
        result.userData.visualDisabilitiesPreferences.glaucomaMacularReduceClutter;
      document.getElementById("presbyopiaIncreaseFontSize").checked =
        result.userData.visualDisabilitiesPreferences.presbyopiaIncreaseFontSize;
      document.getElementById("presbyopiaHighContrast").checked =
        result.userData.visualDisabilitiesPreferences.presbyopiaHighContrast;
      document.getElementById("visualSnowDarkMode").checked =
        result.userData.visualDisabilitiesPreferences.visualSnowDarkMode;
      document.getElementById("visualSnowReducedContrast").checked =
        result.userData.visualDisabilitiesPreferences.visualSnowReducedContrast;
      document.getElementById("tunnelVisionContentCentered").checked =
        result.userData.visualDisabilitiesPreferences.tunnelVisionContentCentered;
      document.getElementById("tunnelVisionNarrowWidth").checked =
        result.userData.visualDisabilitiesPreferences.tunnelVisionNarrowWidth;

      // Dyslexia/Learning Disabilities Preferences
      document.getElementById("dyslexiaOpenDyslexicFont").checked =
        result.userData.dyslexiaLearningPreferences.dyslexiaOpenDyslexicFont;
      document.getElementById("dyslexiaIncreaseLetterSpacing").checked =
        result.userData.dyslexiaLearningPreferences.dyslexiaIncreaseLetterSpacing;
      document.getElementById("dysgraphiaClearFonts").checked =
        result.userData.dyslexiaLearningPreferences.dysgraphiaClearFonts;
      document.getElementById("dysgraphiaStructuredLayout").checked =
        result.userData.dyslexiaLearningPreferences.dysgraphiaStructuredLayout;
      document.getElementById("dyscalculiaClearNumericFonts").checked =
        result.userData.dyslexiaLearningPreferences.dyscalculiaClearNumericFonts;
      document.getElementById("dyscalculiaSpacedOutNumbers").checked =
        result.userData.dyslexiaLearningPreferences.dyscalculiaSpacedOutNumbers;

      // ADHD Preferences
      document.getElementById("cleanInterface").checked =
        result.userData.adhdPreferences.cleanInterface;
      document.getElementById("largerFonts").checked =
        result.userData.adhdPreferences.largerFonts;
      document.getElementById("minimalVisualClutter").checked =
        result.userData.adhdPreferences.minimalVisualClutter;

      // Photosensitivity Preferences
      document.getElementById("avoidFlashingElements").checked =
        result.userData.photosensitivityPreferences.avoidFlashingElements;
      document.getElementById("useDarkMode").checked =
        result.userData.photosensitivityPreferences.useDarkMode;
      document.getElementById("reduceScreenGlare").checked =
        result.userData.photosensitivityPreferences.reduceScreenGlare;

      // Neurological/Cognitive Preferences
      document.getElementById("migraineReduceBrightness").checked =
        result.userData.neurologicalCognitivePreferences.migraineReduceBrightness;
      document.getElementById("migraineSoftContrast").checked =
        result.userData.neurologicalCognitivePreferences.migraineSoftContrast;
      document.getElementById("migraineRemoveAnimations").checked =
        result.userData.neurologicalCognitivePreferences.migraineRemoveAnimations;
      document.getElementById("auditoryProcessingIncreaseFontSize").checked =
        result.userData.neurologicalCognitivePreferences.auditoryProcessingIncreaseFontSize;
      document.getElementById("auditoryProcessingStructuredLayout").checked =
        result.userData.neurologicalCognitivePreferences.auditoryProcessingStructuredLayout;
      document.getElementById("autismSpectrumSoftColors").checked =
        result.userData.neurologicalCognitivePreferences.autismSpectrumSoftColors;
      document.getElementById("autismSpectrumStructuredLayout").checked =
        result.userData.neurologicalCognitivePreferences.autismSpectrumStructuredLayout;

      // Motion Sensitivity Preferences
      document.getElementById("reduceScrolling").checked =
        result.userData.motionSensitivityPreferences.reduceScrolling;
      document.getElementById("reduceAnimations").checked =
        result.userData.motionSensitivityPreferences.reduceAnimations;

      // Auto-alter Experience
      document.getElementById("autoAlterExperience").checked =
        result.userData.autoAlterExperience;
    }
  });
}
