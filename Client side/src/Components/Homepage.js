import React, {useEffect, useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Footage from './Footage'
import Profile from './Profile'
import Cart from './Cart'
import axios from 'axios'
function Homepage() {
  const [thisuser, setthisuser] = useState('')
  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  const GETUSERURI = 'http://localhost:4000/user/thisuser'
  let userId;
  if (localStorage.userDetails) {
    userId = userDetails._id
  }
  useEffect(()=>{
    getUser()
  }, [])
  const getUser = () => {
    axios.post(GETUSERURI, { userId }).then((res) => {
      setthisuser(  
         res.data.user
      )
    })
  }
  return (
    <>
      <Navbar thisuser={thisuser}  />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
      <Footage />
    </>
  )
}

export default Homepage