import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaDailymotion, FaTrash } from 'react-icons/fa'
import img from '../Images/bgImg2.jpg'
import style from './style.css'
function Cart() {
    useEffect(() => {
        getCart()
    }, [])
    const REMOVEURI = 'http://localhost:4000/user/removeCartItem'
    const [product, setproduct] = useState([])
    const [checkOutAmount, setcheckOutAmount] = useState('')
    const [productVariation, setproductVariation] = useState(1)
    const [userId, setuserId] = useState('')
    const getCart = () => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'))
        setuserId(() => { return userDetails._id })
        setproduct(() => { return userDetails.cartProduct })
    }
    const increament = (index) => {
        // let kk = product[index].productVariation +1;
        // console.log(kk);
        // return product[index].productVariation = kk
    }
    const decreament = (index) => {
        //   setproductVariation(()=>{
        //     return parseInt(product[index].productVariation) -1
        //   })
    }
    const removeItem = ({productImage}) => {
        axios.post(REMOVEURI, {userId, productImage}).then((res)=>{
            console.log(res);
        })
    }
    return (
        <>
            <div className='container-fluid cont_fluid bg-light padding_nav py-3'>
                <div className='row'>
                    <div className='col-sm-9'>
                        <div className='card h-100 shadow py-2 border-0 pt-4 px-2'>
                            <h5 className='card-header bg-white'>Cart ({product.length})</h5>
                            {
                                product.map((eachProduct, index) => (
                                    <div className='card-body' key={index}>
                                        <div className='row  '>
                                            <div className='col-sm-9 d-flex'>
                                                <img src={eachProduct.productImage} className="card-img-top" alt="..." style={{ width: '10vh' }} />
                                                <div className='ms-3 mt-1' >
                                                    <p className='card-text'>{eachProduct.productTitle}</p>
                                                    <p className='text-muted'>Size : product size</p>
                                                </div>
                                            </div>
                                            <div className='col-sm-3 text-end'>
                                                <h4>Price ₦ {eachProduct.productPrice * eachProduct.productVariation}</h4>
                                            </div>
                                        </div>
                                        <div className='card-footer bg-white border-top-0 d-flex justify-content-between'>
                                            <button className='textColor border-0 py-2 px-4 rounded-3' onClick={()=>removeItem({productImage: eachProduct.productImage})}><FaTrash /> Remove</button>
                                            {/* <div className='row'>
                                                <button className='col-4 btn btnbg text-light fw-bold' onClick={() => decreament(index)}>-</button>
                                                <p className='col-4'>{eachProduct.productVariation}</p>
                                                <button className='col-4 btn btnbg text-light fw-bold' onClick={() => increament(index)}>+</button>
                                            </div> */}
                                        </div>
                                        <hr />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='col-sm-3'>
                        <div className='card py-2'>
                            <h5 className='card-header ps-2 bg-white'>Cart Summary</h5>
                            <div className='card-body px-2 py-0 pt-2 border-bottom d-flex justify-content-between'>
                                <p>Sub-Total</p>
                                <h5>₦ total amount sum</h5>
                            </div>
                            <button className='btn mt-2 btnbg text-light fw-bold mx-2' >CHECKOUT (Total amount)</button>
                        </div>
                    </div>
                </div>
                <div className='col-12 mt-2'>
                    <div className='card shadow'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart