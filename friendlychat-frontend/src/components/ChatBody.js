import React, { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messages, socket }) => {
  const navigate = useNavigate();
  const [negativeMessageFound, setNegativeMessageReceived ] = useState(false);
  const user = useRef(localStorage.getItem('userName'));

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  const isUser = (name) => name === user.current;

  const handleNegativeMessage = () => {
    setNegativeMessageReceived(true);
    setTimeout(() => {
      setNegativeMessageReceived(false);
    }, 3000);
  };

  socket.on('negativeMessageReceived', (data) => {
    handleNegativeMessage(data);
  });

  return (
    <>
      <header className="chat__mainHeader">
        <p>Chat with Friends</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          isUser(message.name) ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          { negativeMessageFound ? <p>Try kindness 😊</p> : <p></p> }
        </div>
      </div>
    </>
  );
};

export default ChatBody;