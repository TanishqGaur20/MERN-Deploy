import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

const Home = () => {
    const [search, setsearch] = useState("");
    const [fooditem, setfooditem] = useState([]);
    const [foodCat, setfoodCat] = useState([]);


    const loaddata = async () => {
        let response = await fetch('http://localhost:4000/foodData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        response = await response.json();

        setfooditem(response[0]);
        setfoodCat(response[1]);
    }

    useEffect(() => {
        loaddata();
    }, [])


    return (
        <div style={{
            backgroundColor: 'white'
        }}>
            <Navbar />
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className='carousel-caption' style={{ zIndex: '2' }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control mr-sm-2 d-inline " style={{ width: "80%" }} type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                            {/* <button className="btn text-white bg-success btn-outline-success  my-2 my-sm-0 d-inline" type="submit">Search</button> */}
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img style={{ filter: "brightness(50%)", "width": '100vw', "height": "500px", objectFit: 'contain !important' }} src="https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_640.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img style={{ filter: "brightness(50%)", "width": '100vw', "height": "500px", objectFit: 'contain !important' }} src="https://cdn.pixabay.com/photo/2017/02/15/10/39/salad-2068220_640.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img style={{ filter: "brightness(50%)", "width": '100vw', "height": "500px", objectFit: 'contain !important' }} src="https://cdn.pixabay.com/photo/2017/01/30/13/49/pancakes-2020863_640.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
                {
                    foodCat ?
                        foodCat.map((foodCatData) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={foodCatData._id} className='fs-3 m-3 text-black'>{foodCatData.CategoryName}</div>
                                    {/* <hr style={{ color: 'black' }} /> */}
                                    {fooditem ? fooditem.filter((fooditemData) => (fooditemData.CategoryName === foodCatData.CategoryName) && (fooditemData.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filteredData => {
                                            return (
                                                <div className='col-12 col-md-6 col-lg-3'>
                                                    <Card options={filteredData.options[0]} foodData={filteredData} />
                                                </div>
                                            )
                                        })
                                        : <div>No such data found</div>
                                    }
                                </div>
                            )
                        }) : <div>"""</div>
                }
            </div>
            <Footer />
        </div >
    )
}

export default Home



// {
//     foodCat ? foodCat.map((data) => {
//         return (
//             <>
//                 <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
//                 <hr />

//                 {
//                     fooditem ?
//                         fooditem.filter((item) => item.CategoryName === data.CategoryName).map(filteritems => {
//                             return (
//                                 <>
//                                     <div key={filteritems._id}></div>
//                                     <Card />
//                                 </>
//                             )

//                         }) : <div>No Such Data Found</div>
//                 }

//             </>
//         )
//     })
//         : <div>""""""</div>

// }
