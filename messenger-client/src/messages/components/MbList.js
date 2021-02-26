import React from "react"
import MbItem from "./MbItem"


import "../../css/style.css"

const MbList = (props) => {

    return (

        <div>
            { props.items.map((stuff) =>

                <MbItem
                    key={stuff._id}
                    _id={stuff._id}
                    chat={stuff.chat}
                />
            )

            }
        </div>

    )
}

export default MbList