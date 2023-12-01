import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <footer className="text-center text-white" style={{ "background-color": "#f1f1f1" }}>
                <div className="text-center text-dark p-3" style={{ "background-color": "rgba(0, 0, 0, 0.2)" }}>
                    © 2020
                    <NavLink className="text-dark" to="https://mdbootstrap.com/">  GoFood Inc</NavLink>
                </div>
            </footer>
        </div>
    )
}

export default Footer