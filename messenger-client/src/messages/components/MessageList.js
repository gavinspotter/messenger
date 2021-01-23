import React from "react"
import MessageItem from "./MessageItem"

import "./MessageList.css"

const MessageList = (props) => {

    return (
        <ul className="mb-list">
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