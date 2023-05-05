import React from "react";

class Room extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text: ''
        }
        this.handleExitClick = this.handleExitClick.bind(this);
    }

    handleExitClick() {
        this.props.onExit();
    }

    render() {
        let { roomName, chat, user, onUpdate } = this.props;

        if (roomName === '') {
        return <h2>Войдите в комнату</h2>;
        }
        document.getElementById('enter-room-form')
        const existingData = chat || [];

        return (
        <div className="room">
            <button id="exit-button" type="button" onClick={this.handleExitClick}>Выйти</button>
            <h2>Комната №{roomName} </h2>
            <div className="chat">
            {existingData.map((message) => (
                <div className={message.author === user ? 'self-message' : 'other-message'} key={message.id}>
                <p>
                    {message.author} <br></br> {message.text}
                </p>
                </div>
            ))}
            </div>
            <form
            id="chat-room-form"
            onSubmit={(e) => {
                e.preventDefault();
            }}
            >
            <input
                type="text"
                placeholder="Написать сообщение"
                id="message"
                value={this.state.text}
                onChange={(e) => this.setState({ text: e.target.value })}
            />
            <button
                type="button"
                onClick={() => {
                    if(this.state.text === ''){
                        return
                    }
                    const id = existingData.length === 0 ? 1 : existingData[existingData.length - 1].id + 1;
                    const newData = [...existingData, { id: id, author: user, text: this.state.text }];
                    localStorage.setItem(roomName, JSON.stringify(newData));
                    this.setState({ text: '' });
                    onUpdate();
                }}
            >
                <svg className="chat-submit" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.179175 2C-0.320825 0 0.679175 -0.5 2.17917 0.5L22.6792 11C29 14 29 14 22.6787 17L2.17917 27.5C0.178743 28.5 -0.317676 27.9795 0.178993 26L2.17899 16L15.6792 14L2.17917 12L0.179175 2Z" fill="#F89C1D"/>
                </svg> 
            </button>
            </form>
        </div>
        );
    }
}

export default Room;