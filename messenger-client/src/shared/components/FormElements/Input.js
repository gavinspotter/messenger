import React from "react"

const Input = (props) => {

    const element = props.element === "input" ? (
        <input
            name={props.name}
            ref={props.valRef}
            type={props.type}
            defaultValue={props.dv}

        />
    ) : (
            <textarea
                rows={props.rows || 3}
                ref={props.valRef}
                name={props.name}
            />
        )

    return (
        <div>
            <label>
                {props.label}
            </label> <br />
            {element}

        </div>
    )
}

export default Input