// User data storage
let userData = {
  visualDisabilities: false,
  dyslexiaLearningDisabilities: false,
  adhd: false,
  photosensitivity: false,
  neurologicalCognitive: false,
  motionSensitivity: false,
  other: false,

  visualDisabilitiesPreferences: {
    lowVisionIncreaseFontSize: false,
    lowVisionIncreaseContrast: false,
    colorBlindnessHighContrast: false,
    colorBlindnessAvoidRedGreen: false,
    cataractsBoldText: false,
    cataractsHighContrast: false,
    cataractsReduceGlare: false,
    glaucomaMacularEnlargedText: false,
    glaucomaMacularHighContrast: false,
    glaucomaMacularReduceClutter: false,
    presbyopiaIncreaseFontSize: false,
    presbyopiaHighContrast: false,
    visualSnowDarkMode: false,
    visualSnowReducedContrast: false,
    tunnelVisionContentCentered: false,
    tunnelVisionNarrowWidth: false,
  },
  dyslexiaLearningPreferences: {
    dyslexiaOpenDyslexicFont: false,
    dyslexiaIncreaseLetterSpacing: false,
    dysgraphiaClearFonts: false,
    dysgraphiaStructuredLayout: false,
    dyscalculiaClearNumericFonts: false,
    dyscalculiaSpacedOutNumbers: false,
  },
  adhdPreferences: {
    cleanInterface: false,
    largerFonts: false,
    minimalVisualClutter: false,
  },
  photosensitivityPreferences: {
    avoidFlashingElements: false,
    useDarkMode: false,
    reduceScreenGlare: false,
  },
  neurologicalCognitivePreferences: {
    migraineReduceBrightness: false,
    migraineSoftContrast: false,
    migraineRemoveAnimations: false,
    auditoryProcessingIncreaseFontSize: false,
    auditoryProcessingStructuredLayout: false,
    autismSpectrumSoftColors: false,
    autismSpectrumStructuredLayout: false,
  },
  motionSensitivityPreferences: {
    reduceScrolling: false,
    reduceAnimations: false,
  },
  autoAlterExperience: false,
};

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  // Initialize progress bar
  updateProgress(1);

  // Add event listeners for next buttons
  document.getElementById("nextStep1").addEventListener("click", function () {
    handleNextStep(1);
  });

  document.getElementById("nextStep2").addEventListener("click", function () {
    handleNextStep(2);
  });

  document.getElementById("submitForm").addEventListener("click", submitForm);
});

// Update progress bar
function updateProgress(step) {
  const progress = {
    1: 33,
    2: 66,
    3: 100,
  };
  document.getElementById("progressBar").style.width = progress[step] + "%";
}

