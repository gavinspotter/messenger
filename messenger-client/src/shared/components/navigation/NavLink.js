import React, { useContext } from "react"
import { NavLink } from "react-router-dom"


import { AuthContext } from "../../context/auth-context"
import "./NavLink.css"

const NavLinks = () => {
    const auth = useContext(AuthContext)

    return (
        <ul className="nav-links">
            {auth.isLoggedIn && (
                <li>
                    <NavLink>
                        messages
                    </NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink>
                        login
                    </NavLink>
                </li>
            )}
        </ul>
    )

}

export default NavLinks