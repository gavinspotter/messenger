import React, { useState } from "react"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"

import { useHttpClient } from "../../shared/hooks/http-hook"

const MessageBoard = () => {

    const [loadedMb, setLoadedMb] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

        </React.Fragment>
    )

}


export default MessageBoard