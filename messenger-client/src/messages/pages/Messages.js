import React, { useState } from "react"


import { useHttpClient } from "../../shared/hooks/http-hook"

const Messages = () => {

    const [loadedMessageBoard, setLoadedMessageBoard] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    return (
        <div>
            hi
        </div>
    )
}

export default Messages