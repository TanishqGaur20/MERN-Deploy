import React from 'react'

export const OrderAlert = () => {
    return (
        <div >
            <div className="alert alert-warning alert-dismissible fade show bg-success container-fluid " style={{ marginLeft: "35px", textAlign: 'center', padding: '0px' }} role="alert">
                <span>Order Placed Successfully  !!</span>
                <p className='text-primary'><i class="fa-regular fa-circle-check bg-green-100"></i></p>

            </div>
        </div>
    )
}
export default OrderAlert;
