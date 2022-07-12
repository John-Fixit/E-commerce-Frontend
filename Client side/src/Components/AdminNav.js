import React from 'react'
import user from '../Images/user.PNG'
import { Link } from 'react-router-dom'
import { FaCartArrowDown, FaRegUser } from 'react-icons/fa'
import { FaRegBookmark } from 'react-icons/fa'
import { BiCertification } from "react-icons/bi";
import { MdAutorenew } from "react-icons/md";
import style from './style.css'
function AdminNav() {
    const logOut=()=>{

    }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top padding_nav bgs">
        <div className="container-fluid">
            <Link to='' className="navbar-brand fs-2 fw-bold text-light">JFIX <small className='fs-6'>/Admin</small></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5" style={{ marginLeft: '6vh' }}>
                    <li className="nav-item ms-3">
                        <Link to='' className="nav-link active text-light ">Home</Link>
                    </li>
                    <li className="nav-item ms-3">
                        <Link to='' className="nav-link active text-light">About us</Link>
                    </li>
                    {/* <li className="nav-item ms-3">
                        <Link to='' className="nav-link active text-light">Add member</Link>
                    </li> */}
                    <li className="nav-item ms-3">
                        <Link to='/admin/customers' className="nav-link active text-light">Customeer List</Link>
                    </li>
                    <li className="nav-item ms-3">
                        <Link to='/admin/new product' className="nav-link active text-light position-relative"> upload products </Link>
                    </li>


                </ul>
                <form className='ms-4 d-flex'>
                    <input type='text' className='form-control w-100' placeholder='Search product' />
                    <button className='btn btn-outline-light ms-3'>Search</button>
                </form>
                <div className="nav-item dropdown ms-3">
                    <button type="button" className="btn bgs rounded-circle dropdown-toggle" id='navbarDropdown' data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={user} className='card-img-top rounded-circle' style={{ width: '5vh', height: '5vh' }} /><span className='text-light'>Hi, firstname</span>
                    </button>
                    <ul className="dropdown-menu text-light" aria-labelledby="navbarDropdown">
                        <li><Link to="/homepage/profile" className="dropdown-item"><FaRegUser /> Profile</Link></li>
                        <li><Link to="/admin/signup" className="dropdown-item"><FaRegBookmark /> Add member</Link></li>
                        <li><Link to="" className="dropdown-item"><BiCertification /> Settings</Link></li>
                        <li><Link to="" className="dropdown-item"><MdAutorenew /> Switch account</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="btn dropdown-item" onClick={logOut}>Log out</button></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</>
  )
}

export default AdminNav