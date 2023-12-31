import React, { useEffect, useState } from 'react';

import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({socket}) => {
  const [messages, setMessages] = useState([]);

  useSockets(socket, messages, setMessages);

  return (
    <div className='chat'>
      <ChatBar socket={socket}/>
      <div className='chat__main'>
        <ChatBody messages={messages} socket={socket}/>
        <ChatFooter socket={socket}/>
      </div>
    </div>
  );
};

function useSockets(socket, messages, setMessages) {
  useEffect(() => {
    // This subscribes to messageResponse events on page load (and page changes)
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  });
}

export default ChatPage;