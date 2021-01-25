import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import Card from "../../shared/components/UIElements/Card"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"
import MbList from "../components/MbList"



const MessageBoard = () => {

    const auth = useContext(AuthContext)

    const { register, handleSubmit } = useForm()

    const [player2, setPlayer2] = useState()
    const [player1, setPlayer1] = useState()
    const [player21, setPlayer21] = useState()
    const [player11, setPlayer11] = useState()

    const [loadedMb, setLoadedMb] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const userId = useParams().userId

    const onSubmit = async (data) => {



        if (data.player1 === "") {
            try {
                await sendRequest(
                    `http://localhost:5000/api/messages/createmb`,
                    "POST",
                    JSON.stringify({
                        chat: [
                            data.player2,
                            auth.userId
                        ]
                    }),
                    {
                        "Content-Type": "application/json"
                    }
                )
            } catch (err) {

            }
        } else if (data.player2 === "") {

            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/messages/getuserbyemail/${data.player1}`
                )
            } catch (err) {

            }

            try {
                await sendRequest(
                    `http://localhost:5000/api/messages/createmb`,
                    "POST",
                    JSON.stringify({
                        chat: [
                            data.player1,
                            auth.userId
                        ]
                    }),
                    {
                        "Content-Type": "application/json"
                    }
                )
            } catch (err) {

            }
        } else {
            try {
                await sendRequest(
                    `http://localhost:5000/api/messages/createmb`,
                    "POST",
                    JSON.stringify({
                        chat: [
                            data.player1,
                            data.player2,
                            auth.userId
                        ]
                    }),
                    {
                        "Content-Type": "application/json"
                    }
                )
            } catch (err) {

            }
        }


    }




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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        element="input"
                        valRef={register}
                        name="player1"
                    />
                    <Input
                        element="input"
                        valRef={register}
                        name="player2"
                    />

                    <Button>start messenging</Button>
                </form>
            </Card>
            {!isLoading && loadedMb && <MbList items={loadedMb} />}
        </React.Fragment>
    )

}


export default MessageBoard