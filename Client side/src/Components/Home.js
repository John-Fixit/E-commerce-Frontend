import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import style from './style.css'
import img1 from '../Images/bgImg1.jpg'
import img2 from '../Images/bgImg2.jpg'
import img3 from '../Images/bgImg3.jpg'
import { FaCartPlus } from 'react-icons/fa'
// import Footage from './Footage'

function Home() {
  // useEffect(()=>{
  //   getHome()
  // }, [])
  const navigate = useNavigate()
  // const HOMEURI = 'http://localhost:4000/user/home'
  // const getHome=()=>{
  //   const token =  localStorage.getItem('token')
  //     axios.get(HOMEURI, {headers:{
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }}).then((res)=>{
  //       if(res.data.status==200){
  //         const userDetails = res.data
  //         localStorage.userDetails = JSON.stringify(userDetails)
  //         console.log(userDetails);
  //       }
  //       else{
  //           localStorage.removeItem('token')
  //           localStorage.removeItem('userDetails')
  //           navigate('/signin')
  //       }
  //     })
  // }

  return (
    <>
      <Navbar />
      <div className='container-fluid cont_fluid'>
        <div id="carouselExampleFade" className="col-md-12 carousel slide carousel-fade" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={img1} alt="..." className='card-img-top carousel_img' style={{ height: '70vh' }} />
            </div>
            <div class="carousel-item">
              <img src={img2} alt="..." className='card-img-top carousel_img' style={{ height: '70vh' }} />
            </div>
            <div class="carousel-item">
              <img src={img3} alt="..." className='card-img-top carousel_img' style={{ height: '70vh' }} />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div className='container-fluid products_row'>
          <div className='d-flex justify-content-between'>
            <h4 className='text-capitalize'>Popular product</h4>
            <h5 className='text-muted'>See all product</h5>
          </div>
        </div>
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div className='d-flex'>
                <img src={img2} class="d-block w-25" alt="..." />
                <img src={img2} class="d-block w-25" alt="..." />
                <img src={img2} class="d-block w-25" alt="..." />
                <img src={img2} class="d-block w-25" alt="..." />
              </div>
              <div class="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <div className='d-flex'>
                <img src={img3} class="d-block w-25" alt="..." />
                <img src={img3} class="d-block w-25" alt="..." />
                <img src={img3} class="d-block w-25" alt="..." />
                <img src={img3} class="d-block w-25" alt="..." />
              </div>
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <div className='d-flex'>
                <img src={img1} class="d-block w-25" alt="..." />
                <img src={img1} class="d-block w-25" alt="..." />
                <img src={img1} class="d-block w-25" alt="..." />
                <img src={img1} class="d-block w-25" alt="..." />
              </div>
              <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div className='container-fluid'>
          <div className='col-12 products_row'>
            <div className='row'>
              <div className='col-lg-3 col-md-6'>
                <div class="card h-100 rounded-3">
                  <img src={img2} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">name of the product</h5>
                    <p class="card-text">₦ (Price) <span >per product</span></p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted"><button className='btn btn-primary w-100'>Add Cart <FaCartPlus size='3vh' className='float-end' /></button></small>
                  </div>
                </div>
              </div>
              <div className='col-lg-3 col-md-6'>
                <div class="card h-100 rounded-3">
                  <img src={img1} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">name of the product</h5>
                    <p class="card-text">₦ (Price) <span >per product</span></p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted"><button className='btn btn-primary w-100'>Add Cart <FaCartPlus size='3vh' className='float-end' /></button></small>
                  </div>
                </div>
              </div>
              <div className='col-lg-3 col-md-6'>
                <div class="card h-100 rounded-3">
                  <img src={img2} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">name of the product</h5>
                    <p class="card-text">₦ (Price) <span >per product</span></p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted"><button className='btn btn-primary w-100'>Add Cart <FaCartPlus size='3vh' className='float-end' /></button></small>
                  </div>
                </div>
              </div>
              <div className='col-lg-3 col-md-6'>
                <div class="card h-100 rounded-3">
                  <img src={img3} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">name of the product</h5>
                    <p class="card-text">₦ (Price) <span >per product</span></p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted"><button className='btn btn-primary w-100'>Add Cart <FaCartPlus size='3vh' className='float-end' /></button></small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footage /> */}
      </div>
    </>
  )
}

export default Home