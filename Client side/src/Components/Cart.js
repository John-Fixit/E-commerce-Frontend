import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaDailymotion, FaTrash } from 'react-icons/fa'
import img from '../Images/bgImg2.jpg'
import style from './style.css'
import { useNavigate } from 'react-router-dom'
import PaystackPop from '@paystack/inline-js'
function Cart() {
    const navigate = useNavigate()
    useEffect(() => {
        getCart()
    }, [])
    const REMOVEURI = 'http://localhost:4000/user/removeCartItem'
    const CARTURI = 'http://localhost:4000/user/carts'
    const paymentURI = 'http://localhost:4000/user/payment'
    const [product, setproduct] = useState([])
    const [checkOutAmount, setcheckOutAmount] = useState('')
    const [productVariation, setproductVariation] = useState(1)
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const [email, setemail] = useState('')
    const [contact, setcontact] = useState('')
    const [username, setusername] = useState('')
    const userId = userDetails._id
    const getCart = () => {
        axios.post(CARTURI, { userId }).then((res) => {
            setemail(() => { return res.data.user.email })
            setcontact(() => { return res.data.user.contact })
            setusername(() => { return res.data.user.username })
            setproduct(() => { return res.data.products })
            setcheckOutAmount(() => { return res.data.totalPrice })
        })
    }
    const increament = (index) => {
        // let kk = product[index].productVariation +1;
        // console.log(kk);
        // setproductVariation(()=>{
        //  return product[index].productVariation = kk
        // })
    }
    const decreament = (index) => {
        //   setproductVariation(()=>{
        //     return parseInt(product[index].productVariation) -1
        //   })
    }
    const removeItem = ({ productImage }) => {
        console.log(userId);
        axios.post(REMOVEURI, { userId, productImage }).then((res) => {
            window.location.reload()
        })
    }
    const payCheckOutAmount = (amountToPay) => {
        const paystack = new PaystackPop()
        paystack.newTransaction({
            key: 'pk_test_8e0adf1d74b3595f09d84c9b4ec645477eeb20fd',
            amount: amountToPay * 100,
            email,
            contact,
            onSuccess:(transaction)=>{
                const paymentDetail = {userId, username, amountToPay, email, paymentReference : transaction.reference}
                axios.post(paymentURI, paymentDetail)
                alert(`Payment was successfull! Reference ${transaction.reference}`)
            },
            oncancel:()=>{
                console.log(`You unexpectedly close the payment log!`)
            }
        })
    }
    return (
        <>
            <div className='container-fluid cont_fluid bg-light padding_nav bg-white py-3'>
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
                                                <h4>Price ₦ {eachProduct.productPrice}</h4>
                                            </div>
                                        </div>
                                        <div className='card-footer bg-white border-top-0 d-flex justify-content-between'>
                                            <button className='textColor border-0 py-2 px-4 rounded-3' onClick={() => removeItem({ productImage: eachProduct.productImage })}><FaTrash /> Remove</button>
                                            <div className='row'>
                                                {/* <button className='col-4 btn btnbg text-light fw-bold' onClick={() => decreament(index)}>-</button> */}
                                                <p className='col-12'>{eachProduct.productVariation} product</p>
                                                {/* <button className='col-4 btn btnbg text-light fw-bold' onClick={() => increament(index)}>+</button> */}
                                            </div>
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
                                <h5>₦ {checkOutAmount}</h5>
                            </div>
                            <button className='btn mt-2 btnbg text-light fw-bold mx-2' onClick={() => payCheckOutAmount(checkOutAmount)}>CHECKOUT ({checkOutAmount})</button>
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