import React, { useState } from "react";
import "./FormPage.css";

type FormData = {
  conditions: {
    visualDisabilities: boolean;
    dyslexiaLearningDisabilities: boolean;
    adhd: boolean;
    photosensitivity: boolean;
    neurologicalCognitive: boolean;
    motionSensitivity: boolean;
    other: string;
  };
  visualDisabilitiesPreferences: {
    lowVisionIncreaseFontSize: boolean;
    lowVisionIncreaseContrast: boolean;
    colorBlindnessHighContrast: boolean;
    colorBlindnessAvoidRedGreen: boolean;
    cataractsBoldText: boolean;
    cataractsHighContrast: boolean;
    cataractsReduceGlare: boolean;
    glaucomaMacularEnlargedText: boolean;
    glaucomaMacularHighContrast: boolean;
    glaucomaMacularReduceClutter: boolean;
    presbyopiaIncreaseFontSize: boolean;
    presbyopiaHighContrast: boolean;
    visualSnowDarkMode: boolean;
    visualSnowReducedContrast: boolean;
    tunnelVisionContentCentered: boolean;
    tunnelVisionNarrowWidth: boolean;
  };
  dyslexiaLearningPreferences: {
    dyslexiaOpenDyslexicFont: boolean;
    dyslexiaIncreaseLetterSpacing: boolean;
    dysgraphiaClearFonts: boolean;
    dysgraphiaStructuredLayout: boolean;
    dyscalculiaClearNumericFonts: boolean;
    dyscalculiaSpacedOutNumbers: boolean;
  };
  adhdPreferences: {
    cleanInterface: boolean;
    largerFonts: boolean;
    minimalVisualClutter: boolean;
  };
  photosensitivityPreferences: {
    avoidFlashingElements: boolean;
    useDarkMode: boolean;
    reduceScreenGlare: boolean;
  };
  neurologicalCognitivePreferences: {
    migraineReduceBrightness: boolean;
    migraineSoftContrast: boolean;
    migraineRemoveAnimations: boolean;
    auditoryProcessingIncreaseFontSize: boolean;
    auditoryProcessingStructuredLayout: boolean;
    autismSpectrumSoftColors: boolean;
    autismSpectrumStructuredLayout: boolean;
  };
  motionSensitivityPreferences: {
    reduceScrolling: boolean;
    reduceAnimations: boolean;
  };
  autoAlterExperience: boolean;
};

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    conditions: {
      visualDisabilities: false,
      dyslexiaLearningDisabilities: false,
      adhd: false,
      photosensitivity: false,
      neurologicalCognitive: false,
      motionSensitivity: false,
      other: "",
    },
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
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleCheckboxChange = (
    field: keyof FormData["conditions"],
    value: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [field]: value,
      },
    }));
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        other: e.target.value,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePreferenceChange = (
    section: keyof FormData,
    field: string,
    value: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, boolean>),
        [field]: value,
      },
    }));
  };

  const handleAutoAlterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      autoAlterExperience: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    // Make form data accessible elsewhere
    window.dispatchEvent(
      new CustomEvent("formSubmitted", { detail: formData })
    );
    (window as any).formData = formData;
  };

  const progressBarWidth = `${(currentStep / totalSteps) * 100}%`;

  return (
    <div className="form-container">
      <h1 className="header-text">Please enter the following information:</h1>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: progressBarWidth }}></div>
      </div>

      {currentStep === 1 && (
        <div className="form-step">
          <h2>Step 1: Conditions</h2>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.conditions.visualDisabilities}
                onChange={() =>
                  handleCheckboxChange(
                    "visualDisabilities",
                    !formData.conditions.visualDisabilities
                  )
                }
              />
              Visual Disabilities
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.conditions.dyslexiaLearningDisabilities}
                onChange={() =>
                  handleCheckboxChange(
                    "dyslexiaLearningDisabilities",
                    !formData.conditions.dyslexiaLearningDisabilities
                  )
                }
              />
              Dyslexia & Learning Disabilities
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.conditions.adhd}
                onChange={() =>
                  handleCheckboxChange("adhd", !formData.conditions.adhd)
                }
              />
              ADHD
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.conditions.photosensitivity}
                onChange={() =>
                  handleCheckboxChange(
                    "photosensitivity",
                    !formData.conditions.photosensitivity
                  )
                }
              />
              Photosensitivity & Seizure Disorders
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.conditions.neurologicalCognitive}
                onChange={() =>
                  handleCheckboxChange(
                    "neurologicalCognitive",
                    !formData.conditions.neurologicalCognitive
                  )
                }
              />
              Neurological & Cognitive Disabilities
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.conditions.motionSensitivity}
                onChange={() =>
                  handleCheckboxChange(
                    "motionSensitivity",
                    !formData.conditions.motionSensitivity
                  )
                }
              />
              Motion Sensitivity
            </label>
          </div>
          <div className="other-input">
            <label>
              Other:
              <input
                type="text"
                value={formData.conditions.other}
                onChange={handleOtherChange}
                placeholder="Please specify"
                className="other-box"
              />
            </label>
          </div>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="form-step">
          <h2>Step 2: Preferences</h2>

          {formData.conditions.visualDisabilities && (
            <div className="category">
              <h3>Visual Disabilities</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .lowVisionIncreaseFontSize
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "lowVisionIncreaseFontSize",
                        !formData.visualDisabilitiesPreferences
                          .lowVisionIncreaseFontSize
                      )
                    }
                  />
                  Low Vision: Increase font size
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .lowVisionIncreaseContrast
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "lowVisionIncreaseContrast",
                        !formData.visualDisabilitiesPreferences
                          .lowVisionIncreaseContrast
                      )
                    }
                  />
                  Low Vision: Increase contrast
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .colorBlindnessHighContrast
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "colorBlindnessHighContrast",
                        !formData.visualDisabilitiesPreferences
                          .colorBlindnessHighContrast
                      )
                    }
                  />
                  Color Blindness: Use high-contrast colors
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .colorBlindnessAvoidRedGreen
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "colorBlindnessAvoidRedGreen",
                        !formData.visualDisabilitiesPreferences
                          .colorBlindnessAvoidRedGreen
                      )
                    }
                  />
                  Color Blindness: Avoid red/green indicators
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences.cataractsBoldText
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "cataractsBoldText",
                        !formData.visualDisabilitiesPreferences
                          .cataractsBoldText
                      )
                    }
                  />
                  Cataracts: Bold text
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .cataractsHighContrast
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "cataractsHighContrast",
                        !formData.visualDisabilitiesPreferences
                          .cataractsHighContrast
                      )
                    }
                  />
                  Cataracts: High contrast
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .cataractsReduceGlare
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "cataractsReduceGlare",
                        !formData.visualDisabilitiesPreferences
                          .cataractsReduceGlare
                      )
                    }
                  />
                  Cataracts: Reduce glare
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .glaucomaMacularEnlargedText
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "glaucomaMacularEnlargedText",
                        !formData.visualDisabilitiesPreferences
                          .glaucomaMacularEnlargedText
                      )
                    }
                  />
                  Glaucoma & Macular Degeneration: Enlarged text
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .glaucomaMacularHighContrast
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "glaucomaMacularHighContrast",
                        !formData.visualDisabilitiesPreferences
                          .glaucomaMacularHighContrast
                      )
                    }
                  />
                  Glaucoma & Macular Degeneration: High contrast
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .glaucomaMacularReduceClutter
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "glaucomaMacularReduceClutter",
                        !formData.visualDisabilitiesPreferences
                          .glaucomaMacularReduceClutter
                      )
                    }
                  />
                  Glaucoma & Macular Degeneration: Reduce clutter
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .presbyopiaIncreaseFontSize
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "presbyopiaIncreaseFontSize",
                        !formData.visualDisabilitiesPreferences
                          .presbyopiaIncreaseFontSize
                      )
                    }
                  />
                  Presbyopia: Increase font size
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .presbyopiaHighContrast
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "presbyopiaHighContrast",
                        !formData.visualDisabilitiesPreferences
                          .presbyopiaHighContrast
                      )
                    }
                  />
                  Presbyopia: High contrast
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences.visualSnowDarkMode
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "visualSnowDarkMode",
                        !formData.visualDisabilitiesPreferences
                          .visualSnowDarkMode
                      )
                    }
                  />
                  Visual Snow Syndrome: Dark mode
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .visualSnowReducedContrast
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "visualSnowReducedContrast",
                        !formData.visualDisabilitiesPreferences
                          .visualSnowReducedContrast
                      )
                    }
                  />
                  Visual Snow Syndrome: Reduced contrast
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .tunnelVisionContentCentered
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "tunnelVisionContentCentered",
                        !formData.visualDisabilitiesPreferences
                          .tunnelVisionContentCentered
                      )
                    }
                  />
                  Tunnel Vision: Keep content centered
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.visualDisabilitiesPreferences
                        .tunnelVisionNarrowWidth
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "visualDisabilitiesPreferences",
                        "tunnelVisionNarrowWidth",
                        !formData.visualDisabilitiesPreferences
                          .tunnelVisionNarrowWidth
                      )
                    }
                  />
                  Tunnel Vision: Narrow width
                </label>
              </div>
            </div>
          )}

          {formData.conditions.dyslexiaLearningDisabilities && (
            <div className="category">
              <h3>Dyslexia & Learning Disabilities</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.dyslexiaLearningPreferences
                        .dyslexiaOpenDyslexicFont
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "dyslexiaLearningPreferences",
                        "dyslexiaOpenDyslexicFont",
                        !formData.dyslexiaLearningPreferences
                          .dyslexiaOpenDyslexicFont
                      )
                    }
                  />
                  Dyslexia: Use OpenDyslexic font
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.dyslexiaLearningPreferences
                        .dyslexiaIncreaseLetterSpacing
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "dyslexiaLearningPreferences",
                        "dyslexiaIncreaseLetterSpacing",
                        !formData.dyslexiaLearningPreferences
                          .dyslexiaIncreaseLetterSpacing
                      )
                    }
                  />
                  Dyslexia: Increase letter spacing
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.dyslexiaLearningPreferences.dysgraphiaClearFonts
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "dyslexiaLearningPreferences",
                        "dysgraphiaClearFonts",
                        !formData.dyslexiaLearningPreferences
                          .dysgraphiaClearFonts
                      )
                    }
                  />
                  Dysgraphia: Use clear fonts
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.dyslexiaLearningPreferences
                        .dysgraphiaStructuredLayout
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "dyslexiaLearningPreferences",
                        "dysgraphiaStructuredLayout",
                        !formData.dyslexiaLearningPreferences
                          .dysgraphiaStructuredLayout
                      )
                    }
                  />
                  Dysgraphia: Use structured layout
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.dyslexiaLearningPreferences
                        .dyscalculiaClearNumericFonts
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "dyslexiaLearningPreferences",
                        "dyscalculiaClearNumericFonts",
                        !formData.dyslexiaLearningPreferences
                          .dyscalculiaClearNumericFonts
                      )
                    }
                  />
                  Dyscalculia: Use clear numeric fonts
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.dyslexiaLearningPreferences
                        .dyscalculiaSpacedOutNumbers
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "dyslexiaLearningPreferences",
                        "dyscalculiaSpacedOutNumbers",
                        !formData.dyslexiaLearningPreferences
                          .dyscalculiaSpacedOutNumbers
                      )
                    }
                  />
                  Dyscalculia: Space out numbers
                </label>
              </div>
            </div>
          )}

          {formData.conditions.adhd && (
            <div className="category">
              <h3>ADHD</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.adhdPreferences.cleanInterface}
                    onChange={() =>
                      handlePreferenceChange(
                        "adhdPreferences",
                        "cleanInterface",
                        !formData.adhdPreferences.cleanInterface
                      )
                    }
                  />
                  Clean, distraction-free interface
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.adhdPreferences.largerFonts}
                    onChange={() =>
                      handlePreferenceChange(
                        "adhdPreferences",
                        "largerFonts",
                        !formData.adhdPreferences.largerFonts
                      )
                    }
                  />
                  Larger fonts
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.adhdPreferences.minimalVisualClutter}
                    onChange={() =>
                      handlePreferenceChange(
                        "adhdPreferences",
                        "minimalVisualClutter",
                        !formData.adhdPreferences.minimalVisualClutter
                      )
                    }
                  />
                  Minimal visual clutter
                </label>
              </div>
            </div>
          )}

          {formData.conditions.photosensitivity && (
            <div className="category">
              <h3>Photosensitivity & Seizure Disorders</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.photosensitivityPreferences.avoidFlashingElements
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "photosensitivityPreferences",
                        "avoidFlashingElements",
                        !formData.photosensitivityPreferences
                          .avoidFlashingElements
                      )
                    }
                  />
                  Avoid flashing elements
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.photosensitivityPreferences.useDarkMode}
                    onChange={() =>
                      handlePreferenceChange(
                        "photosensitivityPreferences",
                        "useDarkMode",
                        !formData.photosensitivityPreferences.useDarkMode
                      )
                    }
                  />
                  Use dark mode
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.photosensitivityPreferences.reduceScreenGlare
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "photosensitivityPreferences",
                        "reduceScreenGlare",
                        !formData.photosensitivityPreferences.reduceScreenGlare
                      )
                    }
                  />
                  Reduce screen glare
                </label>
              </div>
            </div>
          )}

          {formData.conditions.neurologicalCognitive && (
            <div className="category">
              <h3>Neurological & Cognitive Disabilities</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.neurologicalCognitivePreferences
                        .migraineReduceBrightness
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "neurologicalCognitivePreferences",
                        "migraineReduceBrightness",
                        !formData.neurologicalCognitivePreferences
                          .migraineReduceBrightness
                      )
                    }
                  />
                  Migraine Sensitivity: Reduce brightness
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.neurologicalCognitivePreferences
                        .migraineSoftContrast
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "neurologicalCognitivePreferences",
                        "migraineSoftContrast",
                        !formData.neurologicalCognitivePreferences
                          .migraineSoftContrast
                      )
                    }
                  />
                  Migraine Sensitivity: Use soft contrast
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.neurologicalCognitivePreferences
                        .migraineRemoveAnimations
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "neurologicalCognitivePreferences",
                        "migraineRemoveAnimations",
                        !formData.neurologicalCognitivePreferences
                          .migraineRemoveAnimations
                      )
                    }
                  />
                  Migraine Sensitivity: Remove animations
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.neurologicalCognitivePreferences
                        .auditoryProcessingIncreaseFontSize
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "neurologicalCognitivePreferences",
                        "auditoryProcessingIncreaseFontSize",
                        !formData.neurologicalCognitivePreferences
                          .auditoryProcessingIncreaseFontSize
                      )
                    }
                  />
                  Auditory Processing Disorders: Increase font size
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.neurologicalCognitivePreferences
                        .auditoryProcessingStructuredLayout
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "neurologicalCognitivePreferences",
                        "auditoryProcessingStructuredLayout",
                        !formData.neurologicalCognitivePreferences
                          .auditoryProcessingStructuredLayout
                      )
                    }
                  />
                  Auditory Processing Disorders: Use structured layout
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.neurologicalCognitivePreferences
                        .autismSpectrumSoftColors
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "neurologicalCognitivePreferences",
                        "autismSpectrumSoftColors",
                        !formData.neurologicalCognitivePreferences
                          .autismSpectrumSoftColors
                      )
                    }
                  />
                  Autism Spectrum Disorder: Use soft, muted colors
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.neurologicalCognitivePreferences
                        .autismSpectrumStructuredLayout
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "neurologicalCognitivePreferences",
                        "autismSpectrumStructuredLayout",
                        !formData.neurologicalCognitivePreferences
                          .autismSpectrumStructuredLayout
                      )
                    }
                  />
                  Autism Spectrum Disorder: Use structured layout
                </label>
              </div>
            </div>
          )}

          {formData.conditions.motionSensitivity && (
            <div className="category">
              <h3>Motion Sensitivity</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.motionSensitivityPreferences.reduceScrolling
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "motionSensitivityPreferences",
                        "reduceScrolling",
                        !formData.motionSensitivityPreferences.reduceScrolling
                      )
                    }
                  />
                  Reduce scrolling effects
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      formData.motionSensitivityPreferences.reduceAnimations
                    }
                    onChange={() =>
                      handlePreferenceChange(
                        "motionSensitivityPreferences",
                        "reduceAnimations",
                        !formData.motionSensitivityPreferences.reduceAnimations
                      )
                    }
                  />
                  Reduce animations
                </label>
              </div>
            </div>
          )}

          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {currentStep === 3 && (
        <div className="form-step">
          <h2>Step 3: Final Question</h2>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.autoAlterExperience}
                onChange={handleAutoAlterChange}
              />
              (OPTIONAL) I want my web experience to be altered automatically
            </label>
          </div>
          <button onClick={handleBack}>Back</button>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default FormPage;
