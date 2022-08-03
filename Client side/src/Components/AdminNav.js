import React from 'react'
import user from '../Images/user.PNG'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { FaRegBookmark } from 'react-icons/fa'
import { BiCertification } from "react-icons/bi";
import style from './style.css'
function AdminNav({ firstname, profilePhoto }) {
    const navigate = useNavigate()
    const logOut = () => {
        if (window.confirm(`Are you sure to log out ?`)) {
            localStorage.removeItem('admintoken')
            localStorage.removeItem('adminInfo')
            navigate('/admin_login')
        }
       
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top padding_nav bgs">
                <div className="container-fluid">
                    <Link to='' className="navbar-brand fs-2 fw-bold text-light">JFIX /<small className='small_text'>Admin</small></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5" style={{ marginLeft: '6vh' }}>
                            <li className="nav-item ms-3">
                                <Link to='/admin' className="nav-link active text-light ">Home</Link>
                            </li>
                            <li className="nav-item ms-3">
                                <Link to='/admin/customers' className="nav-link active text-light">Customer List</Link>
                            </li>
                            <li className="nav-item ms-3">
                                <Link to='/admin/addProduct' className="nav-link active text-light position-relative"> upload products </Link>
                            </li>
                        </ul>
                        <form className='ms-4 d-flex'>
                            <input type='text' className='form-control w-100' placeholder='Search product' />
                            <button className='btn btn-outline-light ms-3'>Search</button>
                        </form>
                        <div className="nav-item dropdown ms-3">
                            <button type="button" className="border-0 bgs dropdown-toggle text-light" id='navbarDropdown' data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={ profilePhoto == '' ? user : profilePhoto} className='card-img-top rounded-circle' style={{ width: '7vh', height: '7vh' }} /><span className='text-light'> Hi, {firstname}</span>
                            </button>
                            <ul className="dropdown-menu text-light" aria-labelledby="navbarDropdown">
                                <li><Link to="/admin/profile" className="dropdown-item list"><FaRegUser /> Profile</Link></li>
                                <li><Link to="/admin/signup" className="dropdown-item list"><FaRegBookmark /> Add New Staff</Link></li>
                                <li><Link to="" className="dropdown-item list"><BiCertification /> Settings</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="btn dropdown-item list" onClick={logOut}>Log out</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AdminNav