import React, { useEffect, useState } from "react"
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
                    `http://localhost:5000/api/user/findemail/${props.chat[0]}`
                )
                setChat1(responseData.user.email)
            } catch (err) {

            }
        }
        fetchEmail()

    }, [sendRequest, props.chat])




    return (
        <li className="mb-item">
            <Card>
                <div>
                    <div>
                        {chat1}<br />
                        {props.chat[1]}<br />
                        {props.chat[2]}

                    </div>
                </div>
            </Card>

        </li>
    )
}

export default MbItem