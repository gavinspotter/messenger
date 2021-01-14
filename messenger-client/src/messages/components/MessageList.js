import React from "react"
import MessageItem from "./MessageItem"

import "./MessageList.css"

const MessageList = (props) => {

    return (
        <ul className="mb-list">
            {
                props.stuff.map((data) =>
                    <MessageItem
                        key={data._id}
                        messages={data.messages}
                    />
                )
            }
        </ul>
    )
}

export default MessageList