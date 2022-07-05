import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
function Homepage() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default Homepage