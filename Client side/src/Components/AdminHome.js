import axios from 'axios'
import React, { useEffect } from 'react'
import style from './style.css'
import { useNavigate } from 'react-router-dom'
import { FaCartPlus, FaProductHunt, FaUserAlt, FaUserAstronaut } from 'react-icons/fa'
function AdminHome() {
  const getHomeURI = 'http://localhost:4000/admin/home'
  const navigate = useNavigate()
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
    }).then((res)=>{
      const responseFromServer = res.data.thisadmin
      if(res.data.status){
        const adminInfo = {_id: responseFromServer._id, email: responseFromServer.email, firstname: responseFromServer.firstname, lastname: responseFromServer.lastname}
        localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
      }else{
        localStorage.removeItem('admintoken')
        localStorage.removeItem('adminInfo')
        navigate('/admin_login')
      }
    })
  }
  return (
    <>
      <div className='container-fluid cont_fluid px-5'>
      <marquee behavior="infinite" direction="alternate" className=''>Purchase and Add your favourite product to your cart</marquee>
        <div className='col-sm-12 products_row'>
          <div className='row'>
            <div className='col-lg-4 col-sm-12 mt-3'>
              <div className='card shadow h-100 btnbg rounded p-3 text-white'>
                <FaUserAstronaut size='4vh' className='mx-auto'/>
                <h3 className='card-title'>No of Staffs : <span className='small_text'>total of Staff</span></h3>
                <div class="progress mt-3">
                  <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style={{width: '25%'}}>25%</div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-sm-12 mt-3'>
              <div className='card text-center shadow h-100 p-3'>
              <FaUserAlt size='4vh' className='mx-auto'/>
                <h3 className='card-title'>No of Customers : <span className='small_text'>total of Staff</span></h3>
                <div class="progress mt-3">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: '25%', backgroundColor: '#FF5722'}} >25%</div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-sm-12 mt-3 '>
              <div className='card shadow h-100 p-3 text-white btnbg opacity-75'>
              <FaCartPlus size='4vh' className='mx-auto'/>
                <h3 className='card-title'>Total Products : <span className='small_text'>total of Staff</span></h3>
                <div class="progress mt-3">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: '25%'}} >25%</div>
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