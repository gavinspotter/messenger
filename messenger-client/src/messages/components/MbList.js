import React from "react"
import MbItem from "./MbItem"


import "../../css/style.css"

const MbList = (props) => {

    return (
        <ul className="mb__list">

            { props.items.map((stuff) =>

                <MbItem
                    key={stuff._id}
                    _id={stuff._id}
                    chat={stuff.chat}
                />
            )

            }
        </ul>
    )
}

export default MbList