import React, { useEffect, useState } from "react"


import { useHttpClient } from "../../shared/hooks/http-hook"
import "../../css/style.css"


const MessageItem = (props) => {

    const [message, setMessage] = useState()
    const [name, setName] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()




    useEffect(() => {

        const fetchMessages = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/getmessages/${props.messages}`
                )
                setMessage(responseData.message.message)
                const nameRD = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/findmessenger/${props.messages}`

                )
                setName(nameRD.message[0].name)
            } catch (err) {

            }

        }
        fetchMessages()
    }, [sendRequest, props.messages])


    return (

        <div className="message__card">
            <div className="message__card-text">

                {name} : {message}
            </div>
        </div>

    )
}

export default MessageItem