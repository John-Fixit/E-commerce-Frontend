import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './Components/SignUp'
import Signin from './Components/Signin'
import Homepage from './Components/Homepage'
import AdminPage from './Components/AdminPage'
import AdminSignin from './Components/AdminSignin'
function App() {

  return (
    <>
      <Routes>
        <Route path='/homepage/*' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin_login' element={<AdminSignin />}/>
        <Route path='/signin' element={<Signin />} />
        <Route path='/admin/*' element={<AdminPage />} />
      </Routes>
    </>
  )
}

export default App