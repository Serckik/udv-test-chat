import React from "react";
import Media from "./media";

class Message extends React.Component {

    render() {
        const {author, text, quote, media} = this.props
        if(Object.keys(quote).length !== 0){
            return(
                <div>
                    <div className="quote">{quote.ownerMessage} <br></br> <Media media={quote.media}/> <br></br> {quote.quoteMessage}</div> <br></br>
                    <div className="current-message">
                        <p className="author">{author}</p>
                        <Media media={media}/>
                        <p className="text">{text}</p>
                    </div>
                </div>
            )
        }
        return (
            <div className="current-message">
                <p className="author">{author}</p>
                <Media media={media}/>
                <p className="text">{text}</p>
            </div>
        )
    }
}

export default Message;