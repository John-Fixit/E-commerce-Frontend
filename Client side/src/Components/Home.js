import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import style from './style.css'
import img1 from '../Images/bgImg1.jpg'
import img2 from '../Images/bgImg2.jpg'
import img3 from '../Images/bgImg3.jpg'
import { FaCartPlus } from 'react-icons/fa'
import AOS from 'aos'
import 'aos/dist/aos.css'

function Home() {
  useEffect(() => {
    getHome()
    AOS.init()
    AOS.refresh()
  }, [])
  const navigate = useNavigate()
  const [products, setproducts] = useState([])
  const [otherProduct, setotherProduct] = useState([])
  const HOMEURI = 'http://localhost:4000/user/home'
  const CARTURI = 'http://localhost:4000/user/cart'
  const productURI = 'http://localhost:4000/user/products'
  const [userId, setuserId] = useState('')
  const [index, setindex] = useState('')
  const [productVariation, setproductVariation] = useState(1)
  const [isLoading, setisLoading] = useState(true)
  const [productTittle, setproductTittle] = useState('')
  const [productPrice, setproductPrice] = useState('')
  const getHome = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    axios.get(HOMEURI, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((res) => {
        if (res.data.status) {
          const responseFromServer = res.data
          const userDetails = responseFromServer.userDetails
          setuserId(userDetails._id)
          localStorage.setItem('userDetails', JSON.stringify(userDetails))

          axios.get('https://fakestoreapi.com/products').then((res) => {
            const responseFromAPI = res.data
            setproducts(() => {
              setisLoading(false)
              return responseFromAPI
            })
          })
          axios.get(productURI).then((res) => {
            setotherProduct(() => { return res.data.result })
          })
        }
        else {
          localStorage.removeItem('token')
          localStorage.removeItem('userDetails')
          navigate('/signin')
        }
      })
  }
  const modalOut = (productDetail) => {
    console.log(productDetail);
    setindex(() => { return productDetail.index })
    setproductTittle(() => { return productDetail.titleOfProduct })
    setproductPrice(() => { return productDetail.priceOfProduct })
  }
  const addToCart = (product) => {
    console.log(index);
    axios.post(CARTURI, product).then((res) => {
      const responseFromCart = res.data
      setproductVariation(0)
      if (responseFromCart.status) {
        navigate('/homepage/cart')
      }
    })
  }
  const contShopping = (product) => {
    axios.post(CARTURI, product).then((res) => {
      const responseFromCart = res.data
      setproductVariation(0)
      if (responseFromCart.status) {
        navigate('/homepage/')
        window.location.reload()
      }
    })
  }
  const increament = () => {
    setproductVariation(() => {
      return parseInt(productVariation) + 1
    })
  }
  const decreament = () => {
    setproductVariation(() => {
      return productVariation - 1
    })
  }
  return (
    <>
      <div className='container-fluid cont_fluid'>
        <div id="carouselExampleFade" className="col-md-12 carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={img1} alt="..." className='card-img-top carousel_img' style={{ height: '70vh' }} />
            </div>
            <div className="carousel-item">
              <img src={img2} alt="..." className='card-img-top carousel_img' style={{ height: '70vh' }} />
            </div>
            <div className="carousel-item">
              <img src={img3} alt="..." className='card-img-top carousel_img' style={{ height: '70vh' }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className='container-fluid products_row'>
          <div className='d-flex justify-content-between'>
            <h4 className='text-capitalize'>Popular product</h4>
            <h5 className='text-muted'>See all product</h5>
          </div>
        </div>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className='d-flex'>
                <img src={img2} className="d-block w-25" alt="..." />
                <img src={img2} className="d-block w-25" alt="..." />
                <img src={img2} className="d-block w-25" alt="..." />
                <img src={img2} className="d-block w-25" alt="..." />
              </div>
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <div className='d-flex'>
                <img src={img3} className="d-block w-25" alt="..." />
                <img src={img3} className="d-block w-25" alt="..." />
                <img src={img3} className="d-block w-25" alt="..." />
                <img src={img3} className="d-block w-25" alt="..." />
              </div>
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <div className='d-flex'>
                <img src={img1} className="d-block w-25" alt="..." />
                <img src={img1} className="d-block w-25" alt="..." />
                <img src={img1} className="d-block w-25" alt="..." />
                <img src={img1} className="d-block w-25" alt="..." />
              </div>
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
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
        <div className='container-fluid text-center'>
          {
            isLoading ? <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> :
              <div className='col-12 products_row'>
                <marquee behavior="infinite" direction="alternate" className=''>Purchase and Add your favourite product to your cart</marquee>

                <div className='row'>
                  {
                    products.map((eachProduct, index) => (
                      <div className='col-lg-3 col-md-6 mt-3 col-sm-12' key={index}>
                        <div className="card h-100 rounded-3 pt-3 shadow" data-aos='zoom-in' data-aos-delay='50' >
                          <img src={eachProduct.image} className="card-img-top mx-auto w-50 h-50" alt="..." />
                          <div className="card-body">
                            <h6 className="card-title text-start">{eachProduct.title}</h6>
                            <div className='d-flex justify-content-between'>
                              <p className=''><span className='fw-bold'>RATING </span>: {eachProduct.rating.rate}</p>
                            </div>
                            <p className="card-text text-start">Price : ₦{Math.round(eachProduct.price * 50)} <span >per product</span></p>
                          </div>
                          <div className="card-footer">
                            <button type="button" className="btn btnbg text-light w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => modalOut({ index, titleOfProduct: eachProduct.title, priceOfProduct: Math.round(eachProduct.price * 50) })} >
                              Add To Cart <FaCartPlus size='4vh' className='float-start' />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  <div className='row'>
                    {
                      otherProduct.map((eachProduct, index) => (
                        <div className='col-lg-3 col-md-6 mt-3' key={index}>
                          <div className="card h-100 rounded-3 pt-3 shadow" data-aos='zoom-in' data-aos-delay='50' >
                            <img src={eachProduct.image} className="card-img-top mx-auto w-75 h-50" alt="..." />
                            <div className="card-body">
                              <h6 className="card-title text-start">{eachProduct.title}</h6>
                              <div className='d-flex justify-content-between'>
                                <p className=''><span className='fw-bold'>RATING </span>: {eachProduct.rating}</p>
                              </div>
                              <p className="card-text text-start">Price : ₦{Math.round(eachProduct.price)} <span >per product</span></p>
                            </div>
                            <div className="card-footer">
                              <button type="button" className="btn btnbg text-light w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => modalOut({ index, titleOfProduct: eachProduct.title, priceOfProduct: Math.round(eachProduct.price) })} >
                                Add To Cart <FaCartPlus size='4vh' className='float-start' />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Select Quantity variation</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className='row justify-content-between'>
                            <div className='col-sm-6'>
                              <p className='fw-bold'>{productTittle}</p>
                              <p>₦ {productPrice}</p>
                            </div>
                            <div className='col-sm-6'>
                              <div className='row'>
                                <button className='col-4 btn btnbg text-light fw-bold opacity-75 h-50' onClick={decreament}>-</button>
                                <p className='col-4 text-center px-auto'>{productVariation}</p>
                                <button className='col-4 btn btnbg text-light fw-bold h-50' onClick={increament}>+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer btn-group shadow">
                          <button type="button" className="btn textColor" onClick={() => contShopping({ productImage: products[index].image, title: products[index].title, price: Math.round(products[index].price * 50), userId, productVariation })}>Continue Shopping</button>

                          <button className='btn btnbg text-light' onClick={() => addToCart({ productImage: products[index].image, title: products[index].title, price: Math.round(products[index].price * 50), userId, productVariation })}>View Cart and Checkout</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          }
        </div>
      </div>
    </>
  )
}

export default Home