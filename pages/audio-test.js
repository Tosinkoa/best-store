import React, { useState, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { WaveSurfer as WaveSurferComponent, Waveform } from "wavesurfer-react";

function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const wavesurferRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {recordedAudio && (
        <WaveSurferComponent
          audioFile={recordedAudio}
          options={{
            waveColor: "rgb(200, 0, 200)",
            progressColor: "rgb(100, 0, 100)",
            cursorWidth: 1,
            cursorColor: "#333",
          }}
          onFinish={() => console.log("Audio playback finished")}
          ref={wavesurferRef}
        >
          <Waveform />
        </WaveSurferComponent>
      )}
    </div>
  );
}

export default VoiceRecorder;
