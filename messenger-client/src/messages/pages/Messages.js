import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import Card from "../../shared/components/UIElements/Card"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

import { useForm } from "react-hook-form"
import { useHttpClient } from "../../shared/hooks/http-hook"
import MessageList from "../components/MessageList"
import Input from "../../shared/components/FormElements/Input"
import { AuthContext } from "../../shared/context/auth-context"
import Button from "../../shared/components/FormElements/Button"

const Messages = () => {


    const auth = useContext(AuthContext)

    const [loadedMessageBoard, setLoadedMessageBoard] = useState()

    const { register, handleSubmit } = useForm()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const mbId = useParams().mbId

    const [clear, setClear] = useState()


    const onSubmit = async (data) => {
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/messages/createMessage`,
                "POST",
                JSON.stringify({
                    sender: auth.userId,
                    messageboard: mbId,
                    message: data.messages,
                    chat: [auth.userId]
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + auth.token
                }
            )
            setClear("")
        } catch (err) {
            console.log(err)
        }

        const fetchMessageBoard = async () => {



            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/findmb/${mbId}`
                )
                setLoadedMessageBoard(responseData.messageboard.messages)
                console.log(responseData.messageboard)


            } catch (err) {

            }



        }
        fetchMessageBoard()

    }



    useEffect(() => {
        const fetchMessageBoard = async () => {



            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/findmb/${mbId}`
                )
                setLoadedMessageBoard(responseData.messageboard.messages)
                console.log(responseData.messageboard)


            } catch (err) {

            }



        }
        fetchMessageBoard()
    }, [sendRequest, mbId])

    // useEffect(()=> {
    //     const fetchMessages = async ()=> {
    //         try {
    //             const responseData = await sendRequest(
    //                 `http://localhost:5000/api/messages/getmessages/${messages}`
    //             )
    //         } catch (err) {

    //         }
    //     }
    // })

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div>
                    <LoadingSpinner />
                </div>
            )}
            <div>
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            valRef={register}
                            name="messages"
                            val={clear}
                        />
                        <Button>message</Button>
                    </form>
                </Card>
            </div>
            {!isLoading && loadedMessageBoard && <MessageList stuff={loadedMessageBoard} />}
        </React.Fragment>
    )
}

export default Messages