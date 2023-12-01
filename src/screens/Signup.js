import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";

const Signup = () => {
    const navigate = useNavigate();


    const [otpPage, setotpPage] = useState(false);
    // const [sendToBackend, setsendToBackend] = useState(false)

    const [credentials, setcredentials] = useState({
        name: '', email: '', password: '', location: ''
    })

    const detectChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    const [disableSubmitForEmailCheck, setdisableSubmitForEmailCheck] = useState(false)

    const [inputOTP, setinputOtp] = useState();

    const funcSetInputOtp = (e) => {
        setinputOtp(e.target.value);
    }

    const [checkSyntax, setcheckSyntax] = useState(false)

    useEffect(() => {
        if (otpPage) {
            const callOTP = async () => {
                console.log("callotp");
                const res = await fetch('http://localhost:4000/otp', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: credentials.email
                    })
                });
                const response = await res.json();
                window.random = response.otp;

                toast.info("OTP sent to your Email !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                console.log('frontend', window.random);
                // setOtpPage(false);
            }

            callOTP();
        }

    }, [otpPage, credentials.email]);


    const otpSent = () => {
        console.log('input', inputOTP);
        console.log('window.random', window.random);
        if (window.random == inputOTP) {
            sendToBackend(true);
            toast.success("OTP Matched !", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            alert('SignUp SuccessFull');
        }
        else {
            toast.error("OTP not Match !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    let i = 0;
    const emailCheckFunc = async () => {
        try {
            const res = await fetch('http://localhost:4000/emailcheck', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: credentials.email
                })
            })


            const resp = await res.json();

            if (resp.syntaxerror) {
                setcheckSyntax(true);
            }

            if (resp.exist) {
                setcheckSyntax(true);

                if (i === 0) {
                    toast.warn("Email already exist");
                    i++;
                }
                setdisableSubmitForEmailCheck(true);

            }
            if (!resp.exist) {
                setcheckSyntax(false);
                setdisableSubmitForEmailCheck(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }



    if (credentials.email) {
        emailCheckFunc();
    }

    const sendToBackend = async (true1) => {
        const { name, email, location, password } = credentials;

        if (true1) {

            try {
                const response = await fetch('http://localhost:4000/create', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name, email: email, location: location, password: password
                    })
                })
                const res = await response.json();
                console.log(res);

                if (!res.success) {
                    alert('Invalid Credentials')
                }
                else {
                    toast("Registration Successfull");
                    navigate('/login');
                }

            } catch (err) {
                console.error("Error during registration:", err);
                window.alert('An error occurred during registration. Please try again.');
            }
        }
    }


    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, email, location, password } = credentials;

        if (checkSyntax) {
            alert('fill fields properly');
        }

        if (!checkSyntax) {
            if (!name || !email || !location || !password) {
                console.log('if');
                toast.warn("Fill all the Fields");
            }


            else {
                toast.success(<span className='text-black'>OTP sent to your Email </span>, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setotpPage(true);
            }
        }

    }



    return (
        <>

            {
                otpPage ?
                    <>  <div
                        className='d-flex justify-content-center align-items-center'
                        style={{
                            height: '100vh',
                            width: '100vw',
                            backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/2016/05/Coffee-wallpaper-backgrounds-hd.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <div className="container">

                            {/* <label for="exampleInputPassword1" style={{ color: "black" }} className="form-label">OTP</label>
                            <input type="number" className="form-control" onChange={funcSetInputOtp} style={{ color: "black" }} name='OTP' value={inputOTP} id="exampleInputPassword1" /> */}
                            <h1 className='mb-5 text-primary text-decoration-underline' style={{ textUnderlinePosition: 'under' }}>OTP Verification</h1>
                            <label for="name" className="form-label" style={{ fontSize: '25px', color: "black" }}>OTP</label>
                            <input type="number" placeholder='Enter OTP Recieved through your Mail' className="mb-3 form-control" onChange={funcSetInputOtp} name='OTP' value={inputOTP} style={{ color: "black", backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid black', width: '65%' }} />

                            <button className='btn btn-primary' onClick={otpSent}>Send</button>
                            <ToastContainer />
                        </div>
                    </div>

                    </>
                    :



                    <div

                        className='d-flex justify-content-center align-items-center'
                        style={{
                            height: '100vh',
                            width: '100vw',
                            backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/2016/05/Coffee-wallpaper-backgrounds-hd.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <div className='container'>
                            <form  >
                                <h1 className='text-primary'>SIGNUP PAGE</h1>
                                <ToastContainer />
                                <div className="mb-3">
                                    <label for="name" className="form-label" style={{ color: "black" }}>Username</label>
                                    <input type="text" className="form-control" placeholder='Enter you Name' onChange={detectChange} name='name' value={credentials.name} style={{ color: "black", backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid black', width: '65%' }} />
                                </div>

                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label" style={{ color: "black" }}>Email address</label>
                                    <input type="email" className="form-control" placeholder='Enter you Email' onChange={detectChange} id="exampleInputEmail1" name='email' value={disableSubmitForEmailCheck ? " " : credentials.email} style={{ color: "black", backgroundColor: 'transparent', width: '65%', border: 'none', borderBottom: '2px solid black' }} aria-describedby="emailHelp" />
                                    <div id="emailHelp" style={{ color: "black" }} className="form-text">We'll never share your email with anyone else.</div>
                                </div>

                                <div className="mb-3">
                                    <label for="location" className="form-label" style={{ color: "black" }}>Address</label>
                                    <input type="text" className="form-control" placeholder='Enter Current Location' onChange={detectChange} name='location' value={credentials.location} style={{ color: "black", backgroundColor: 'transparent', width: '65%', border: 'none', borderBottom: '2px solid black' }} />
                                </div>

                                <div className="mb-3">
                                    <label for="exampleInputPassword1" style={{ color: "black" }} className="form-label">Password</label>
                                    <input type="password" className="form-control" onChange={detectChange} placeholder='Enter Password' style={{ color: "black", backgroundColor: 'transparent', width: '65%', border: 'none', borderBottom: '2px solid black' }} name='password' value={credentials.password} id="exampleInputPassword1" />
                                    <div id="emailHelp" style={{ color: "black" }} className="form-text">The Password must be greater than 5 digits</div>
                                </div>

                                <button type="submit" onClick={handlesubmit} style={{ backgroundColor: '#4A6664', color: 'white' }} className="btn m-3 btn-success">Submit</button>
                                <NavLink to="/login" className='btn m-3' style={{ backgroundColor: '#7D4B2B' }}>Already a user</NavLink>
                            </form>
                        </div>
                    </div >

            }
        </>
    )
}

export default Signup