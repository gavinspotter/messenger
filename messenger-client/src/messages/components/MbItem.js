import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Card from "../../shared/components/UIElements/Card"

import { useHttpClient } from "../../shared/hooks/http-hook"

import "./MbItem.css"

const MbItem = (props) => {

    const [chat1, setChat1] = useState()
    const [chat2, setChat2] = useState()
    const [chat3, setChat3] = useState()


    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/user/findemail/${props.chat[0]}`
                )
                setChat1(responseData.user.email)
            } catch (err) {

            }
        }
        fetchEmail()

    }, [sendRequest, props.chat])

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/user/findemail/${props.chat[1]}`
                )
                setChat2(responseData.user.email)
            } catch (err) {

            }
        }
        fetchEmail()

    }, [sendRequest, props.chat])



    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/user/findemail/${props.chat[2]}`
                )
                setChat3(responseData.user.email)
            } catch (err) {

            }
        }
        fetchEmail()

    }, [sendRequest, props.chat])






    return (
        <li className="mb-item">
            <Card> <Link to={`/${props._id}/messageboard`}>
                <div>
                    <div>
                        {chat1}<br />
                        {chat2}<br />
                        {chat3}

                    </div>
                </div>
            </Link>
            </Card>

        </li>
    )
}

export default MbItem