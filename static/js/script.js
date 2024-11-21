'use strict';

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 70) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);


function uploadFile() {
    document.getElementById('fileInput').click();
    console.log('Upload button clicked');
}

function updateProgress() {
    const fileInput = document.getElementById('fileInput');
    const progressBar = document.getElementById('uploadProgress');
    console.log('File input change detected');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileSize = file.size;
        const filename = file.name; // Get the file name
        let uploaded = 0;
        console.log('File detected:', fileSize, 'bytes');

        const interval = setInterval(() => {
            if (uploaded < fileSize) {
                uploaded += fileSize / 100;
                const progressPercentage = Math.round((uploaded / fileSize) * 100);
                progressBar.style.width = `${progressPercentage}%`; // Update progress bar
                console.log('Upload progress:', progressPercentage, '%');
            } else {
                clearInterval(interval);
                progressBar.style.width = '100%';
                console.log('Upload complete');

                // Display the uploaded file name
                const uploadMessage = document.getElementById('uploadMessage');
                uploadMessage.innerText = `${filename} has been uploaded.`;

                alert('File upload is complete. You can now click on the Transcribe button.');
            }
        }, 100);
    }
}


async function transcribeFile() {
    const fileInput = document.getElementById('fileInput');
    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;

    if (fileInput.files.length === 0) {
        alert("Please upload a file first.");
        return;
    }
    if (!selectedLanguage) {
        alert("Please select a language to proceed.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("language", selectedLanguage);

    const transcriptionDiv = document.getElementById('transcription');
    transcriptionDiv.innerText = "Processing";

    // Animate the ellipsis
    let ellipsis = '';
    const dots = setInterval(() => {
        ellipsis = ellipsis.length < 3 ? ellipsis + '.' : '';
        transcriptionDiv.innerText = "Processing" + ellipsis;
    }, 500);

    const response = await fetch('/transcribe', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    clearInterval(dots); // Stop the ellipsis animation
    transcriptionDiv.innerHTML = `<p>This is the transcription:</p>`;
    displayTranscription(data.transcription);
}

function displayTranscription(text) {
    const transcriptionDiv = document.getElementById('transcription');
    transcriptionDiv.innerHTML = ''; // Clear previous text

    const paragraph = document.createElement('p');
    paragraph.className = 'transcription-text';
    transcriptionDiv.appendChild(paragraph);

    const words = text.split(' ');
    words.forEach((word, index) => {
        setTimeout(() => {
            paragraph.innerHTML += word + ' ';
            paragraph.style.opacity = 1; // Trigger the transition effect for the whole paragraph
        }, index * 100); // Adjust the delay time as needed
    });
}
