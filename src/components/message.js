import React from "react";

class Message extends React.Component {

    render() {
        const {author, text, quote} = this.props
        if(quote !== undefined){
            return(
                <div>
                    <div className="quote">{quote.ownerMessage} <br></br> {quote.quoteMessage}</div> <br></br>
                    <div className="current-message">
                        <p className="author">{author}</p>
                        <p className="text">{text}</p>
                    </div>
                </div>
            )
        }
        return (
            <div className="current-message">
                <p className="author">{author}</p>
                <p className="text">{text}</p>
            </div>
        )
    }
}

export default Message;