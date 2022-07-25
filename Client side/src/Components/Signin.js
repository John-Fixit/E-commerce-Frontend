import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import style from './style.css'
function Signin() {
    const navigate = useNavigate()
    const SIGNINURI = 'https://jfix-e-commerce-site.herokuapp.com/user/signin'
    const [status, setstatus] = useState('')
    const [message, setmessage] = useState('')
    const [token, settoken] = useState('')
    const [isLoading, setisLoading] = useState(true)
    const [isGoing, setisGoing] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            const authDetails = values;
            setisGoing(true)
            axios.post(SIGNINURI, authDetails).then((res) => {
                let feedBack = res.data
                setisLoading(false)
                setisGoing(false)
                setstatus(feedBack.status)
                settoken(() => { return feedBack.token })
                let count = 0
                if (feedBack.status) {
                    localStorage.setItem('token', JSON.stringify(feedBack.token))
                    navigate('/homepage/')
                }
                else {
                    setmessage(feedBack.message)
                }
                
            })
        },
        validationSchema: yup.object({
            email: yup.string().required(`This field is requied`).email(`please, enter a verlid email`),
            password: yup.string().required(`This field is requied`),
        })
    })
    return (
        <>
            <div className='container-fluid'>
                <div className='col-lg-7 col-md-12 mx-auto my-5'>
                    <div className='form shadow'>
                        <div className='bgImg'>
                            <h1 className='card-header text-center text-light border-bottom-0 btnbg'>Sign in</h1>
                        </div>
                        <div className='p-3'>

                            <form action='' onSubmit={formik.handleSubmit}>
                                <div className='row'>
                                    <div className='form-floating mt-2 col-md-12'>
                                        <div className='form-floating'>
                                            <input type='text' name='email' className='form-control mx-auto' placeholder='Email Address' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                                            <label for='' className='text-muted ms-2'>Email Address</label>
                                            {formik.touched.email ? <small className='text-danger'>{formik.errors.email}</small> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2 col-md-12'>
                                    <div className='form-floating'>

                                        <input type='password' name='password' className='form-control mx-auto' placeholder='Password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                                        <label for='' className='text-muted ms-2'>Password</label>
                                        {formik.touched.password ? <small className='text-danger'>{formik.errors.password}</small> : ''}
                                    </div>
                                </div>
                                <div className='text-center mt-2'>
                                    {
                                        !status ? <small className='text-danger text-center fs-5'>{message}</small> : ''
                                    }
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6 mt-3'>
                                        <p className='text-muted'>Don't have an account <Link to='/signup' className='text-decoration-none'>Sign up</Link></p>
                                    </div>
                                    <div className='col-sm-6 mt-3 text-end'>
                                        <p className='text-muted'>Login as an admin <Link to='/admin_login' className='text-decoration-none'>Sign in</Link></p>
                                    </div>
                                </div>
                                <div className='col-12 mt-3 text-end'>
                                    <button className='btn btnbg px-5 text-light py-2' type='submit'>{isGoing ? <div className="spinner-border text-light opacity-50" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : 'Login account'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin