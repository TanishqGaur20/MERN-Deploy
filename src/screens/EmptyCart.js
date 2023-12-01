import React from 'react'
import { NavLink } from 'react-router-dom'

const EmptyCart = () => {
    return (
        <div style={{ height: '100vh', width: '100vw', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div className="page-wrap d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <div><img src="https://tse4.mm.bing.net/th?id=OIP.5wiGZd_PKtWM-cIhtFZIKQHaC9&pid=Api&P=0&h=180" alt="" /> </div>
                            <span style={{ fontSize: '65px', color: 'black' }} className="d-block mb-3">Hurry Up !!</span>
                            <div className="mb-4 lead" style={{ fontSize: '45px', color: 'black' }}>Select Something To Order </div>
                            <NavLink to="/" className="btn btn-primary">Back to Home</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyCart