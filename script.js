// Select DOM elements
const finalTranscript = document.getElementById("finalTranscript");
const interimTranscript = document.getElementById("interimTranscript");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");

// Check for SpeechRecognition support
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

// Handle speech recognition results
recognition.addEventListener("result", (e) => {
  let finalText = '';
  let interimText = '';

  Array.from(e.results).forEach(result => {
    if (result[0].isFinal) {
      finalText += result[0].transcript;
    } else {
      interimText += result[0].transcript;
    }
  });

  // Update paragraphs
  finalTranscript.innerText = finalText;
  interimTranscript.innerText = interimText;
});

// Handle recognition end
recognition.addEventListener("end", () => {
  if (recognition.continuous) {
    recognition.start();
  }
});

// Start button event listener
startBtn.addEventListener("click", () => {
  recognition.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  loader.style.display = 'block';
  errorMessage.innerText = ''; // Clear any previous error message
});

// Stop button event listener
stopBtn.addEventListener("click", () => {
  recognition.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  loader.style.display = 'none';
});

// Handle errors
recognition.addEventListener("error", (e) => {
  errorMessage.innerText = 'Speech recognition error: ' + e.error;
  stopBtn.disabled = true;
  startBtn.disabled = false;
  loader.style.display = 'none';
});
