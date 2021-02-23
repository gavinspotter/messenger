import React from 'react'

import "../../css/style.css"

const SassHome = (props) => {
    return (
        <div className="home">
            {props.children}
        </div>
    )
}

export default SassHome
