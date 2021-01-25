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



    const [loadedMb, setLoadedMb] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const userId = useParams().userId

    let submitVal1
    let submitVal2

    const onSubmit = async (data) => {

        let chatter1
        let chatter2



        if (data.player1 === "") {

            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/messages/getuserbyemail/${data.player1}`
                )
                chatter1 = responseData.user[0]._id
            } catch (err) {

            }

            try {
                await sendRequest(
                    `http://localhost:5000/api/messages/createmb`,
                    "POST",
                    JSON.stringify({
                        chat: [
                            chatter1,
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
                chatter2 = responseData.user[0]._id
            } catch (err) {

            }

            try {
                await sendRequest(
                    `http://localhost:5000/api/messages/createmb`,
                    "POST",
                    JSON.stringify({
                        chat: [
                            chatter2,
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
                const rdplayer1 = await sendRequest(
                    `http://localhost:5000/api/messages/getuserbyemail/${data.player1}`

                )
                chatter1 = rdplayer1.user[0]._id
                const rdplayer2 = await sendRequest(
                    `http://localhost:5000/api/messages/getuserbyemail/${data.player2}`

                )
                chatter2 = rdplayer2.user[0]._id

            } catch (err) {

            }

            try {
                await sendRequest(
                    `http://localhost:5000/api/messages/createmb`,
                    "POST",
                    JSON.stringify({
                        chat: [
                            auth.userId,
                            chatter1,
                            chatter2,

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
                        val={ }

                    />
                    <Input
                        element="input"
                        valRef={register}
                        name="player2"
                        val={ }
                    />

                    <Button>start messenging</Button>
                </form>
            </Card>
            {!isLoading && loadedMb && <MbList items={loadedMb} />}
        </React.Fragment>
    )

}


export default MessageBoard