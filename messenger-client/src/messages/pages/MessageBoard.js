import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import Input from "../../shared/components/FormElements/Input"
import Card from "../../shared/components/UIElements/Card"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"


import { useHttpClient } from "../../shared/hooks/http-hook"
import MbList from "../components/MbList"



const MessageBoard = () => {


    const { register, handleSubmit } = useForm()

    const [loadedMb, setLoadedMb] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const userId = useParams().userId





    useEffect(() => {

        const fetchMb = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/messages/messageboards/${userId}`,
                )
                setLoadedMb(responseData.messageboards)
            } catch (err) {

            }
        }
        fetchMb()
    }, [sendRequest, userId])









    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div>
                    <LoadingSpinner />
                </div>
            )}
            <Card>
                <form>
                    <Input
                        element="input"
                    />
                    <Input
                        element="input"
                    />
                    <Input
                        element="input"
                    />
                </form>
            </Card>
            {!isLoading && loadedMb && <MbList items={loadedMb} />}
        </React.Fragment>
    )

}


export default MessageBoard