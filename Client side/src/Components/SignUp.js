import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import style from './style.css'
function SignUp() {
    const navigate = useNavigate()
    const SIGNUPURI = 'https://jfix-e-commerce-site.herokuapp.com/user/signup'
    const [status, setstatus] = useState('')
    const [message, setmessage] = useState('')
    const [isLoading, setisLoading] = useState(true)
    const [isGoing, setisGoing] = useState(false)
    const contactRegex = /^[0][\d]{10}$/
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            contact: '',
            username: '',
            password: '',
            profilePhoto: '',
            gender: 'please select',
        },
        onSubmit: (values) => {
            const userDetails = values;
            setisGoing(true)
            axios.post(SIGNUPURI, userDetails).then((res) => {
                setisLoading(false)
                setisGoing(false)
                let feedBack = res.data
                setmessage(feedBack.message)
                setstatus(feedBack.status)
                formik.values.firstname=""
                formik.values.lastname=""
                formik.values.email=""
                formik.values.contact=""
                formik.values.username=""
                formik.values.password=""
                if (res.data.status) {
                    navigate('/signin')
                }
            })
        },
        validationSchema: yup.object({
            firstname: yup.string().required(`This field is requied`),
            lastname: yup.string().required(`This field is requied`),
            email: yup.string().required(`This field is requied`).email(`please, enter a verlid email`),
            contact: yup.string().required(`This field is requied`).matches(contactRegex, `contact must be valid 11 digit`),
            username: yup.string().required(`This field is requied`),
            password: yup.string().required(`This field is requied`),
        })
    })
    return (
        <>
            <div className='container-fluid'>
                <div className='col-lg-7 col-md-12 mx-auto my-4'>
                    <div className='form shadow'>
                        <div className='bgImg'>
                            <h1 className='card-header text-center text-light border-bottom-0 btnbg '>Sign up</h1>
                        </div>
                        <div className='p-3'>
                            {
                                isLoading ? '' : status ? <div className='alert alert-success text-center'>{message}</div> : <div className='alert alert-danger text-center'>{message}</div>
                            }
                            <form action='' onSubmit={formik.handleSubmit}>
                                <div className='row'>
                                    <div className='form-floating mt-2 col-lg-6 col-md-12'>
                                        <div className='form-floating'>
                                            <input type='text' name='firstname' className='form-control mx-auto' placeholder='First Name here' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstname} />
                                            <label for='' className='text-muted ms-2'>First Name here</label>
                                            {formik.touched.firstname ? <small className='text-danger'>{formik.errors.firstname}</small> : ''}
                                        </div>
                                    </div>
                                    <div className='form-floating mt-2 col-lg-6 col-md-12 '>
                                        <div className='form-floating '>
                                            <input type='text' name='lastname' className='form-control mx-auto' placeholder='Last Name here' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastname} />
                                            <label for='' className='text-muted ms-2'>Last Name here</label>
                                            {formik.touched.lastname ? <small className='text-danger'>{formik.errors.lastname}</small> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='form-floating mt-2 col-lg-6 col-md-12'>
                                        <div className='form-floating'>
                                            <input type='email' name='email' className='form-control mx-auto' placeholder='Email Address' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                            <label for='' className='text-muted ms-2'>Email Address</label>
                                            {formik.touched.email ? <small className='text-danger'>{formik.errors.email}</small> : ''}
                                        </div>
                                    </div>
                                    <div className='form-floating mt-2 col-lg-6 col-md-12'>
                                        <div className='form-floating'>
                                            <input type='text' name='contact' className='form-control mx-auto bg-white' placeholder='Contact' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contact} />
                                            <label for='' className='text-muted ms-2'>Contact</label>
                                            {formik.touched.contact ? <small className='text-danger'>{formik.errors.contact}</small> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>

                                    <div className=' mt-2 col-lg-6 col-md-12'>
                                        <div className='form-floating'>
                                            <input type='text' name='username' className='form-control mx-auto' placeholder='username' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
                                            <label for='' className='text-muted ms-2'>Username</label>
                                        </div>
                                        {formik.touched.username ? <small className='text-danger'>{formik.errors.username}</small> : ''}
                                    </div>
                                    <div className='mt-2 col-lg-6 col-md-12'>
                                        <div className='form-floating'>

                                            <input type='password' name='password' className='form-control mx-auto' placeholder='Password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                            <label for='' className='text-muted ms-2'>Password</label>
                                            {formik.touched.password ? <small className='text-danger'>{formik.errors.password}</small> : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 ms-3 mt-3'>
                                    <p className='text-muted'>By creating account, you have <Link to='' className='text-decoration-none'>agreed with the terms and condition of this site.</Link></p>
                                </div>
                                <div className='col-sm-12 ms-3 mt-3'>
                                    <p className='text-muted'>Already have an account <Link to='/signin' className='text-decoration-none'>Sign in</Link></p>
                                </div>
                                <div className='col-12 mt-3 text-end'>
                                    <button className='btn btnbg px-5 text-light' type='submit'>{isGoing ? <div className="spinner-border text-light opacity-50" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : 'Create account'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp