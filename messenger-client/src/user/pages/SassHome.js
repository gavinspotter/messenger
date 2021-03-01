import React from 'react'

import "../../css/style.css"

const SassHome = (props) => {
    return (
        <div className="ahome">
            <div className="home">

                {props.children}


            </div>
        </div>

    )
}

export default SassHome
