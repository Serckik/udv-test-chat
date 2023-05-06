import React from "react";
import EmojiPicker, {
    EmojiStyle,
    Categories,
  } from "emoji-picker-react";

class Emojis extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showEmojiPicker: false
        }
    }

    render() {
        const {show } = this.props;
        return(
            show && (
                <EmojiPicker
                onEmojiClick={this.props.onClick}
                autoFocusSearch={false}
                searchDisabled
                skinTonesDisabled
                previewConfig={{
                    showPreview: false
                }}
                lazyLoadEmojis = {true}
                emojiStyle={EmojiStyle.APPLE}
                categories={[
                    {
                        name: "Недавние",
                        category: Categories.SUGGESTED
                    },
                    {
                        name: "Эмоции, Жесты, Люди",
                        category: Categories.SMILEYS_PEOPLE
                    },
                    {
                        name: "Животные, Растения",
                        category: Categories.ANIMALS_NATURE
                    },
                    {
                        name: "Еда, Напитки",
                        category: Categories.FOOD_DRINK
                    },
                    {
                        name: "Путешествия, Транспорт",
                        category: Categories.TRAVEL_PLACES
                    },
                    {
                        name: "Спорт, Активности",
                        category: Categories.ACTIVITIES
                    },
                    {
                        name: "Предметы",
                        category: Categories.OBJECTS
                    },
                    {
                        name: "Cимволы",
                        category: Categories.SYMBOLS
                    },
                    {
                        name: "Флаги",
                        category: Categories.FLAGS
                    },
                ]}
            />
        )
    )}
}

export default Emojis;