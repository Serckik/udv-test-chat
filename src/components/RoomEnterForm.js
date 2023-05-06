import React from "react";

class EnterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      roomName: "",
    };
  }

  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  };

  hideForm = () => {
    document.getElementById("enter-room-form").hidden = true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user, roomName } = this.state;
    if (localStorage.getItem(roomName)) {
      const chat = JSON.parse(localStorage.getItem(roomName));
      this.props.onEnter(roomName, chat, user);
    } 
    else {
      this.createRoom(roomName);
      this.props.onEnter(roomName, [], user);
    }

    this.setState({
      user: "",
      roomName: "",
    });
    this.hideForm()
  };

  createRoom = (roomName) => {
    localStorage.setItem(roomName, JSON.stringify([]));
  };
  
  render() {
    const { user, roomName } = this.state;
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

export default EnterForm;