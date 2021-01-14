import React, { useEffect } from "react"

import { useHttpClient } from "../../shared/hooks/http-hook"

const MessageU = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient()



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



}

export default MessageU