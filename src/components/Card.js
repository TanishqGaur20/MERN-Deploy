import React, { useRef, useState, useEffect } from 'react'
import { useCart, useDispatch } from './ContextReducer';
import Alert from './Alert';

const Card = (props) => {

    const state = useCart();
    const dispatch = useDispatch();


    const [qty, setqty] = useState('1');
    const [size, setsize] = useState("");
    const priceref = useRef();
    const options = props.options;
    const priceoptions = Object.keys(options);
    let finalprice = qty * parseInt(options[size]);
    let foodData = props.foodData;
    const [alert, setalert] = useState(false);

    useEffect(() => {
        setsize(priceref.current.value);
    }, [])


    const handleCart = async () => {



        setalert(true);
        setTimeout(function () {
            setalert(false);
        }, 3000);


        let food = []
        for (const item of state) {
            if (item.id === foodData._id) {
                food = item;

                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodData._id, price: finalprice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodData._id, name: foodData.name, price: finalprice, qty: qty, size: size, img: props.foodData.img })
                console.log("Size different so simply ADD one more to the list", props.foodData.img)
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: foodData._id, name: foodData.name, price: finalprice, qty: qty, size: size })




        // await dispatch({ type: "ADD", id: foodData._id, name: foodData.name, price: finalprice, size: size, qty: qty })
        // console.log(state);
    }

    return (
        <div>
            <div className="card mt-5" style={{ "width": "18rem", "Height": "450px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                <img className="card-img-top" src={foodData.img} alt="Card image cap" style={{ height: "180px", objectFit: "cover" }} />
                <div className="card-body ">
                    <h5 className="card-title ">{foodData.name}</h5>
                    <p className="card-text ">{foodData.description}</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success ' onChange={(e) => setqty(e.target.value)}>
                            {
                                Array.from(Array(6), (item, index) => {
                                    return (
                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100  bg-success' ref={priceref} onChange={(e) => setsize(e.target.value)}>
                            {
                                priceoptions.map((data) => {
                                    return (<option key={data} value={data}>{data}</option>)
                                })
                            }
                        </select>
                        <div className='d-inline'> ₹{finalprice}/-</div>
                    </div>
                </div>
                <button className='btn bg-white mb-2 text-danger mx-2' onClick={handleCart}>Add to Cart</button>

            </div>
            {
                alert ? <Alert /> : null
            }
        </div>
    )
}

export default Card