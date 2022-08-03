import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import style from './style.css'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
function Contact() {
    const contactURI = 'http://localhost:4000/user/contact'
    const [status, setstatus] = useState(false)
    const [message, setmessage] = useState('')
    const [isLoading, setisLoading] = useState(true)
    const [isGoing, setisGoing] = useState(false)
    useEffect(()=>{
       getIp()
    }, [])
    const getIp= async()=>{
            const res=await axios.get('https://geolocation-db.com/json')
            console.log(res)
    }
    const formik = useFormik({
        initialValues: {
            senderName: '',
            senderEmail: '',
            senderAddress: '',
            senderTitle: '',
            senderMessage: ''
        },
        onSubmit: (values) => {
            axios.post(contactURI, values).then((res) => {
                setisGoing(false)
                setmessage(res.data.message)
                setstatus(res.data.status)
                console.log(res);
            })
            
        },
        validationSchema: yup.object({
            senderName: yup.string().required('This field is Required'),
            senderEmail: yup.string().required('This field is Required').email('Please enter a valid email'),
            senderAddress: yup.string().required('This field is Required'),
            senderTitle: yup.string().required('This field is Required'),
            senderMessage: yup.string().required('This field is Required')
        })
    })
    return (
        <>
            <div className='col-12'>
                <h2 className='btnbg text-center text-light py-2'>Contact Page</h2>
                <div className='container mt-3'>
                    {
                        isLoading ? '' : status ? <p className='alert alert-success'>{message}</p> : <p className='alert alert-danger'>{message}</p>
                    }
                    <form action='' onSubmit={formik.handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-6 mt-3'>
                                <div className='form-floating'>
                                    <input type='text' className='form-control' placeholder='Name' name='senderName' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.senderName} />
                                    <label htmlFor=''>Name</label>
                                </div>
                                {
                                    formik.touched.senderName ? <small className='text-danger ms-3'>{formik.errors.senderName}</small> : ''
                                }
                            </div>
                            <div className='col-sm-6 mt-3'>
                                <div className='form-floating'>
                                    <input type='text' className='form-control' placeholder='Email' name='senderEmail' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.senderEmail} />
                                    <label htmlFor=''>Email</label>
                                </div>
                                {
                                    formik.touched.senderEmail ? <small className='text-danger ms-3'>{formik.errors.senderEmail}</small> : ''
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6 mt-3'>
                                <div className='form-floating'>
                                    <input type='text' className='form-control' placeholder='Address' name='senderAddress' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.senderAddress} />
                                    <label htmlFor=''>Address</label>
                                </div>
                                {
                                    formik.touched.senderAddress ? <small className='text-danger ms-3'>{formik.errors.senderAddress}</small> : ''
                                }
                            </div>
                            <div className='col-sm-6 mt-3'>
                                <div className='form-floating'>
                                    <input type='text' className='form-control' placeholder='Title' name='senderTitle' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.senderTitle} />
                                    <label htmlFor=''>Title</label>
                                </div>
                                {
                                    formik.touched.senderTitle ? <small className='text-danger ms-3'>{formik.errors.senderTitle}</small> : ''
                                }
                            </div>
                            <div className='col-12 mt-3'>
                                <textarea cols='10' rows='10' className='form-control' placeholder='Message' name='senderMessage' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.senderMessage}></textarea>
                                <button className='btn btnbg mt-3 text-light p-3 float-end' type='submit'>{isGoing ? <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div> : 'Send Message'
                                }</button>
                            </div>
                        </div>
                    <Link to='/contact' className='text-decoration-none border p-2 rounded-3 btnbg text-white'><FaArrowAltCircleLeft/> Back</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact