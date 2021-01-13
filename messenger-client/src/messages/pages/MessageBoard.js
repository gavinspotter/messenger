import React, { useState } from "react"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

import { useHttpClient } from "../../shared/hooks/http-hook"
import MbList from "../components/MbList"

const MessageBoard = () => {

    const [loadedMb, setLoadedMb] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedMb && <MbList />}
        </React.Fragment>
    )

}


export default MessageBoard