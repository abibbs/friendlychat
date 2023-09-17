import React, { useState } from 'react';

import SpeechToText from './SpeechToText';

const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState('');

  socket.on('transcription', (message) => {
    const received = JSON.parse(message);
    let transcript;
    if (received.type === 'Results') {
      transcript = received.channel.alternatives[0].transcript;
    }

    if (transcript) {
      setMessage(transcript);
    }
  });

  const handleSendMessage = (e) => {
    if (e.preventDefault) { 
      e.preventDefault();
    }

    console.log({ userName: localStorage.getItem('userName'), message });

    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SpeechToText socket={socket} />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;