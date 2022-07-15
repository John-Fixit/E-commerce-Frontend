import React, { useState } from 'react'
import style from './style.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AdminSignin() {
  const signinURI = 'http://localhost:4000/admin/signin'
  const [message, setmessage] = useState('')
  const [status, setstatus] = useState(false)
  const [isLoading, setisLoading] = useState(true)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      privateKey: ''
    },
    onSubmit: (values) => {
      axios.post(signinURI, values).then((res) => {
        console.log(res);
        setisLoading(false)
        const responseFromServer = res.data
        setstatus(responseFromServer.status)
        if(responseFromServer.status){
          localStorage.setItem('admintoken', JSON.stringify(responseFromServer.admintoken))
          navigate('/admin/')
        }
        else{
          setstatus(responseFromServer.status)
          setmessage(responseFromServer.message)
        }
      })
    },
    validationSchema: yup.object({
      email: yup.string().required('This field is required').email('Please input a valid email'),
      password: yup.string().required('This field is required'),
      privateKey: yup.string().required('You must provide your six digit private key')
    })
  })
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-6 bgs'>

          </div>
          <div className='col-6'>
            <div className='form'>
              <form action='' onSubmit={formik.handleSubmit}>
                <h2 className='card-header text-center text-muted'>Admin Log In </h2>
                <div className='col-12'>
                  {
                    isLoading ? ' ' : status ? " " : <p className='alert alert-danger text-center'>{message}</p>
                  }
                </div>
                <div className='email'>
                  <div className='form-floating mt-3'>
                    <input type='text' className='form-control' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Email address' />
                    <label htmlFor=''>Email Address</label>
                  </div>
                  {
                    formik.touched.email ? <small className='text-danger'>{formik.errors.email}</small> : ''
                  }
                </div>
                <div className='password'>
                  <div className='form-floating mt-3'>
                    <input type='password' className='form-control' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='password' />
                    <label htmlFor=''>Password</label>
                  </div>
                  {
                    formik.touched.password ? <small className='text-danger'>{formik.errors.password}</small> : ''
                  }
                </div>
                <div className='privateKey'>
                  <div className='form-floating mt-3'>
                    <input type='password' className='form-control' name='privateKey' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='privateKey' />
                    <label htmlFor=''>Your privateKey</label>
                  </div>
                  {
                    formik.touched.privateKey ? <small className='text-danger'>{formik.errors.privateKey}</small> : ''
                  }
                </div>
                <div className='button mt-3'>
                  <button className="btn bgs text-center w-100 text-white fs-5" type='submit'>Login</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSignin