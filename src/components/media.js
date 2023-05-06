import React from "react";

class Media extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            imageUrl: null
        }
    }
    render() {
        const {media} = this.props;
        if(media == null){
            return
        }
        return (
            <img className="textImage" src={media} alt="Выбранное изображение" />
        )
    }
}

export default Media;