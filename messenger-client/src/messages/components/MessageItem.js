import React, { useEffect, useState } from "react"
import Card from "../../shared/components/UIElements/Card"

import { useHttpClient } from "../../shared/hooks/http-hook"


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
        <li className="mb-item">
            <Card>
                <div>

                    {name} : {message}
                </div>
            </Card>
        </li>
    )
}

export default MessageItem