import React from "react"
import Card from "../../shared/components/UIElements/Card"

import { useHttpClient } from "../../shared/hooks/http-hook"

import "./MbItem.css"

const MbItem = (props) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient()



    return (
        <li className="mb-item">
            <Card>
                <div>
                    <div>
                        {props.chat[0]}<br />
                        {props.chat[1]}<br />
                        {props.chat[2]}

                    </div>
                </div>
            </Card>

        </li>
    )
}

export default MbItem