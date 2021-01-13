import React from "react"
import MbItem from "./MbItem"

const MbList = (props) => {

    return (
        <ul className="mb-list">

            { props.items.map((stuff) =>

                <MbItem
                    key={stuff._id}
                    chat={stuff.chat}
                />
            )

            }
        </ul>
    )
}

export default MbList