import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({
        email: '', password: ''
    })


    const detectChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }


    const handlesubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;

        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email, password: password
                })
            })
            const res = await response.json();
            if (res.Error1) {
                toast.error("Invalid Password !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            if (!res.success) {
                alert('Invalid Credentials');
            }
            else {
                alert('Login Successfull');
                toast.success(" Login Successfull !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                localStorage.setItem('UserEmail', email);
                localStorage.setItem('authToken', res.authtoken);
                console.log(localStorage.getItem('authToken'));
                navigate('/');
            }

        } catch (err) {
            console.error("Error during registration:", err);
            window.alert('An error occurred during registration. Please try again.');
        }
    }
    console.log('window', window.name);

    return (
        <>
            <div
                className='d-flex justify-content-center align-items-center'
                style={{
                    height: '100vh',
                    width: '100vw',
                    backgroundImage: 'url(https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=1600)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className='container'>
                    <form >
                        <ToastContainer />
                        <h1 style={{ color: "#CB8228" }} className=' mb-3'>LOGIN PAGE</h1>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label" style={{ color: "white", fontSize: '20px' }}>Email address</label>
                            <input type="email" className="form-control" onChange={detectChange} id="exampleInputEmail1" name='email' value={credentials.email} style={{ color: "white", backgroundColor: 'transparent', width: '65%', border: 'none', borderBottom: '2px solid white' }} aria-describedby="emailHelp" />
                            <div id="emailHelp" style={{ color: "white" }} className="form-text m-2">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputPassword1" style={{ color: "white", fontSize: '20px' }} className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={detectChange} name='password' style={{ color: "white", backgroundColor: 'transparent', width: '65%', border: 'none', borderBottom: '2px solid white' }} value={credentials.password} id="exampleInputPassword1" />

                        </div>
                        <button type="submit" onClick={handlesubmit} style={{ border: "none", color: 'white', backgroundColor: '#CB8228' }} className="btn m-3 btn-success">Submit</button>
                        <NavLink to="/signup" style={{ backgroundColor: '#E8EFF7', color: 'black' }} className='btn m-3 '>I'm a new User</NavLink>
                        <NavLink to="/" className='btn m-3 btn-danger' style={{ backgroundColor: '#E8EFF7', color: 'black', border: 'none' }}>Home</NavLink>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login