import React from "react"
import Card from "../../shared/components/UIElements/Card"

import { useHttpClient } from "../../shared/hooks/http-hook"

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