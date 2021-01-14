import React, { useEffect, useState } from "react"
import Card from "../../shared/components/UIElements/Card"

import { useHttpClient } from "../../shared/hooks/http-hook"

const MessageItem = (props) => {

    const [message, setMessage] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/messages/getmessages/${props.messages}`
                )

            } catch (err) {

            }

        }
    })


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