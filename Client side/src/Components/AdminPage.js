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
import AdminProfile from './AdminProfile'

function AdminPage() {

  const getHomeURI = 'https://jfix-e-commerce-site.herokuapp.com/admin/home'
  const customerURI = 'https://jfix-e-commerce-site.herokuapp.com/admin/customers'
  const navigate = useNavigate()
  const [customers, setcustomers] = useState([])
  const [staff, setstaff] = useState([])
  const [products, setproducts] = useState('')
  const [firstname, setfirstname] = useState('')
  const [profilePhoto, setprofilePhoto] = useState('')
  const [adminDetail, setadminDetail] = useState('')
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
      setadminDetail(()=>{return res.data.thisadmin})
      if (res.data.status) {
        const adminInfo = { adminId: responseFromServer._id, email: responseFromServer.email, firstname: responseFromServer.firstname, lastname: responseFromServer.lastname }
        localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
        setfirstname(()=>{return responseFromServer.firstname})
        setprofilePhoto(()=>{return responseFromServer.profilePhoto})
        axios.get(customerURI).then((res) => {
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
    <AdminNav firstname = {firstname} profilePhoto={profilePhoto}/>
        <Routes>
            <Route path='/' element={<AdminHome customers={customers} staff={staff} products={products}/>}/>
            <Route path='/customers' element={<CustomerList customers={customers} staff={staff} adminDetail={adminDetail}/>}/>
            <Route path='/addProduct' element={<UploadProducts adminDetail={adminDetail}/>} />
            <Route path='/signup' element={<Adminsignup />}/>
            <Route path='/profile' element={<AdminProfile adminDetail={adminDetail}/>} />
        </Routes>
        <Footage />
    </>
  )
}

export default AdminPage