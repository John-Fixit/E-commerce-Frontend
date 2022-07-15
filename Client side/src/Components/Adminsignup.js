import React, { useState } from 'react'
import style from './style.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
function Adminsignup() {
  const passRegex = /^[\w]{6,}$/
  const contactRegex = /^[0][\d]{10}$/
  const signupURI = 'http://localhost:4000/admin/signup'
  const [isLoading, setisLoading] = useState(true)
  const [message, setmessage] = useState('')
  const [status, setstatus] = useState(false)
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      contact: '',
      email: '',
      gender: '',
      profilePhoto: '',
      password: '',
      privateKey: ''
    },
    onSubmit: (values) => {
      axios.post(signupURI, values).then((res)=>{
        setisLoading(false)
        setmessage(res.data.message)
        if(res.data.status){
          setstatus(true)
        }
      })
    },
    validationSchema: yup.object({
      firstname: yup.string().required('This field is required'),
      lastname: yup.string().required('This field is required'),
      contact: yup.string().required('This field is required').matches(contactRegex, 'contact must start from zero and be valid 11 digit'),
      email: yup.string().required('This field is required').email('Please input a valid email'),
      
      password: yup.string().required('This field is required').matches(passRegex, 'Password must not less than six character'),
    })
  })
  return (
    <>
      <div className='container cont_fluid'>
        <div className='row'>
          <div className='col-6 bgs'>

          </div>
          <div className='col-6'>
            <div className='form'>
              <form action='' onSubmit={formik.handleSubmit}>
                <h2 className='card-header text-center text-muted'>Admin Sign up</h2>
                <div className='col-12'>
                  {
                    isLoading ? '' :
                    status ? <p className='alert alert-success text-center'>{message}</p>: <p className='alert alert-danger text-center'>{message}</p>
                  }
                </div>
                <div className='firstname'>
                  <div className='form-floating mt-2'>
                    <input type='text' className='form-control' name='firstname' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='firstname' />
                    <label htmlFor=''>Firstname</label>
                  </div>
                  {
                    formik.touched.firstname ? <small className='text-danger'>{formik.errors.firstname}</small> : ''
                  }
                </div>
                <div className='lastname'>
                  <div className='form-floating mt-2'>
                    <input type='text' className='form-control' name='lastname' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='lastname' />
                    <label htmlFor=''>Lastname</label>
                  </div>
                  {
                    formik.touched.lastname ? <small className='text-danger'>{formik.errors.lastname}</small> : ''
                  }
                </div>
                <div className='contact'>
                  <div className='form-floating mt-2'>
                    <input type='text' className='form-control' name='contact' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Contact' />
                    <label htmlFor=''>Phone Contact</label>
                  </div>
                  {
                    formik.touched.contact ? <small className='text-danger'>{formik.errors.contact}</small> : ''
                  }
                </div>
                <div className='email'>
                  <div className='form-floating mt-2'>
                    <input type='text' className='form-control' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Email address' />
                    <label htmlFor=''>Email Address</label>
                  </div>
                  {
                    formik.touched.email ? <small className='text-danger'>{formik.errors.email}</small> : ''
                  }
                </div>
                <div className=' form-floating mt-2'>
                  <select className='form-control' onChange={formik.handleChange}>
                    <option value='1'>Please select</option>
                    <option value='2'>Male</option>
                    <option value='3'>Female</option>
                  </select>
                  <label htmlFor='' >Gender(optional)</label>
                </div>
                <div className='password'>
                  <div className='form-floating mt-2'>
                    <input type='password' className='form-control' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='password' value={formik.password}/>
                    <label htmlFor=''>Password</label>
                  </div>
                  {
                    formik.touched.password ? <small className='text-danger'>{formik.errors.password}</small> : ''
                  }
                </div>
                <div className='button mt-2'>
                  <button className="btn bgs text-center w-100 text-white fs-5" type='submit'>Create account</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Adminsignup