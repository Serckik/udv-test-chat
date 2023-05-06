import React from "react";

class Quote extends React.Component {

    render() {
        const { isQuote, quoteData } = this.props;
        console.log(quoteData)
        if(isQuote){
            return (
                <div className="quote">
                    <p>
                        {quoteData.ownerMessage} <br></br> {quoteData.quoteMessage}
                    </p>
                </div>
            )
        }
    }
}

export default Quote;