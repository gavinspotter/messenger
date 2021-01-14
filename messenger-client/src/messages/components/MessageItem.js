import React from "react"
import Card from "../../shared/components/UIElements/Card"

const MessageItem = (props) => {
    return (
        <li className="mb-item">
            <Card>
                <div>
                    {props.messages}
                </div>
            </Card>
        </li>
    )
}

export default MessageItem