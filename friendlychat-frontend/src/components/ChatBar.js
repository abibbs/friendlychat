import React from 'react';
import logo from '../img/friendlychat-logo.png';

const ChatBar = () => {
  return (
    <div className="chat__sidebar">
      <div>
        <img src={logo} alt="FriendlyChat Logo" className='logo-img'/>
      </div>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          <p>User 1</p>
          <p>User 2</p>
          <p>User 3</p>
          <p>User 4</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;