import React from "react"

import { useHttpClient } from "../../shared/hooks/http-hook"

const MessageBoard = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

}


export default MessageBoard