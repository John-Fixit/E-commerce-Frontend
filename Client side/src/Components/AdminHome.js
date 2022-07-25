import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './style.css'
import { useNavigate } from 'react-router-dom'
import img1 from '../Images/business.png'
import img2 from '../Images/printing.png'
import img4 from '../Images/sticker.png'
import img5 from '../Images/christmas.png'
import img7 from '../Images/1473159158_Christmas-card-for-this-wonderful-season.png'
import { FaCartPlus, FaProductHunt, FaTrash, FaTrashAlt, FaUserAlt, FaUserAstronaut } from 'react-icons/fa'
function AdminHome({ customers, staff, products }) {
  const deleteProductURI = 'https://jfix-e-commerce-site.herokuapp.com/admin/deleteProduct'
  const [message, setmessage] = useState('')
  const [status, setstatus] = useState(true)
  const [productToDelete, setproductToDelete] = useState('')
  const [productId, setproductId] = useState('')
  const [isComing, setisComing] = useState(true)

  const modalOut = (productDetail) => {
    setproductToDelete(() => { return productDetail.productTitle })
    setproductId(productDetail.productId)
  }
  const handleOnChange = (e) => {
    if (productToDelete == e.target.value) {
      setisComing(false)
    }
    else{
      setisComing(true)
    }
  }
  const deleteProduct = () => {
      axios.post(deleteProductURI, { productId }).then((res) => {
        if (res.data.status) {
          window.location.reload()
        } else {
          setmessage(res.data.message)
          setstatus(res.data.status)
        }
      })
  }
  return (
    <>
      <div className='container-fluid cont_fluid '>
        <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className='d-flex'>
                <img src={img1} className="d-block" width='25%' alt="..." />
                <img src={img2} className="d-block" width='25%' alt="..." />
                <img src={img5} className="d-block" width='25%' alt="..." />
                <img src={img4} className="d-block" width='25%' alt="..." />
              </div>
              <div className="carousel-caption d-none d-md-block">
                <h5></h5>
                <p></p>
              </div>
            </div>
            <div className="carousel-item">
              <div className='d-flex'>
                <img src={img5} className="d-block " width='25%' alt="..." />
                <img src={img1} className="d-block " width='25%' alt="..." />
                <img src={img2} className="d-block " width='25%' alt="..." />
                <img src={img7} className="d-block " width='25%' alt="..." />
              </div>
              <div className="carousel-caption d-none d-md-block">
                <h5></h5>
                <p></p>
              </div>
            </div>
            <div className="carousel-item">
              <div className='d-flex'>
                <img src={img4} className="d-block" width='25%' alt="..." />
                <img src={img7} className="d-block" width='25%' alt="..." />
                <img src={img1} className="d-block" width='25%' alt="..." />
                <img src={img2} className="d-block" width='25%' alt="..." />
              </div>

            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className='col-sm-12 products_row'>
          <div className='row'>
            <div className='col-md-4 col-sm-12 mt-3'>
              <div className='card shadow h-100 btnbg rounded p-3 text-white'>
                <FaUserAstronaut size='4vh' className='mx-auto' />
                <h3 className='card-title'>Staffs : <span className='small_tex'>{staff.length}</span></h3>
                <div className="progress mt-3">
                  <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger ps-1 pe-3" role="progressbar" style={{ width: `${staff.length}%` }}>{staff.length}%</div>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-sm-12 mt-3'>
              <div className='card shadow h-100 p-3'>
                <FaUserAlt size='4vh' className='mx-auto' />
                <h3 className='card-title'>Customers : <span className='small_tex'>{customers.length}</span></h3>
                <div className="progress mt-3">
                  <div className="progress-bar progress-bar-striped progress-bar-animated ps-1 pe-3" role="progressbar" style={{ width: `${customers.length}%`, backgroundColor: '#FF5722' }} >{customers.length}%</div>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-sm-12 mt-3 '>
              <div className='card shadow h-100 p-3 text-white btnbg opacity-75'>
                <FaCartPlus size='4vh' className='mx-auto' />
                <h3 className='card-title'>Total Products : <span className='small_tex'>{products.length}</span></h3>
                <div className="progress mt-3">
                  <div className="progress-bar progress-bar-striped progress-bar-animated ps-1 pe-3" role="progressbar" style={{ width: `${products.length}%` }} >{products.length} %</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          products.length < 1 ?<div className='text-center'> <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div></div> :
            <div className='col-sm-12 products_row'>
              <p className='card-header text-center text-muted fs-4'>All Products Available</p>
              <marquee behavior="infinite" direction="alternate" className='btnbg text-light macque'>This are the products available in our store</marquee>
              <div className='row'>
                {
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
                          <button type="button" className="btn btnbg text-light w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => modalOut({ productId: eachProduct._id, productTitle: eachProduct.title })} ><FaTrashAlt size='3vh' className='float-star' /><small> Delete</small></button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
        }

        {
          status ?
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title mx-auto" id="exampleModalLabel">Are you absolutely sure to delete this product</h6>
                  </div>
                  <div className="modal-body">
                    <label htmlFor=''>Please type <b>{productToDelete}</b> to comfirm</label>
                    <input type='text' className='form-control' onChange={ handleOnChange} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className={isComing ? "btn btnbg disabled text-light" : "btn btnbg  text-light"} data-bs-dismiss="modal" onClick={deleteProduct}>Delete Product</button>
                  </div>
                </div>
              </div>
            </div> :
            <p className='alert alert-danger'>{message}</p>
        }

      </div>
    </>
  )
}

export default AdminHome