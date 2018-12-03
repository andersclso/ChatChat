import React from 'react';
import MainChatBox from './MainChatBox.jsx';
import ChatroomSelection from './ChatroomSelection.jsx';
import io from 'socket.io-client';

const axios = require('axios');
const socket = io("http://127.0.0.1:1119");

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatroom: undefined,
      chatroom: '',
      chatrooms: [],
      message: {
        announcement: false,
        username: this.props.location.state.username,
        content: '',
        chatroom: undefined
      },
      messages: []
    };
    this.enterSend = this.enterSend.bind(this);
    this.typing = this.typing.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    axios.get('/loadHistory')
      .then((res) => {
        this.setState({
          messages: [...res.data.reverse()]
        });
      })
      .catch(error => console.log(error));

    socket.emit('join', this.props.location.state.username);

    socket.on('message', (msg) => {
      this.setState({
        messages: [msg, ...this.state.messages]
      });
    });

    socket.on('announcement', (msg) => {
      this.setState(prevState => ({
        message: {
          ...prevState.message,
          announcement: true,
          content: msg
        }
      }));

      this.setState({
        messages: [this.state.message, ...this.state.messages]
      });

      this.setState(prevState => ({
        message: {
          ...prevState.message,
          announcement: false,
          content: ''
        }
      }));
    });

    socket.on('createChatroom', (chatroom) => {
      this.setState({
        chatroom: '',
        chatrooms: [chatroom, ...this.state.chatrooms]
      });
    });
  }

  componentWillUnmount() {
    socket.emit('disconnect');
  }

  enterSend(e) {
    if (e.charCode === 13 && e.target.value) {
      this.sendMessage();
    }
  }

  typing(e) {
    let content = e.target.value;

    if (e.target.id === 'InputBox') {
      this.setState(prevState => ({
        message: {
          ...prevState.message,
          content
        }
      }));
    } else if (e.target.id === 'CreateRoomInput') {
      console.log(content);
      this.setState({
        chatroom: content
      });
    }
  }

  sendMessage() {
    socket.emit('message', this.state.message);

    axios.post('/storeMessage', {
      username: this.state.message.username,
      content: this.state.message.content
    })
    .then((res) => {
      console.log(res);
    })
    .catch(error => console.log(error));

    this.setState(prevState => ({
      message: {
        ...prevState.message,
        content: ''
      }
    }));
  }

  selectRoom(e) {
    console.log('selectRoom was invoked');
    socket.emit('joinChatroom', e.target.getAttribute('name'));

    this.setState({
      currentChatroom: e.target.getAttribute('name')
    });
  }

  createRoom(e) {
    console.log('createRoom was clicked', this.state.chatrooms);
    e.preventDefault();

    let chatroom = this.state.chatroom;

    if (this.state.chatrooms.includes(chatroom)) {
      return alert("chatroom already exists");
    } else {
      socket.emit('createChatroom', chatroom);
    }
  }

  render() {
    console.log('this is the currentChatroom: ', this.state.currentChatroom);
    return (
      <div>
        <MainChatBox
          typing={this.typing}
          sendMessage={this.sendMessage}
          messages={this.state.messages}
          enterSend={this.enterSend}
          inputContent={this.state.message.content}
        />
        <ChatroomSelection
          selectRoom={this.selectRoom}
          createRoom={this.createRoom}
          typing={this.typing}
          chatrooms={this.state.chatrooms}
          chatroom={this.state.chatroom}
        />
      </div>
    )
  }
}

export default ChatApp;
