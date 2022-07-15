import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './style.css'
import { useNavigate } from 'react-router-dom'
import { FaCartPlus, FaProductHunt, FaUserAlt, FaUserAstronaut } from 'react-icons/fa'
function AdminHome({customers, staff, products}) {
  // const getHomeURI = 'http://localhost:4000/admin/home'
  // const customerURI = 'http://localhost:4000/admin/customers'
  // const navigate = useNavigate()
  // const [customers, setcustomers] = useState('')
  // const [staff, setstaff] = useState('')
  // const [products, setproducts] = useState('')
  // useEffect(() => {
  //   authorizeUser()
  // }, [])
  // const authorizeUser = () => {
  //   const admintoken = JSON.parse(localStorage.getItem('admintoken'))
  //   axios.get(getHomeURI, {
  //     headers: {
  //       'Authorization': `Bearer ${admintoken}`,
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   }).then((res) => {
  //     const responseFromServer = res.data.thisadmin
  //     if (res.data.status) {
  //       const adminInfo = { _id: responseFromServer._id, email: responseFromServer.email, firstname: responseFromServer.firstname, lastname: responseFromServer.lastname }
  //       localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
  //       axios.get(customerURI).then((res) => {
  //         if(res.data.status){
  //           setcustomers (()=>{return res.data.customers.length})
  //           setstaff (()=>{return res.data.admins.length})
  //           // setproducts (()=>{return res.data.products.length})
  //         }
  //         else{
  //           setcustomers('0')
  //         }
  //       })

  //     } else {
  //       localStorage.removeItem('admintoken')
  //       localStorage.removeItem('adminInfo')
  //       navigate('/admin_login')
  //     }
  //   })
  // }
  return (
    <>
      <div className='container-fluid cont_fluid px-5'>
        <marquee behavior="infinite" direction="alternate" className=''>Purchase and Add your favourite product to your cart</marquee>
        <div className='col-sm-12 products_row'>
          <div className='row'>
            <div className='col-lg-4 col-sm-12 mt-3'>
              <div className='card shadow h-100 btnbg rounded p-3 text-white'>
                <FaUserAstronaut size='4vh' className='mx-auto' />
                <h3 className='card-title'>Staffs : <span className='small_tex'>{staff.length}</span></h3>
                <div className="progress mt-3">
                  <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger ps-1 pe-3" role="progressbar" style={{ width: `${staff.length}%` }}>{staff.length}%</div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-sm-12 mt-3'>
              <div className='card shadow h-100 p-3'>
                <FaUserAlt size='4vh' className='mx-auto' />
                <h3 className='card-title'>Customers : <span className='small_tex'>{customers.length}</span></h3>
                <div className="progress mt-3">
                  <div className="progress-bar progress-bar-striped progress-bar-animated ps-1 pe-3" role="progressbar" style={{ width: `${customers.length}%`, backgroundColor: '#FF5722' }} >{customers.length}%</div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-sm-12 mt-3 '>
              <div className='card shadow h-100 p-3 text-white btnbg opacity-75'>
                <FaCartPlus size='4vh' className='mx-auto' />
                <h3 className='card-title'>Total Products : <span className='small_tex'>{products.length}</span></h3>
                <div className="progress mt-3">
                  <div className="progress-bar progress-bar-striped progress-bar-animated ps-1 pe-3" role="progressbar" style={{ width: `${products.length}%` }} >{products.length} %</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome