import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaDailymotion, FaTrash } from 'react-icons/fa'
import img from '../Images/bgImg2.jpg'
import style from './style.css'
import { useNavigate } from 'react-router-dom'
import PaystackPop from '@paystack/inline-js'
import { baseUrl } from '../Utils/BaseUrl'
function Cart({thisuser}) {
    const navigate = useNavigate()
    useEffect(() => {
        getCart()
    }, [])
    const REMOVEURI = `${baseUrl}/user/removeCartItem`
    const CARTURI = `${baseUrl}/user/carts`
    const paymentURI = `${baseUrl}/user/payment`
    const [product, setproduct] = useState([])
    const [checkOutAmount, setcheckOutAmount] = useState('')
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const [isGoing, setisGoing] = useState(false)
    const [email, setemail] = useState('')
    const [contact, setcontact] = useState('')
    const [username, setusername] = useState('')
    const [message, setmessage] = useState('')
    const [status, setstatus] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [isComing, setisComing] = useState(false)
    const userId = userDetails._id
    const getCart = () => {
        if(userId !=''){
            axios.post(CARTURI, { userId }).then((res) => {
                setemail(() => { return res.data.user.email })
                setcontact(() => { return res.data.user.contact })
                setusername(() => { return res.data.user.username })
                setproduct(() => { return res.data.products })
                setcheckOutAmount(() => { return res.data.totalPrice })
            })
        }
    }
    const removeItem = ({ productImage }) => {
        console.log(userId);
        setisComing(true)
        axios.post(REMOVEURI, { userId, productImage }).then((res) => {
            setisComing(false)
            window.location.reload()
        })
    }
    const payCheckOutAmount = (amountToPay) => {
        setisGoing(true)
        const paystack = new PaystackPop()
        paystack.newTransaction({
            key: 'pk_test_8e0adf1d74b3595f09d84c9b4ec645477eeb20fd',
            amount: amountToPay * 100,
            email,
            contact,
            onSuccess: (transaction) => {
                setisLoading(false)
                const paymentDetail = { userId, username, amountToPay, email, paymentReference: transaction.reference }
                axios.post(paymentURI, paymentDetail).then((res) => {
                    setisGoing(false)
                    const paymentResult = res.data
                    if (paymentResult.status) {
                        alert(`Payment was successfull! Reference ${transaction.reference}`)
                        window.location.reload()
                    }
                    else {
                        setmessage(paymentResult.message)
                        setstatus(paymentResult.status)
                    }
                })
            },
            onCancel: () => {
                setisGoing(false)
                alert(`You want to close the payment log!`)
            }
        })
    }
    return (
        <>
            <div className='container-fluid cont_fluid bg-light padding_nav bg-white py-3'>
                <div className='row'>
                    {
                        isLoading ? '' :
                        status? '' : <p className='alert alert-danger'>{message}</p>
                    }
                    <div className='col-sm-9'>
                        <div className='card h-100 shadow py-2 border-0 pt-4 px-2'>
                            <h5 className='card-header bg-white'>Cart ({product.length})</h5>
                            {
                                product.length < 1 ? <h3 className='text-muted ms-3'>No product in cart yet</h3> :
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
                                                <button className='textColor border-0 py-2 px-4 rounded-3' onClick={() => removeItem({ productImage: eachProduct.productImage })}> {isComing ? <div className="spinner-border text-danger opacity-50" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : <span ><FaTrash /> Remove</span>}</button>
                                                <div className='row'>          
                                                    <p className='col-12'>{eachProduct.productVariation} product</p>
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
                                <h5>₦ {checkOutAmount}</h5>CHECKOUT ({checkOutAmount})
                            </div>
                            <button className='btn mt-2 btnbg text-light fw-bold mx-2' onClick={() => payCheckOutAmount(checkOutAmount)}>{isGoing ? <div className="spinner-border text-white opacity-50" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : `CHECKOUT (${checkOutAmount})`}</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Cart