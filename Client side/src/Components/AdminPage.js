import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminHome from './AdminHome'
import AdminNav from './AdminNav'
import AdminSignin from './AdminSignin'
import Adminsignup from './Adminsignup'
import CustomerList from './CustomerList'
import Footage from './Footage'
import UploadProducts from './UploadProducts'
import axios from 'axios'

function AdminPage() {

  const getHomeURI = 'http://localhost:4000/admin/home'
  const customerURI = 'http://localhost:4000/admin/customers'
  const navigate = useNavigate()
  const [customers, setcustomers] = useState([])
  const [staff, setstaff] = useState([])
  const [products, setproducts] = useState('')
  const [firstname, setfirstname] = useState('')
  useEffect(() => {
    authorizeUser()
  }, [])
  const authorizeUser = () => {
    const admintoken = JSON.parse(localStorage.getItem('admintoken'))
    axios.get(getHomeURI, {
      headers: {
        'Authorization': `Bearer ${admintoken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((res) => {
      const responseFromServer = res.data.thisadmin
      if (res.data.status) {
        const adminInfo = { _id: responseFromServer._id, email: responseFromServer.email, firstname: responseFromServer.firstname, lastname: responseFromServer.lastname }
        localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
        setfirstname(()=>{return responseFromServer.firstname})
        axios.get(customerURI).then((res) => {
          console.log(res.data.product);
          if(res.data.status){
            setcustomers (()=>{return res.data.customers})
            setstaff (()=>{return res.data.admins})
            setproducts (()=>{return res.data.products})
          }
          else{
            setcustomers('0')
          }
        })

      } else {
        localStorage.removeItem('admintoken')
        localStorage.removeItem('adminInfo')
        navigate('/admin_login')
      }
    })
  }


  return (
    <>
    <AdminNav firstname = {firstname}/>
        <Routes>
            <Route path='/' element={<AdminHome customers={customers} staff={staff} products={products}/>}/>
            <Route path='/customers' element={<CustomerList customers={customers} staff={staff}/>}/>
            <Route path='/addProduct' element={<UploadProducts />} />
            <Route path='/signup' element={<Adminsignup />}/>
        </Routes>
        <Footage />
    </>
  )
}

export default AdminPage