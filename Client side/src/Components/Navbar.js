import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaRegUser } from 'react-icons/fa'
import { FaFacebookMessenger } from 'react-icons/fa'
import { FaRegPlusSquare } from 'react-icons/fa'
import { FaCompass } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { FaRegBookmark } from 'react-icons/fa'
import { BiCertification } from "react-icons/bi";
import { MdAutorenew } from "react-icons/md";
import style from './style.css'
import userProfile from '../Images/user.PNG'
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const navigate = useNavigate()
    const [profilePicture, setprofilePicture] = useState('')
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    useEffect(() => {
        setprofilePicture(userDetails.profilePicture)
    }, [])
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userDetails')
        navigate('/signin')
    }
    return (
        <>
            <div className='container-fluid border doc_body fixed-top' style={{ backgroundColor: 'white' }}>
                <div className='container'>
                    <div className='d-flex justify-content-space-evenly text-center gen_nav'>
                        <div className='col-md-4 col-sm-6'>
                            {/* <Link to='/home' ><img src={userProfile} className='mt-2 card-img-top w-25' /></Link> */}
                        </div>
                        <div className='col-md-4 search col-sm-d-none'>
                            <input type='search' placeholder='search' className='form-control bg-light' />
                        </div>
                        <div className='col-md-4 col-sm-6 '>
                            <div className='d-flex justify-content-space-evenly pages_icons ps-5 mt-2'>
                                <div className='col-2'>
                                    <Link to='/homepage' id='nav_bar' ><FaHome size='3.5vh' className='text-dark' /></Link>
                                </div>
                                <div className='col-2'>
                                    <Link to='/message' id='nav_bar' ><FaFacebookMessenger className='text-dark' size='3.5vh' /></Link>
                                </div>
                                <div className='col-2'>
                                    <Link to='/post' id='nav_bar' ><FaRegPlusSquare className='text-dark' size='3.5vh' /></Link>
                                    {/* <button type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <FaRegPlusSquare className='text-dark' size='3.5vh' />
                                    </button>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    ...
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className='col-2'>
                                    <Link to='/explore' id='nav_bar' ><FaCompass size='3.5vh' className='text-dark' /></Link>
                                </div>
                                <div className='col-2'>
                                    <Link to='/follow' id='nav_bar' ><FaRegHeart size='3.5vh' className='text-dark' /></Link>
                                </div>
                                <div className='col-2'>
                                    <div className="btn-group">
                                        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={profilePicture} className='card-img-top rounded-circle' style={{ width: '5vh', height: '5vh' }} />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link to="/profile" className="dropdown-item"><FaRegUser /> Profile</Link></li>
                                            <li><Link to="" className="dropdown-item"><FaRegBookmark /> Saved</Link></li>
                                            <li><Link to="" className="dropdown-item"><BiCertification /> Settings</Link></li>
                                            <li><Link to="" className="dropdown-item"><MdAutorenew /> Switch account</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><button className="btn dropdown-item" onClick={logOut}>Log out</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar