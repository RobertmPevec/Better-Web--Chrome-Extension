# BetterWeb Chrome Extension

## Tagline
A customizable Chrome extension that empowers users with disabilities to personalize and enhance their web experience through AI-driven accessibility tools and controls.

## Overview
BetterWeb is a Chrome extension designed to enhance web accessibility for individuals with cognitive and visual disabilities. This project aims to make navigating the web a more inclusive and personalized experience by offering a customizable toolkit powered by assistive technology and AI enhancements. From layout adjustments for ADHD to contrast optimization for color blindness and voice support for those with dyslexia or processing difficulties, BetterWeb provides a wide range of tools that adapt web pages to the user's specific needs.

## Features

### Currently Working Functionality:
- **Accessibility Profile Setup**: Upon installation, users can walk through a 3-step setup form to indicate specific disabilities or preferences (e.g., visual impairments, ADHD, dyslexia).
- **Checkbox-Based Accessibility Controls**: Preferences are saved and synced locally, and corresponding changes can be applied to websites.
- **Text-to-Speech (TTS)**: Users can highlight text and use the right-click menu to activate a speak function that reads the content aloud.
- **Chatbot Assistant**: A floating chatbot exists in the settings interface and the popup. Users can interact with it using natural language to understand features, request help, or even perform visual changes. For example, users can type "turn all body text green" and the chatbot—powered by a fine-tuned large language model—will generate the appropriate DOM updates. It uses reinforcement feedback to improve results and learns from failed commands through structured prompts. This natural-language interface allows users to make accessibility changes without needing any technical knowledge.
- **Theming System**: Users can switch between a variety of soft tone themes (pink, lavender, mint, peach, sky). This feature was especially designed with autism spectrum users in mind, as the available pastel tones have been shown to reduce overstimulation and improve comfort.
- **Manual vs. Auto Mode**: The system allows users to either automatically apply their preferences to web pages or activate them manually. Manual mode is ideal for users who prefer to have full control over when and how changes appear.
- **Options Page Interface**: Fully redesigned options page with categorized settings for Visual Disabilities, Dyslexia, ADHD, Photosensitivity, Neurological/Cognitive Needs, and Motion Sensitivity.
- **No Flashy UI or Animations**: BetterWeb was designed with a clean, simple layout and no unnecessary animations to streamline user experience, reduce sensory overload, and improve focus for users with neurodivergent needs.

### Features Attempted (Limitations Encountered):
- **AI-Based Image Color Correction**: We planned to integrate generative AI to automatically modify image color contrast for different types of color blindness. This was partially implemented but faced limitations due to dynamic image rendering and CSS overrides on many websites.
- **Gradual Reversion of Styles**: A setting to slowly fade accessibility changes out over time was explored but posed challenges when reconciling with aggressive site-level stylesheets.
- **Dynamic Overlay for All Websites**: While basic modifications work on many sites, deeper accessibility features faced resistance due to heavily scoped CSS frameworks (e.g., Shadow DOM, strict style encapsulation).

## Setup Instructions

1. **Download the Entire Project Folder**:
   - Ensure you download or clone all files, including:
     - `manifest.json`
     - `popup.html`, `popup.js`
     - `options.html`, `options.js`, `options.css`
     - `FormPage.html`, `FormPage.js`, `FormPage.css`
     - `content.js`, `tts.js`, `googleTTS.js`, `background.js`
     - Images such as `cloud.png` and `cat.png`

2. **Load Into Chrome**:
   - Go to `chrome://extensions` in your browser.
   - Enable "Developer Mode" (top-right).
   - Click "Load unpacked" and select the root folder of the project.

3. **Start Using the Extension**:
   - The FormPage (on install) will guide the user through choosing accessibility needs.
   - You can open the settings from the popup or directly.
   - Enable/disable the extension and apply preferences to websites.

## Technology Stack
- **Frontend**: HTML, CSS, JavaScript
- **Extension API**: Chrome Extensions API (Manifest V3)
- **AI Integrations**: Cohere API (for chatbot responses and summarized speech output)

## File/Folder Structure
