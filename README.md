# VerbaScribe

## Introduction
**VerbaScribe** is a web application designed to provide seamless and accurate transcription services. Even though it is still work in progress, it leverages the power of machine learning to convert audio files into text effortlessly. Users can upload their MP3 files, select the language, and get the transcription done. This solution is perfect for individuals, businesses, and professionals who need quick and reliable transcription services. Users are advised to confirm the accuracy of the transcriptions.

## Uses and Value Delivery
VerbaScribe offers significant value to both individuals and businesses:
- **For Individuals**:
  - Effortless transcription of personal recordings, meetings, and interviews.
  - Supports multiple languages, making it ideal for language learners and multilingual users.

- **For Businesses**:
  - Streamlines the process of converting meeting recordings, webinars, and podcasts into text.
  - Enhances accessibility by providing text versions of audio content.
  - Saves time and resources spent on manual transcriptions.

## Dependencies
To run VerbaScribe, you need to have the following dependencies installed:
- Python 3.x
- Flask
- SpeechRecognition
- pydub
- ffmpeg

### Installation
You can install the required Python packages using pip:
```bash
pip install Flask SpeechRecognition pydub
```

- Ensure you have ffmpeg installed and available in your system's PATH. For Windows, you can download it from FFmpeg's official website and set the AudioSegment.converter path correctly in the app.py.

### Clone the repository:
```bash
git clone https://github.com/yourusername/verbascribe.git
cd verbascribe
```

### Install dependencies:
```bash
pip install Flask SpeechRecognition pydub
```

### Set up FFmpeg:
- Download and install FFmpeg from FFmpeg's official website.
- Update the AudioSegment.converter path in app.py to point to your local ffmpeg executable.

### Run the application:

```bash
python app.py
```
### Access the application

- Open your web browser and navigate to http://127.0.0.1:5000/.

### Extending the Functionality

#### Here are some ways you can extend the functionality of VerbaScribe:

- **Add Support for More Languages**: Extend the language options in the dropdown to support additional languages.

- **Enhance User Interface**: Improve the front-end design to provide a better user experience.

- **Integrate with Cloud Services**: Integrate with cloud storage services like AWS S3 or Google Drive for file uploads and storage.

- **Implement Real-Time Transcription**: Add functionality for real-time transcription of live audio streams.

- **User Authentication and Management**: Implement user authentication and management for personalized services.

- **Integration with Artificial Intelligence applications**: VerbaScribe can be deployed as an endpoint called to provide transcriptions streamed into a Natural Language Processing (NLP) system for Named Entity Recognition (NER), topic modeling, and sentiment analysis.
### User Authentication and Management

If you would like to contribute to VerbaScribe, please fork the repository and submit a pull request with your proposed changes. We welcome contributions that enhance the functionality, improve the user experience, or fix any issues.


![demo_1](https://github.com/user-attachments/assets/433c8358-3e7d-4732-b549-7b197fbd6bc7)

![demo_1a](https://github.com/user-attachments/assets/f78878de-d94a-472e-b713-95988c1b8b03)

![demo_2](https://github.com/user-attachments/assets/cf2f6280-ffff-49d8-9efe-db10413123a4)

![demo_3](https://github.com/user-attachments/assets/ecc0b432-cf49-48bc-8ca9-12d8a87dbb70)

![demo_4](https://github.com/user-attachments/assets/d5190720-7ef3-4b60-938a-3c764641c79b)













