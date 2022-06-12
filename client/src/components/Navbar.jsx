import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from './AppContext'
import Logout from './Log/Logout'

const Navbar = () => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <div className="logo">
                        <img src="./img/icon-left-font-monochrome-black.svg" alt="icon" />
                    </div>
                </div>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <h5>Bienvenue {userData.email}</h5>
                        </li>
                        <Logout />
                    </ul>
                ) : null}
            </div>
        </nav>
    )
}

export default Navbar
