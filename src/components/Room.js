import React from "react";
import Emojis from "./emoji";
import Quote from "./quote";
import Message from "./message";

class Room extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text: '',
            showEmojiPicker: false,
            isQuote: false,
            quote: {},
            selectedImage: null,
            imageUrl:null
        }
        this.handleExitClick = this.handleExitClick.bind(this);
        this.handleEmojiSelect = this.handleEmojiSelect.bind(this);
        this.makeQuote = this.makeQuote.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleExitClick() {
        this.props.onExit();
    }

    handleEmojiSelect(EmojiClickData) {
        const { text } = this.state;
        const updatedText = text + EmojiClickData.emoji;
        this.setState({ text: updatedText, showEmojiPicker:false });
    }

    handleImageChange(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.setState({ selectedImage: file, imageUrl: event.target.result });
        };
        reader.readAsDataURL(file);
    }

    makeQuote(event){
        const message = event.currentTarget
        const author = message.querySelector('.current-message .author').textContent
        const text = message.querySelector('.current-message .text').textContent
        const media = message.querySelector('.current-message .textImage')
        let src
        if(media){
            src = message.querySelector('.current-message .textImage').getAttribute('src')
        }
        const data = {id: message.id, ownerMessage: author, quoteMessage: text, media: src}
        this.setState({quote: data, isQuote: true})
    }
    

    render() {
        let { roomName, chat, user, onUpdate } = this.props;

        if (roomName === '') {
        return <h2>Войдите в комнату</h2>;
        }
        document.getElementById('enter-room-form')
        const existingData = chat || [];
        console.log(existingData)
        return (
        <div className="room">
            <button id="exit-button" type="button" onClick={this.handleExitClick}>Выйти</button>
            <h2>Комната №{roomName} </h2>
            <div className="chat">
            {existingData.map((message) => (
                <div id={message.id} className={message.author === user ? 'self-message' : 'other-message'} key={message.id} onClick={this.makeQuote}>
                    <Message author={message.author} text={message.text} quote={message.quote} media={message.media}/>
                </div>
            ))}
            </div>
            <Quote isQuote={this.state.isQuote} quoteData={this.state.quote}/>
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
                    this.setState({showEmojiPicker: !this.state.showEmojiPicker });
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49a3.3 3.3 0 0 0 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13 4.04 4.04 0 0 1-.97.83 5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26Zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5Zm-3-9.4a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8ZM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0Z"></path>
                </svg>
            </button>
            <button
                type="button"
                onClick={() => {
                    if(this.state.text === ''){
                        return
                    }
                    const id = existingData.length === 0 ? 1 : existingData[existingData.length - 1].id + 1;
                    let newData = []
                    console.log(this.state.selectedImage)
                    newData = [...existingData, { id: id, author: user, text: this.state.text, quote: this.state.quote, media: this.state.imageUrl }];
                    console.log(newData)
                    localStorage.setItem(roomName, JSON.stringify(newData));
                    this.setState({ text: '', showEmojiPicker: false, isQuote: false, quote: {}, selectedImage: null, imageUrl:null} , () => {document.querySelector('.media-input').value = ''});
                    onUpdate();
                }}
            >
                <svg className="chat-submit" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.179175 2C-0.320825 0 0.679175 -0.5 2.17917 0.5L22.6792 11C29 14 29 14 22.6787 17L2.17917 27.5C0.178743 28.5 -0.317676 27.9795 0.178993 26L2.17899 16L15.6792 14L2.17917 12L0.179175 2Z" fill="#F89C1D"/>
                </svg> 
            </button>
            </form>
            <input className="media-input" type="file" accept="image/*" onChange={this.handleImageChange} />
            <Emojis show={this.state.showEmojiPicker} onClick={this.handleEmojiSelect}/>
        </div>
        );
    }
}

export default Room;