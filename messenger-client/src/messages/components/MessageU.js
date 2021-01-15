import React, { useEffect, useState } from "react"

import { useHttpClient } from "../../shared/hooks/http-hook"

const MessageU = (props) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient()


    const [message, setMessage] = useState()


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/messages/getmessages/${props.messages}`
                )
                setMessage(responseData.message.message)
            } catch (err) {

            }

        }
        fetchMessages()
    }, [sendRequest, props.messages])

    return (
        <div>
            {message}
        </div>
    )


}

export default MessageU