import React from 'react';

function ChatroomSelection(props) {

  let chatrooms = props.chatrooms.map((chatroom) => {
    return <li name={'' + chatroom} onClick={props.selectRoom}>{chatroom}</li>
  });

  return (
    <div>
      <form onSubmit={props.createRoom}>
        <input id="CreateRoomInput" onChange={props.typing} value={props.chatroom}/>
        <button>Create Room</button>
      </form>
      <ul>
        {chatrooms}
      </ul>
    </div>
  );
}

export default ChatroomSelection;
