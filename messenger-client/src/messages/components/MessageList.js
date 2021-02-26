import React from "react"
import MessageItem from "./MessageItem"


import "../../css/style.css"

const MessageList = (props) => {

    return (
        <ul className="mb__list">
            {
                props.stuff.map((data) =>
                    <MessageItem
                        key={data}
                        messages={data}
                    />
                ).reverse()
            }
        </ul>
    )
}

export default MessageList