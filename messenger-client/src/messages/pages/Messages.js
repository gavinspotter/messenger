import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


import { useHttpClient } from "../../shared/hooks/http-hook"

const Messages = () => {

    const [loadedMessageBoard, setLoadedMessageBoard] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const mbId = useParams().mbId



    useEffect(() => {
        const fetchMessageBoard = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/messages/findmb/${mbId}`
                )
                setLoadedMessageBoard(responseData.messageboard)
            } catch (err) {

            }
        }
        fetchMessageBoard()
    }, [sendRequest, mbId])

    return (
        <React.Fragment>

        </React.Fragment>
    )
}

export default Messages