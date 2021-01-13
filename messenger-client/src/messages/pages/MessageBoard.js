import React, { useState } from "react"

import { useHttpClient } from "../../shared/hooks/http-hook"

const MessageBoard = () => {

    const [loadedMb, setLoadedMb] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

}


export default MessageBoard