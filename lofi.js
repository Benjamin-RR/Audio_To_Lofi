const fs = require("fs");
const Wav = require("node-wav");

async function lofi(inputFile, outputFile) {
  // Read the input audio file
  const inputData = fs.readFileSync(inputFile);
  const inputAudio = Wav.decode(inputData);

  // Read the vinyl noise file
  const noiseData = fs.readFileSync("/audio/vinyl/398815__anthousai__vinyl-out-02.wav");
  const noiseAudio = Wav.decode(noiseData);

  // Read the lo-fi drum sample file
  const drumsData = fs.readFileSync("/audio/vinyl/398815__anthousai__vinyl-out-02.wav/87314__timbre__36187-loopcentury-bhajan-h-cleaned-reverbed-pseudostereo-loopable.wav");
  const drumsAudio = Wav.decode(drumsData);

  // Add vinyl noise
  const vinylNoise = mixAudio(inputAudio, noiseAudio, 0.5);

  // Add reverb
  const reverb = applyReverb(vinylNoise, 0.9);

  // Add delay
  const delay = applyDelay(reverb, 500);

  // Add lo-fi drum samples
  const lofiAudio = mixAudio(delay, drumsAudio, 0.5);

  // Encode the modified audio and write it to the output file
  const outputAudio = Wav.encode(lofiAudio);
  fs.writeFileSync(outputFile, outputAudio);
}

// Mixes two audio buffers together with a specified gain
function mixAudio(audio1, audio2, gain) {
  const mixed = audio1.slice();
  for (let i = 0; i < mixed.length; i++) {
    mixed[i] += audio2[i] * gain;
  }
  return mixed;
}

// Applies a reverb effect to an audio buffer
function applyReverb(audio, roomScale) {
  // Add reverb code here
  return audio;
}

// Applies a delay effect to an audio buffer
function applyDelay(audio, delayMs) {
  // Add delay code here
  return audio;
}

// Example usage
lofi("./load/input.wav", "output.wav");
