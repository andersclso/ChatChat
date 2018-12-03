import React from 'react';
import styles from '../Styles/MainChatBox.css';

function MainChatBox(props) {
  const messages = props.messages.map(message => {
    if (message.announcement) {
      return <p>{message.content}</p>
    } else {
      return <p><span>{message.username}: </span>{message.content}</p>
    }
  });

  return (
    <div>
      <div id="MainChatBox" className={styles.MainChatBox}>{messages}</div>
      <input id="InputBox" className={styles.InputBox} onChange={props.typing} onKeyPress={props.enterSend} value={props.inputContent}></input>
      <button id="SendButton" onClick={props.sendMessage}>Send</button>
    </div>
  );
}

export default MainChatBox;
