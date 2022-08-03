import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './Components/SignUp'
import Signin from './Components/Signin'
import Homepage from './Components/Homepage'
import AdminPage from './Components/AdminPage'
import AdminSignin from './Components/AdminSignin'
import AppLandingRoute from './Components/AppLandingRoute'
import Contact from './Components/Contact'
function App() {

  return (
    <>
      <Routes>
        <Route path='/*' element={<AppLandingRoute />} />
        <Route path='/homepage/*' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin_login' element={<AdminSignin />}/>
        <Route path='/signin' element={<Signin />} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='*' element={<AppLandingRoute />} />
      </Routes>
    </>
  )
}

export default App