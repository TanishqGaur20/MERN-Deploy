import React from 'react'

export const Alert = () => {
    return (
        <div>
            <div className="alert alert-warning alert-dismissible fade show bg-success my-3 " style={{ marginLeft: "35px", width: "220px", height: "55px", textAlign: 'center', padding: '0px' }} role="alert">
                <span>Added to Cart   !!</span>
                <p className='text-primary'>See Above in Cart Section</p>

            </div>
        </div>
    )
}
export default Alert;
