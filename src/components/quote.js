import React from "react";
import Media from "./media";

class Quote extends React.Component {

    render() {
        const { isQuote, quoteData } = this.props;
        console.log(quoteData)
        if(isQuote){
            return (
                <div className="quote">
                    <p>
                        {quoteData.ownerMessage} <br></br> <Media  media={quoteData.media}/> <br></br> {quoteData.quoteMessage}
                    </p>
                </div>
            )
        }
    }
}

export default Quote;