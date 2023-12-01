import React, { useState } from 'react';
import { useCart, useDispatch } from '../components/ContextReducer';
import EmptyCart from './EmptyCart';
import OrderAlert from '../components/OrderAlert';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    let data = useCart();
    let dispatch = useDispatch();

    const [alert, setalert] = useState(false)

    const handleCheckout = async () => {

        let userEmail = localStorage.getItem("UserEmail");

        setalert(true);
        setTimeout(function () {
            setalert(false);
        }, 5000);


        let response = await fetch('http://localhost:4000/orderData', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail,
                order_data: data,
                order_date: new Date().toLocaleString()
            })
        })
        if (response.status === 200) {
            dispatch({ type: "DROP" })
            setalert(true);
            window.alert('Order Placed');
        }
    }
    if (data.length === 0) {
        return (
            <div>
                <EmptyCart />
            </div>
        )
    }


    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div
            className='d-flex justify-content-center align-items-center'
            style={{
                height: '100vh',
                width: '100vw',
                backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/08/12/18/59/snack-2635035_640.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div>

                <table className="table table-striped container my-5 ">
                    <thead>
                        <tr >
                            <th scope="col">Serial</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>{data.map((data, index) => {
                        return (
                            <tr >
                                <th scope="row">{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.quantity}</td>
                                <td>{data.size}</td>
                                <td>{data.price}</td>
                                <td >
                                    <i class="fa-solid fa-trash" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} ></i>
                                </td>
                                {/* <td ><button type="button" ><i class="fa-solid fa-trash"> onClick={() => { dispatch({ type: "REMOVE", index: index }) }} </i></button> </td> */}

                            </tr>
                        )
                    })}

                        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>


                        <button className='btn btn-primary m-3' onClick={handleCheckout}>Place Order</button>
                        <NavLink to="/" className='btn btn-primary m-3' >Home</NavLink>
                    </tbody>
                </table>
                {
                    alert ? <OrderAlert /> : null
                }
            </div>
        </div>
    )
}


export default Cart;

