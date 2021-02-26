import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Card from "../../shared/components/UIElements/Card"

import { useHttpClient } from "../../shared/hooks/http-hook"

import "./MbItem.css"
import "../../css/style.css"

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


        <Link to={`/${props._id}/messageboard`}>
            <div className="mb__listitem">
                <div className="mb__listitemdiv">
                    <div>
                        {chat1}<br className="mb__listitem-email" />
                    </div>
                    <div className="mb__listitem-email">
                        {chat2}<br />
                    </div>
                    <div className="mb__listitem-email">
                        {chat3}</div>


                </div>
            </div>
        </Link>


    )
}

export default MbItem