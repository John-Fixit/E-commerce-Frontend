import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from './AdminHome'
import AdminNav from './AdminNav'
import AdminSignin from './AdminSignin'
import Adminsignup from './Adminsignup'
import CustomerList from './CustomerList'
import Footage from './Footage'
import UploadProducts from './UploadProducts'

function AdminPage() {
  return (
    <>
    <AdminNav />
        <Routes>
            <Route path='/' element={<AdminHome />}/>
            <Route path='/signin' element={<AdminSignin />}/>
            <Route path='/customers' element={<CustomerList />}/>
            <Route path='/new product' element={<UploadProducts />} />
            <Route path='/signup' element={<Adminsignup />}/>
        </Routes>
        <Footage />
    </>
  )
}

export default AdminPage