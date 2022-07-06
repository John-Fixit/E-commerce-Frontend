import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Footage from './Footage'
import Profile from './Profile'
import Cart from './Cart'
function Homepage() {
  return (
    <>
      <Navbar />
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