import React, { useState } from "react"
import { useParams } from "react-router-dom"


import { useHttpClient } from "../../shared/hooks/http-hook"

const Messages = () => {

    const [loadedMessageBoard, setLoadedMessageBoard] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const mbId = useParams().mbId

    return (
        <div>
            hi
        </div>
    )
}

export default Messages