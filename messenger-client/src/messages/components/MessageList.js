import React from "react"
import MessageItem from "./MessageItem"

import "./MessageList.css"

const MessageList = (props) => {

    return (
        <ul name="mb-list">
            {
                props.items.map((stuff) =>
                    <MessageItem
                        key={stuff._id}
                        messages={stuff.messages}
                    />
                )
            }
        </ul>
    )
}

export default MessageList