import React from "react"
import Card from "../../shared/components/UIElements/Card"

const MbItem = (props) => {

    return (
        <li>
            <Card>
                <div>
                    <div>
                        {props.chat}
                    </div>
                </div>
            </Card>
        </li>
    )
}

export default MbItem