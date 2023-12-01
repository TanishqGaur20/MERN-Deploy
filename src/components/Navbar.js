import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from './ContextReducer';

const Navbar = (props) => {
    const navigate = useNavigate();
    const usecart = useCart();
    const usecartLength = usecart.length;
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }
    return (
        <div><nav className="navbar navbar-expand-lg navbar-dark bg-lightgray " style={{ background: "#4F4E54" }}>
            <NavLink className="navbar-brand mx-3 fs-4" to="#">GoFood</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link active fs-5" to="/">Home </NavLink>
                    </li>
                    {
                        (localStorage.getItem('authToken')) ?
                            <li className="nav-item ">
                                <NavLink className="nav-link active fs-5" to="/myorder">My Orders </NavLink>
                            </li>
                            : ""
                    }
                </ul>
                {
                    (!localStorage.getItem("authToken")) ?
                        <div>

                            <NavLink className="btn bg-white text-success mx-1" to="/login">Login</NavLink>
                            <NavLink className="btn bg-white text-success mx-1" to="/signup">Signup</NavLink>
                        </div>
                        :
                        <div>
                            <h3>{window.name}</h3>
                            <NavLink to='/cart' className='btn bg-white text-success mx-2' >My Cart
                                <span className="badge badge-light " style={{ border: '1px solid transparent', background: 'red', color: 'White', marginLeft: '5px', borderRadius: "50%" }}>{usecartLength}</span>

                            </NavLink>
                            <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout</div>
                        </div>
                }

            </div>
        </nav>






        </div>


    )
}
export default Navbar



