import React, { useContext, useEffect, useState } from "react"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"
import MbList from "../components/MbList"



const MessageBoard = () => {

    const auth = useContext(AuthContext)


    const [loadedMb, setLoadedMb] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5000/api/messages/messageboards",
                    "POST",
                    JSON.stringify({
                        chat: auth.userId
                    })
                )
                setLoadedMb(responseData.messageboards)
            } catch (err) {

            }
        }
    })


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