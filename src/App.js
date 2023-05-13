import React from "react";
import './css/App.css';
import EnterForm from './components/RoomEnterForm';
import Room from "./components/Room";

class App extends React.Component{
  constructor(props){
      super(props)
      const userData =  JSON.parse(localStorage.getItem('userData'))
      this.state = {
        roomName: userData === null ? null : userData.roomName,
        user: userData === null ? null : userData.user,
        currentChat: userData === null ? [] : JSON.parse(localStorage.getItem(userData.roomName))
      };

      this.EnterRoom = this.EnterRoom.bind(this);
      this.UpdateChat = this.UpdateChat.bind(this);
      this.ExitChat = this.ExitChat.bind(this);
  }
  componentDidMount() {
    window.addEventListener('storage', this.UpdateChat);
  }
  
  componentWillUnmount() {
    window.removeEventListener('storage', this.UpdateChat);
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
  
        </header>
        <main className='App-main'>
          <Room onUpdate={this.UpdateChat} onExit={this.ExitChat} chat={this.state.currentChat} roomName={this.state.roomName} user={this.state.user}/>
          <EnterForm onEnter={this.EnterRoom} roomName = {this.state.roomName} />
        </main>
      </div>
    );
  }

  EnterRoom(roomName, chat, user){
    this.setState({ 
      roomName: roomName, 
      currentChat: chat,
      user: user
    }, () =>{
      console.log(this.state.roomName)
      let div = document.querySelector('.chat')
      div.scrollTop = div.scrollHeight;
    });

  }

  UpdateChat(){
    let isScrollDown = false
    let div = document.querySelector('.chat')
    if(Math.round(div.scrollTop) === (div.scrollHeight - div.clientHeight)){
      isScrollDown = true
    }
    this.setState({
      currentChat: JSON.parse(localStorage.getItem(this.state.roomName))
    }, () => {
      if(isScrollDown){
        div.scrollTop = div.scrollHeight;
      }
    })
  }

  ExitChat(){
    let newData = { user: null, roomName: null };
    localStorage.setItem('userData', JSON.stringify(newData));
    this.setState({ 
      roomName: null, 
      currentChat: [],
    })
  }
}


export default App;
