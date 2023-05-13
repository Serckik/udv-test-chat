import React from "react";

class EnterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      roomName: this.props.roomName !== null ? this.props.roomName : '',
      isVisible: this.props.roomName !== null ? false : true 
    };
  }

  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user, roomName } = this.state;
    if(user === '' || roomName === ''){
      return
    }
    if (localStorage.getItem(roomName)) {
      const chat = JSON.parse(localStorage.getItem(roomName));
      this.props.onEnter(roomName, chat, user);
    } 
    else {
      this.createRoom(roomName);
      this.props.onEnter(roomName, [], user);
    }
    let newData = { user: user, roomName: roomName };
    localStorage.setItem('userData', JSON.stringify(newData));
    this.setState({
      user: "",
      roomName: "",
      isVisible: false
    });
  };

  createRoom = (roomName) => {
    localStorage.setItem(roomName, JSON.stringify([]));
  };
  
  render() {
    const { user, roomName } = this.state;
    if(!this.props.roomName){
      return (
        <form id="enter-room-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            id="user"
            value={user}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Название комнаты"
            id="roomName"
            value={roomName}
            onChange={this.handleInputChange}
          />
          <button type="submit">Войти</button>
        </form>
      );
    }
  }
}

export default EnterForm;