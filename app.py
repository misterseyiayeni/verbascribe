from flask import Flask, request, jsonify, render_template
import speech_recognition as sr
import os
import subprocess
import logging
from pydub import AudioSegment
import time

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

# Set the path to ffmpeg manually
AudioSegment.converter = r"C:\ffmpeg\bin\ffmpeg.exe"

@app.route('/')
def index():
    return render_template('index.html')

def transcribe_audio(file_path, language, retries=3, delay=5):
    print(f"Starting transcription for: {file_path}")
    recognizer = sr.Recognizer()
    with sr.AudioFile(file_path) as source:
        audio_data = recognizer.record(source, duration=58)
        print("Audio data obtained")
        for attempt in range(retries):
            try:
                text = recognizer.recognize_google(audio_data, language=language)
                print(f"Transcription result: {text}")
                return text
            except sr.RequestError as e:
                print(f"Error during transcription attempt {attempt + 1}: {e}")
                if attempt < retries - 1:
                    print("Retrying after delay...")
                    time.sleep(delay)  # Add a delay between retries
                else:
                    return f"Transcription failed after {retries} attempts: {e}"
            except sr.UnknownValueError:
                return "Could not understand audio"

def convert_mp3_to_wav(input_file, output_file):
    print(f"Starting conversion from MP3 to WAV: {input_file} to {output_file}")
    try:
        result = subprocess.run(['ffmpeg', '-i', input_file, output_file], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode != 0:
            raise Exception(f"Error converting file: {result.stderr.decode('utf-8')}")
        print(f"File converted from MP3 to WAV: {output_file}")
    except Exception as e:
        print(f"Error converting file: {e}")

@app.route('/transcribe', methods=['POST'])
def transcribe():
    try:
        if 'file' not in request.files:
            return jsonify({"transcription": "No file part"})
        file = request.files['file']
        if file.filename == '':
            return jsonify({"transcription": "No selected file"})

        if 'language' not in request.form:
            return jsonify({"transcription": "No language selected"})

        language = request.form['language']

        file_path = os.path.join('uploads', file.filename)
        os.makedirs('uploads', exist_ok=True)
        file.save(file_path)

        # Convert mp3 to wav if necessary
        if file_path.endswith('.mp3'):
            wav_path = file_path.replace('.mp3', '.wav')
            convert_mp3_to_wav(file_path, wav_path)
        else:
            wav_path = file_path

        # Transcribe the whole audio file
        print(f"Transcribing the whole file: {wav_path}...")
        transcription = transcribe_audio(wav_path, language)

        print("Transcription completed")
        return jsonify({"transcription": transcription})
    except Exception as e:
        print(f"Error processing transcription: {e}")
        return jsonify({"transcription": f"Error: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
