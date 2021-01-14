import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"


import { useHttpClient } from "../../shared/hooks/http-hook"
import MessageList from "../components/MessageList"

const Messages = () => {

    const [loadedMessageBoard, setLoadedMessageBoard] = useState()

    const [keys, setLoadedKeys] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const mbId = useParams().mbId



    useEffect(() => {
        const fetchMessageBoard = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/messages/findmb/${mbId}`
                )
                setLoadedMessageBoard(responseData.messageboard.messages)
                console.log(responseData.messageboard.messages)
            } catch (err) {

            }
        }
        fetchMessageBoard()
    }, [sendRequest, mbId])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedMessageBoard && <MessageList stuff={loadedMessageBoard} />}
        </React.Fragment>
    )
}

export default Messages