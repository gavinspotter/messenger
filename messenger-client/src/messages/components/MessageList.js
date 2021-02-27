import React from "react"
import MessageItem from "./MessageItem"


import "../../css/style.css"

const MessageList = (props) => {

    return (
        <div>
            {
                props.stuff.map((data) =>
                    <MessageItem
                        key={data}
                        messages={data}
                    />
                ).reverse()
            }
        </div>
    )
}

export default MessageList