// Generate preferences HTML based on selected needs
function generatePreferencesHTML() {
  let html = '<h2 class="step-title">Select your preferences</h2>';

  // Visual Disabilities Preferences
  if (userData.visualDisabilities) {
    html += `
            <div class="preference-section">
                <h3>Visual Disabilities Preferences</h3>
                <div class="checkbox-item">
                    <input type="checkbox" id="lowVisionIncreaseFontSize" value="lowVisionIncreaseFontSize">
                    <label for="lowVisionIncreaseFontSize">Low Vision: Increase Font Size</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="lowVisionIncreaseContrast" value="lowVisionIncreaseContrast">
                    <label for="lowVisionIncreaseContrast">Low Vision: Increase Contrast</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="colorBlindnessHighContrast" value="colorBlindnessHighContrast">
                    <label for="colorBlindnessHighContrast">Color Blindness: High Contrast</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="colorBlindnessAvoidRedGreen" value="colorBlindnessAvoidRedGreen">
                    <label for="colorBlindnessAvoidRedGreen">Color Blindness: Avoid Red/Green</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="cataractsBoldText" value="cataractsBoldText">
                    <label for="cataractsBoldText">Cataracts: Bold Text</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="cataractsHighContrast" value="cataractsHighContrast">
                    <label for="cataractsHighContrast">Cataracts: High Contrast</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="cataractsReduceGlare" value="cataractsReduceGlare">
                    <label for="cataractsReduceGlare">Cataracts: Reduce Glare</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="glaucomaMacularEnlargedText" value="glaucomaMacularEnlargedText">
                    <label for="glaucomaMacularEnlargedText">Glaucoma/Macular: Enlarged Text</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="glaucomaMacularHighContrast" value="glaucomaMacularHighContrast">
                    <label for="glaucomaMacularHighContrast">Glaucoma/Macular: High Contrast</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="glaucomaMacularReduceClutter" value="glaucomaMacularReduceClutter">
                    <label for="glaucomaMacularReduceClutter">Glaucoma/Macular: Reduce Clutter</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="presbyopiaIncreaseFontSize" value="presbyopiaIncreaseFontSize">
                    <label for="presbyopiaIncreaseFontSize">Presbyopia: Increase Font Size</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="presbyopiaHighContrast" value="presbyopiaHighContrast">
                    <label for="presbyopiaHighContrast">Presbyopia: High Contrast</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="visualSnowDarkMode" value="visualSnowDarkMode">
                    <label for="visualSnowDarkMode">Visual Snow: Dark Mode</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="visualSnowReducedContrast" value="visualSnowReducedContrast">
                    <label for="visualSnowReducedContrast">Visual Snow: Reduced Contrast</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="tunnelVisionContentCentered" value="tunnelVisionContentCentered">
                    <label for="tunnelVisionContentCentered">Tunnel Vision: Content Centered</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="tunnelVisionNarrowWidth" value="tunnelVisionNarrowWidth">
                    <label for="tunnelVisionNarrowWidth">Tunnel Vision: Narrow Width</label>
                </div>
            </div>
        `;
  }

  // Dyslexia/Learning Disabilities Preferences
  if (userData.dyslexiaLearningDisabilities) {
    html += `
            <div class="preference-section">
                <h3>Dyslexia/Learning Disabilities Preferences</h3>
                <div class="checkbox-item">
                    <input type="checkbox" id="dyslexiaOpenDyslexicFont" value="dyslexiaOpenDyslexicFont">
                    <label for="dyslexiaOpenDyslexicFont">Dyslexia: OpenDyslexic Font</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="dyslexiaIncreaseLetterSpacing" value="dyslexiaIncreaseLetterSpacing">
                    <label for="dyslexiaIncreaseLetterSpacing">Dyslexia: Increase Letter Spacing</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="dysgraphiaClearFonts" value="dysgraphiaClearFonts">
                    <label for="dysgraphiaClearFonts">Dysgraphia: Clear Fonts</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="dysgraphiaStructuredLayout" value="dysgraphiaStructuredLayout">
                    <label for="dysgraphiaStructuredLayout">Dysgraphia: Structured Layout</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="dyscalculiaClearNumericFonts" value="dyscalculiaClearNumericFonts">
                    <label for="dyscalculiaClearNumericFonts">Dyscalculia: Clear Numeric Fonts</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="dyscalculiaSpacedOutNumbers" value="dyscalculiaSpacedOutNumbers">
                    <label for="dyscalculiaSpacedOutNumbers">Dyscalculia: Spaced Out Numbers</label>
                </div>
            </div>
        `;
  }

  // ADHD Preferences
  if (userData.adhd) {
    html += `
            <div class="preference-section">
                <h3>ADHD Preferences</h3>
                <div class="checkbox-item">
                    <input type="checkbox" id="cleanInterface" value="cleanInterface">
                    <label for="cleanInterface">Clean Interface</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="largerFonts" value="largerFonts">
                    <label for="largerFonts">Larger Fonts</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="minimalVisualClutter" value="minimalVisualClutter">
                    <label for="minimalVisualClutter">Minimal Visual Clutter</label>
                </div>
            </div>
        `;
  }

  // Photosensitivity Preferences
  if (userData.photosensitivity) {
    html += `
            <div class="preference-section">
                <h3>Photosensitivity Preferences</h3>
                <div class="checkbox-item">
                    <input type="checkbox" id="avoidFlashingElements" value="avoidFlashingElements">
                    <label for="avoidFlashingElements">Avoid Flashing Elements</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="useDarkMode" value="useDarkMode">
                    <label for="useDarkMode">Use Dark Mode</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="reduceScreenGlare" value="reduceScreenGlare">
                    <label for="reduceScreenGlare">Reduce Screen Glare</label>
                </div>
            </div>
        `;
  }

  // Neurological/Cognitive Preferences
  if (userData.neurologicalCognitive) {
    html += `
            <div class="preference-section">
                <h3>Neurological/Cognitive Preferences</h3>
                <div class="checkbox-item">
                    <input type="checkbox" id="migraineReduceBrightness" value="migraineReduceBrightness">
                    <label for="migraineReduceBrightness">Migraine: Reduce Brightness</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="migraineSoftContrast" value="migraineSoftContrast">
                    <label for="migraineSoftContrast">Migraine: Soft Contrast</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="migraineRemoveAnimations" value="migraineRemoveAnimations">
                    <label for="migraineRemoveAnimations">Migraine: Remove Animations</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="auditoryProcessingIncreaseFontSize" value="auditoryProcessingIncreaseFontSize">
                    <label for="auditoryProcessingIncreaseFontSize">Auditory Processing: Increase Font Size</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="auditoryProcessingStructuredLayout" value="auditoryProcessingStructuredLayout">
                    <label for="auditoryProcessingStructuredLayout">Auditory Processing: Structured Layout</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="autismSpectrumSoftColors" value="autismSpectrumSoftColors">
                    <label for="autismSpectrumSoftColors">Autism Spectrum: Soft Colors</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="autismSpectrumStructuredLayout" value="autismSpectrumStructuredLayout">
                    <label for="autismSpectrumStructuredLayout">Autism Spectrum: Structured Layout</label>
                </div>
            </div>
        `;
  }

  // Motion Sensitivity Preferences
  if (userData.motionSensitivity) {
    html += `
            <div class="preference-section">
                <h3>Motion Sensitivity Preferences</h3>
                <div class="checkbox-item">
                    <input type="checkbox" id="reduceScrolling" value="reduceScrolling">
                    <label for="reduceScrolling">Reduce Scrolling</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="reduceAnimations" value="reduceAnimations">
                    <label for="reduceAnimations">Reduce Animations</label>
                </div>
            </div>
        `;
  }

  return html;
}

