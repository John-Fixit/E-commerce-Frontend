import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import style from './style.css'
import img1 from '../Images/bgImg1.jpg'
import img2 from '../Images/bgImg2.jpg'
import img3 from '../Images/bgImg3.jpg'
import { FaCartPlus } from 'react-icons/fa'
import AOS from 'aos'
import 'aos/dist/aos.css'

function Home({ allProducts, thisuser }) {

  const navigate = useNavigate()
  const CARTURI = 'https://jfix-e-commerce-site.herokuapp.com/user/cart'

  const [index, setindex] = useState('')
  const [productVariation, setproductVariation] = useState(1)
  const [productTittle, setproductTittle] = useState('')
  const [productPrice, setproductPrice] = useState('')
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  const modalOut = (productDetail) => {
    setindex(() => { return productDetail.index })
    setproductTittle(() => { return productDetail.titleOfProduct })
    setproductPrice(() => { return productDetail.priceOfProduct })
  }
  const addToCart = (product) => {
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
            <h4 className='text-capitalize'>products</h4>
            <h5 className='text-muted'>Favourites products</h5>
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
          
                <marquee behavior="infinite" direction="alternate" className='mt-2'><span className='btnbg text-light rounded-pill px-3'>Welcome to JFIX e-commerce site, we're glad you stopped by!</span></marquee>

                <div className='row'>
                  {
                    allProducts.length < 1 ? <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div> :
                      allProducts.map((eachProduct, index) => (
                        <div className='col-lg-3 col-md-6 mt-3' key={index}>
                          <div className="card h-100 rounded-3 pt-3 shadow" data-aos='zoom-in' data-aos-delay='50' >
                            <img src={eachProduct.image} className="card-img-top mx-auto w-75" alt="..." />
                            <div className="card-body">
                              <h6 className="card-title text-start">{eachProduct.title}</h6>
                              <div className='d-flex justify-content-between'>
                                <p className=''><span className='fw-bold'>RATING </span>: {eachProduct.rating}</p>
                              </div>
                              <p className="card-text text-start">Price : ₦{Math.round(eachProduct.price)} <span >per product</span></p>
                            </div>
                            <div className="p-2">
                              <button type="button" className="btn btnbg text-light w-100" data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={() => modalOut({ index, titleOfProduct: eachProduct.title, priceOfProduct: Math.round(eachProduct.price) })} >
                                Add To Cart <FaCartPlus size='4vh' className='float-start' />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                      ))
                  }
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1"  data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <button type="button" className="btn textColor" data-bs-dismiss="modal" onClick={() => contShopping({ productImage: allProducts[index].image, title: allProducts[index].title, price: Math.round(allProducts[index].price), userId: thisuser._id, productVariation })}>Continue Shopping</button>
                        <button className='btn btnbg text-light' data-bs-dismiss="modal" onClick={() => addToCart({ productImage: allProducts[index].image, title: allProducts[index].title, price: Math.round(allProducts[index].price), userId: thisuser._id, productVariation })}>View Cart and Checkout</button>
                      </div>
                    </div>
                  </div>
                </div>
        </div>
        <marquee behavior="infinite" direction="alternate" className='mt-2'><span className='btnbg text-light rounded-pill px-3'>Enjoy our product with no doubt!</span></marquee>
      </div>
    </>
  )
}

export default Home