import React, { useState } from 'react'
import style from './style.css'
import img3 from '../Images/bgImg3.jpg'
import axios from 'axios'

function UploadProducts() {
  const [title, settitle] = useState('')
  const [price, setprice] = useState('')
  const [rate, setrate] = useState('')
  const [convertedFile, setconvertedFile] = useState('')
  const [isLoading, setisLoading] = useState(true)
  const [message, setmessage] = useState('')
  const [status, setstatus] = useState(false)
  const newProductURI = 'http://localhost:4000/admin/products'
  const selectProduct=(e)=>{
    const selectedProduct = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(selectedProduct)
    reader.onload=()=>{
      setconvertedFile(()=>{return reader.result });
    }
  }
  const uploadProduct=()=>{
    const productInfo = {convertedFile, title, price, rate }
    axios.post(newProductURI, productInfo).then((res)=>{
      console.log(res.data);
      setisLoading(false)
        setmessage(res.data.message)
        setstatus(res.data.status)
    })
  }

  return (
    <>
      <div className='products_row cont_fluid mt-5'>
        <h2 className='card-header text-center pt-2'>Add New Product</h2>
        <div className='row mt-2'>
          <div className='col-lg-6'>
            {
              isLoading ? '' : status ? <p className='alert alert-success text-center'>{message}</p> :  <p className='alert alert-danger text-center'>{message}</p> 
            }
            <div className='card p-3'>
              <div className='mt-2'>
                <label htmlFor=''>Product Image</label>
                <input type='file' className='form-control' placeholder='Title of The product' onChange={(e)=>selectProduct(e)}/>
              </div>
              <div className='form-floating mt-3'>
                <input type='text' className='form-control' placeholder='Title of The product' onChange={(e)=>settitle(e.target.value)}/>
                <label htmlFor=''>Title of the product</label>
              </div>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='form-floating mt-3'>
                    <input type='number' className='form-control' placeholder='Price of The product' onChange={(e)=>setprice(e.target.value)}/>
                    <label htmlFor=''>Price of the product</label>
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='form-floating mt-3'>
                    <input type='number' className='form-control' placeholder='Rate of The product' onChange={(e)=>setrate(e.target.value)}/>
                    <label htmlFor=''>Rate of the product</label>
                  </div>
                </div>
              </div>
              <div className='col-12'>
                <button className='btn btnbg w-100 mt-3 text-light fs-5' onClick={uploadProduct}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadProducts