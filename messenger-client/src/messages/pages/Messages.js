import React, { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import Card from "../../shared/components/UIElements/Card"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

import { useForm } from "react-hook-form"
import { useHttpClient } from "../../shared/hooks/http-hook"
import MessageList from "../components/MessageList"
import Input from "../../shared/components/FormElements/Input"
import { AuthContext } from "../../shared/context/auth-context"
import Button from "../../shared/components/FormElements/Button"

import "../../css/style.css"

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
            <Link to="/">
                <div className="back">
                    <div className="back-text">
                        back
                </div>
                </div>
            </Link>
            <div>
                <div className="messenger__card">
                    <div className="messenger__card-text">
                        {isLoading && (
                            <div>
                                <LoadingSpinner />
                            </div>
                        )}
                        <h2>send a message</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                valRef={register}
                                name="messages"
                                val={clear}
                            />
                            <Button>message</Button>
                        </form>
                    </div>
                </div>
            </div>
            {!isLoading && loadedMessageBoard && <MessageList stuff={loadedMessageBoard} />}
        </React.Fragment>
    )
}

export default Messages