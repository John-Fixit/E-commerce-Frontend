import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiCertification } from "react-icons/bi";
import style from './style.css'
import axios from 'axios';
import { FaCartPlus } from 'react-icons/fa';
function LandingPage() {
    const productURI = 'http://localhost:4000/user/products'
    const [products, setproducts] = useState([])
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        axios.get(productURI).then((res) => {
            setisLoading(false)
            if (res.data.status) {
                setproducts(() => { return res.data.result })
            }
        })
    }, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top padding_nav bgs">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand fs-2 fw-bold text-light">JFIX</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5" style={{ marginLeft: '6vh' }}>
                            <li className="nav-item ms-5">
                                <Link to='/' className="nav-link active text-light ">Home</Link>
                            </li>
                            <li className="nav-item ms-5">
                                <Link to='/' className="nav-link active text-light">About us</Link>
                            </li>
                            <li className="nav-item ms-5">
                                <Link to='/' className="nav-link active text-light">Help</Link>
                            </li>
                        </ul>
                        <form className='ms-4 d-flex'>
                            <Link to='/signin' className=' text-decoration-none'><button className='btn btn-light textColor fw-bold' > Log In </button></Link>
                            <Link to='/signup' className=' text-decoration-none'><button className='btn btn-outline-light ms-3 fw-bold'>Create account</button></Link>
                        </form>
                    </div>
                </div>
            </nav>
            <div className='container-fluid cont_fluid'>
                    <h3 className='card-header rounded border-0 btnbg mb-2 text-light'>Welcome to JFIX e-commerce site.</h3>
                <div className='products_row'>
                    <div className='landingpageText'>
                        <p className='card-body col-lg-7 col-md-12 fw-bold'>
                            Get your product online, it's fast and good to use. With this simple store site, you can purchase products of your choice. We offer good and quality product.
                            <Link to='/signup' className='card-title text-decoration-none'>Click Here to Get Started</Link> and Enjoy us
                        </p>
                    </div>

                </div>
                <div className='col-sm-12 products_row'>
                    {/* <p className='card-header text-center text-muted fs-4'>All Products Available</p> */}
                    <marquee behavior="infinite" direction="alternate" className='btnbg text-light macque'>Create an account to access your mainboard at JFIX e-commerce site</marquee>
                    <div className='row'>
                        {isLoading ? <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                            products.map((eachProduct, index) => (
                                <div className='col-lg-3 col-md-6 col-sm-12 mt-3' key={index}>
                                    <div className='card shadow p-2 h-100'>
                                        <img src={eachProduct.image} className='card-img-top mx-auto' />
                                        <div className='card-body'>
                                            <h6 className='card-title text-start'>{eachProduct.title}</h6>
                                            <p className='rate'>RATE: {eachProduct.rating}</p>
                                            <p className="card-text text-start">Price : ₦{eachProduct.price} <span >per product</span></p>
                                        </div>
                                        <div className="card-footer">
                                            <button type="button" className="btn btnbg text-light w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                                Add To Cart <FaCartPlus size='4vh' className='float-start' />
                                            </button>
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Select Quantity variation</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className='row justify-content-between'>
                                                                <div className='col-sm-6'>
                                                                    <p className='fw-bold'>Please sign up to be able to preceed with this action and add {eachProduct.title} to your cart!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer btn-group shadow">
                                                            <Link className='btn btnbg text-light' to='/signup'>Sign up</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Link to='/signup' className='btn mt-3 btnbg text-white py-2 px-4' >Get Started </Link>
            </div>
        </>
    )
}

export default LandingPage