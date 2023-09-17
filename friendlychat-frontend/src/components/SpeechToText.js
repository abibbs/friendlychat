import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from 'react';

const SpeechToText = ({socket}) => {
	const [recording, setRecording] = useState(false);
	const mediaRef = useRef(null);

  useEffect(() => {
		// Browser doesn't support audio type, throw error
		if (!MediaRecorder.isTypeSupported('audio/webm')) {
			throw new Error('Browser not supported');
		}
	}, []);

  const activateMicrophone = async () => {
    //Add microphone access
		let stream;
    
    if (!stream) stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    if (!mediaRef.mediaRecorder) {
      mediaRef.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
  
      mediaRef.mediaRecorder.addEventListener('dataavailable', async (event) => {
        console.log('event:', event);
        if (event.data.size > 0) {
          socket.emit('audioReceived', event.data);
        }
      });
    }

    setRecording(true);
    mediaRef.mediaRecorder.start(1000);
  }

  const deactivateMicrophone = () => {
		console.log('stopped');
		mediaRef.mediaRecorder.stop();
    setRecording(false);
	};

  return (
    <div>
      { recording ? <FaMicrophoneSlash className='microphone disabled' onClick={deactivateMicrophone}/> : <FaMicrophone className='microphone enabled' onClick={activateMicrophone}/> }
    </div>
  );
};

export default SpeechToText;