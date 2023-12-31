import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('UserEmail'))
        await fetch("http://localhost:4000/myorderData", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('UserEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })




    }

    useEffect(() => {
        fetchMyOrder()
    }, [])




    return (
        <div >
            <div>
                <Navbar />
            </div>
            <div
                className='d-flex justify-content-center align-items-center'
                style={{
                    height: '100%',
                    width: '100vw',
                    background: " linear-gradient(blue, 10%, pink)"

                }}>

                <div className='container '>
                    <div className='row '>

                        {orderData != {} ? Array(orderData).map(data => {
                            return (
                                data.orderData ?
                                    data.orderData.order_data.slice(0).reverse().map((item) => {
                                        return (
                                            item.map((arrayData) => {
                                                return (
                                                    <div >
                                                        {arrayData.Order_date ? <div className='m-auto fs-3 mt-5 text-white'>

                                                            {data = arrayData.Order_date}
                                                            <hr style={{ height: '3px', color: 'black' }} />
                                                        </div> :

                                                            <div className='col-12 col-md-6 col-lg-3  d-flex justify-content-center align-items-center flex-row'  >
                                                                <div className="card mt-3" style={{ width: "18rem", height: "300px" }}>
                                                                    <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "160px", width: "100%", objectFit: "fill" }} />
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                            <span className='m-1'>{arrayData.qty}</span>
                                                                            <span className='m-1 text-capitalize'>{arrayData.size}</span>
                                                                            <span className='m-1'>{data}</span>
                                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                                ₹{arrayData.price}/-
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>



                                                        }

                                                    </div>
                                                )
                                            })

                                        )
                                    }) : ""
                            )
                        }) : ""}
                    </div>


                </div>
            </div>
            <Footer />
        </div>
    )
}