import React, {useEffect, useState} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Footage from './Footage'
import Profile from './Profile'
import Cart from './Cart'
import axios from 'axios'
function Homepage() {
  const [thisuser, setthisuser] = useState('')
  const navigate = useNavigate()
  const [allProducts, setallProducts] = useState([])
  const HOMEURI = 'https://jfix-e-commerce-site.herokuapp.com/user/home'
  const productURI = 'https://jfix-e-commerce-site.herokuapp.com/user/products'
  useEffect(()=>{
    getHome()
  }, [])
  
  

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
          const userInfo = res.data.userDetails
          localStorage.setItem('userDetails', JSON.stringify(userInfo))
          setthisuser(userInfo)
          axios.get(productURI).then((res) => {
            setallProducts(() => { return res.data.result })
          })
        }
        else {
          localStorage.removeItem('token')
          localStorage.removeItem('userDetails')
          navigate('/signin')
        }
      })
  }

  return (
    <>
      <Navbar thisuser={thisuser}  />
      <Routes>
        <Route path='/' element={<Home allProducts={allProducts} thisuser={thisuser}/>} />
        <Route path='/profile' element={<Profile thisuser={thisuser}/>}/>
        <Route path='/cart' element={<Cart thisuser={thisuser}/>}/>
      </Routes>
      <Footage />
    </>
  )
}

export default Homepage