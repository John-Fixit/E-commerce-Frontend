import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Signup from './Components/SignUp'
import Signin from './Components/Signin'
import Home from './Components/Home'
function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
      </Routes>
    </>
  )
}

export default App