// Handle next step navigation
function handleNextStep(currentStep) {
  if (currentStep === 1) {
    // Save needs selections
    userData.visualDisabilities =
      document.getElementById("visualDisabilities").checked;
    userData.dyslexiaLearningDisabilities = document.getElementById(
      "dyslexiaLearningDisabilities"
    ).checked;
    userData.adhd = document.getElementById("adhd").checked;
    userData.photosensitivity =
      document.getElementById("photosensitivity").checked;
    userData.neurologicalCognitive = document.getElementById(
      "neurologicalCognitive"
    ).checked;
    userData.motionSensitivity =
      document.getElementById("motionSensitivity").checked;
    userData.other = document.getElementById("other").checked;

    // Generate preferences content
    document.getElementById("preferencesContent").innerHTML =
      generatePreferencesHTML();
  }

  if (currentStep === 2) {
    // Save preferences
    if (userData.visualDisabilities) {
      userData.visualDisabilitiesPreferences.lowVisionIncreaseFontSize =
        document.getElementById("lowVisionIncreaseFontSize").checked;
      userData.visualDisabilitiesPreferences.lowVisionIncreaseContrast =
        document.getElementById("lowVisionIncreaseContrast").checked;
      userData.visualDisabilitiesPreferences.colorBlindnessHighContrast =
        document.getElementById("colorBlindnessHighContrast").checked;
      userData.visualDisabilitiesPreferences.colorBlindnessAvoidRedGreen =
        document.getElementById("colorBlindnessAvoidRedGreen").checked;
      userData.visualDisabilitiesPreferences.cataractsBoldText =
        document.getElementById("cataractsBoldText").checked;
      userData.visualDisabilitiesPreferences.cataractsHighContrast =
        document.getElementById("cataractsHighContrast").checked;
      userData.visualDisabilitiesPreferences.cataractsReduceGlare =
        document.getElementById("cataractsReduceGlare").checked;
      userData.visualDisabilitiesPreferences.glaucomaMacularEnlargedText =
        document.getElementById("glaucomaMacularEnlargedText").checked;
      userData.visualDisabilitiesPreferences.glaucomaMacularHighContrast =
        document.getElementById("glaucomaMacularHighContrast").checked;
      userData.visualDisabilitiesPreferences.glaucomaMacularReduceClutter =
        document.getElementById("glaucomaMacularReduceClutter").checked;
      userData.visualDisabilitiesPreferences.presbyopiaIncreaseFontSize =
        document.getElementById("presbyopiaIncreaseFontSize").checked;
      userData.visualDisabilitiesPreferences.presbyopiaHighContrast =
        document.getElementById("presbyopiaHighContrast").checked;
      userData.visualDisabilitiesPreferences.visualSnowDarkMode =
        document.getElementById("visualSnowDarkMode").checked;
      userData.visualDisabilitiesPreferences.visualSnowReducedContrast =
        document.getElementById("visualSnowReducedContrast").checked;
      userData.visualDisabilitiesPreferences.tunnelVisionContentCentered =
        document.getElementById("tunnelVisionContentCentered").checked;
      userData.visualDisabilitiesPreferences.tunnelVisionNarrowWidth =
        document.getElementById("tunnelVisionNarrowWidth").checked;
    }

    if (userData.dyslexiaLearningDisabilities) {
      userData.dyslexiaLearningPreferences.dyslexiaOpenDyslexicFont =
        document.getElementById("dyslexiaOpenDyslexicFont").checked;
      userData.dyslexiaLearningPreferences.dyslexiaIncreaseLetterSpacing =
        document.getElementById("dyslexiaIncreaseLetterSpacing").checked;
      userData.dyslexiaLearningPreferences.dysgraphiaClearFonts =
        document.getElementById("dysgraphiaClearFonts").checked;
      userData.dyslexiaLearningPreferences.dysgraphiaStructuredLayout =
        document.getElementById("dysgraphiaStructuredLayout").checked;
      userData.dyslexiaLearningPreferences.dyscalculiaClearNumericFonts =
        document.getElementById("dyscalculiaClearNumericFonts").checked;
      userData.dyslexiaLearningPreferences.dyscalculiaSpacedOutNumbers =
        document.getElementById("dyscalculiaSpacedOutNumbers").checked;
    }

    if (userData.adhd) {
      userData.adhdPreferences.cleanInterface =
        document.getElementById("cleanInterface").checked;
      userData.adhdPreferences.largerFonts =
        document.getElementById("largerFonts").checked;
      userData.adhdPreferences.minimalVisualClutter = document.getElementById(
        "minimalVisualClutter"
      ).checked;
    }

    if (userData.photosensitivity) {
      userData.photosensitivityPreferences.avoidFlashingElements =
        document.getElementById("avoidFlashingElements").checked;
      userData.photosensitivityPreferences.useDarkMode =
        document.getElementById("useDarkMode").checked;
      userData.photosensitivityPreferences.reduceScreenGlare =
        document.getElementById("reduceScreenGlare").checked;
    }

    if (userData.neurologicalCognitive) {
      userData.neurologicalCognitivePreferences.migraineReduceBrightness =
        document.getElementById("migraineReduceBrightness").checked;
      userData.neurologicalCognitivePreferences.migraineSoftContrast =
        document.getElementById("migraineSoftContrast").checked;
      userData.neurologicalCognitivePreferences.migraineRemoveAnimations =
        document.getElementById("migraineRemoveAnimations").checked;
      userData.neurologicalCognitivePreferences.auditoryProcessingIncreaseFontSize =
        document.getElementById("auditoryProcessingIncreaseFontSize").checked;
      userData.neurologicalCognitivePreferences.auditoryProcessingStructuredLayout =
        document.getElementById("auditoryProcessingStructuredLayout").checked;
      userData.neurologicalCognitivePreferences.autismSpectrumSoftColors =
        document.getElementById("autismSpectrumSoftColors").checked;
      userData.neurologicalCognitivePreferences.autismSpectrumStructuredLayout =
        document.getElementById("autismSpectrumStructuredLayout").checked;
    }

    if (userData.motionSensitivity) {
      userData.motionSensitivityPreferences.reduceScrolling =
        document.getElementById("reduceScrolling").checked;
      userData.motionSensitivityPreferences.reduceAnimations =
        document.getElementById("reduceAnimations").checked;
    }
  }

  // Move to next step
  document.getElementById(`step${currentStep}`).classList.remove("active");
  document.getElementById(`step${currentStep + 1}`).classList.add("active");
  updateProgress(currentStep + 1);
}

// Handle form submission
function submitForm() {
  // Save auto-alter experience preference
  userData.autoAlterExperience = document.getElementById(
    "autoAlterExperience"
  ).checked;

  chrome.storage.local.set({ userData: userData }, function () {
    console.log("User preferences saved");
  });

  window.location.href = "options.html";
}
