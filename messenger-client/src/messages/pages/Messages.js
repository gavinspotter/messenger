import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../../shared/components/UIElements/Card"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

import { useForm } from "react-hook-form"
import { useHttpClient } from "../../shared/hooks/http-hook"
import MessageList from "../components/MessageList"
import Input from "../../shared/components/FormElements/Input"

const Messages = () => {

    const [loadedMessageBoard, setLoadedMessageBoard] = useState()



    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const mbId = useParams().mbId


    const onSubmit = async () => {

    }



    useEffect(() => {
        const fetchMessageBoard = async () => {



            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/messages/findmb/${mbId}`
                )
                setLoadedMessageBoard(responseData.messageboard.messages)
                console.log(responseData.messageboard.messages)


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
                    <form>
                        <Input
                            valRef={ }
                            name="messages"
                        />
                    </form>
                </Card>
            </div>
            {!isLoading && loadedMessageBoard && <MessageList stuff={loadedMessageBoard} />}
        </React.Fragment>
    )
}

export default Messages