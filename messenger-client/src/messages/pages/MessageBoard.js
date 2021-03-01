import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"

import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"
import MbList from "../components/MbList"
import "../../css/style.css"




const MessageBoard = () => {

    const auth = useContext(AuthContext)

    const { register, handleSubmit } = useForm()

    const [submitVal1, setSubmitVal1] = useState()
    const [submitVal2, setSubmitVal2] = useState()


    const history = useHistory()

    const [loadedMb, setLoadedMb] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient()






    const onSubmit = async (data) => {

        let chatter1
        let chatter2



        if (data.player1 === "") {

            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/getuserbyemail/${data.player2}`
                )
                chatter1 = responseData.user[0]._id
            } catch (err) {

            }

            try {
                await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/createmb`,
                    "POST",
                    JSON.stringify({
                        chat: [
                            auth.userId,
                            chatter1,

                        ]
                    }),
                    {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + auth.token
                    }
                )
                setSubmitVal2("")
                setSubmitVal2(null)
                Location.reload()
                //history.push("/")
            } catch (err) {

            }
        } else if (data.player2 === "") {

            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/getuserbyemail/${data.player1}`
                )
                chatter2 = responseData.user[0]._id
            } catch (err) {

            }

            try {
                await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/createmb`,
                    "POST",
                    JSON.stringify({
                        chat: [
                            auth.userId,
                            chatter2,

                        ]
                    }),
                    {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + auth.token
                    }
                )
                setSubmitVal1("")
                setSubmitVal1(null)

                Location.reload()
                //history.push("/")
            } catch (err) {

            }
        } else {

            try {
                const rdplayer1 = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/getuserbyemail/${data.player1}`

                )
                chatter1 = rdplayer1.user[0]._id
                const rdplayer2 = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/getuserbyemail/${data.player2}`

                )
                chatter2 = rdplayer2.user[0]._id

            } catch (err) {

            }

            try {
                await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/createmb`,
                    "POST",
                    JSON.stringify({
                        chat: [
                            auth.userId,
                            chatter1,
                            chatter2,

                        ]
                    }),
                    {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + auth.token
                    }
                )
                setSubmitVal1("")
                setSubmitVal1(null)
                setSubmitVal2("")
                setSubmitVal2(null)
                //history.push("/")
                Location.reload()
            } catch (err) {

            }
        }


    }




    useEffect(() => {

        const fetchMb = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/messages/messageboards/${auth.userId}`,
                )
                setLoadedMb(responseData.messageboards)
            } catch (err) {

            }
        }
        fetchMb()
    }, [sendRequest, auth.userId])











    return (
        <React.Fragment>
            <div className="logout">
                <div className="logout-text">
                    <button className="logout__button" onClick={auth.logout}>logout</button>
                </div></div>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div>
                    <LoadingSpinner />
                </div>
            )}
            <div className="mb__card">
                <div className="mb__card-text">
                    <h2>type in an email or two</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            element="input"
                            valRef={register}
                            name="player1"
                            val={submitVal1}

                        />
                        <Input
                            element="input"
                            valRef={register}
                            name="player2"
                            val={submitVal2}
                        />

                        <Button>start messenging</Button>
                    </form>
                </div>
            </div>

            {!isLoading && loadedMb && <MbList items={loadedMb} />}
        </React.Fragment>
    )

}


export default MessageBoard