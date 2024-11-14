# Project Status

## Introduction
This project is a Chrome extension designed to scan Google Form questions, retrieve options, and send the data to a backend for processing. It currently supports text-based question and option extraction. Future updates aim to improve functionality and usability, especially for handling image-based content.

## Current Limitations
- **Text-only Support**: Currently, the extension only extracts questions and options in text format. Image-based questions are not yet supported.
- **OCR Dependency**: Although a backend has been developed for reading text in images using OCR, this API is not yet integrated into the extension. Processing is limited to text inputs.

## Future Scope
1. **Direct Image Processing without OCR**: 
   - Enable direct image processing with Gemini AI, bypassing OCR. This will allow the extension to handle diagrams or data-rich images that OCR might not process accurately.
   
2. **Enhanced Gemini API Integration**:
   - Support for Gemini AI to receive both text and image inputs directly from the extension for more dynamic answer generation.
   
3. **Improved UI/UX Features**:
   - Additional settings and feedback options within the extension to improve user experience.

## Known Issues
- **Parsing Complex Question Formats**: Certain complex question layouts or non-standard text formats may not be accurately parsed by the extension at this stage.
- **Occasional Performance Lags**: The extension may experience slight delays when handling a large number of questions.

## Vision and Roadmap
Our long-term vision is to create a robust Chrome extension that provides seamless question and answer processing for Google Forms, handling both text and image inputs. Below is a high-level roadmap:

1. **Phase 1** - Text-Based Extraction (Current Phase)
   - Support text-based question and option extraction.
   - Initial Gemini API integration for answer generation.

2. **Phase 2** - Image Processing with OCR
   - Integrate backend API for OCR-based text extraction from images.
   
3. **Phase 3** - Direct Image Processing without OCR
   - Allow Gemini API to directly process images for answer generation, supporting diagrams and data-rich images.

4. **Phase 4** - User Experience Enhancements
   - Optimize performance, add customization options, and enhance the UI/UX.

This roadmap outlines the planned progression and upcoming features for the project. Stay tuned for updates!
