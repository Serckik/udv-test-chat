import React from "react";
import Media from "./media";

function Quote(props){
    const { isQuote, quoteData } = props;
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

export default Quote;