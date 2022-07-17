import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaCartArrowDown, FaRegBookmark, FaRegHeart, FaRegUser, FaRegUserCircle, FaUserFriends, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import style from './style.css'
function AdminProfile({ adminDetail }) {
    const profileURI = 'http://localhost:4000/admin/save'
    const PROFILEPHOTOURI = 'http://localhost:4000/admin/uploadProfilePhoto'
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [contact, setcontact] = useState('')
    const [username, setusername] = useState('')
    const [gender, setgender] = useState('')
    const [DOB, setDOB] = useState('')
    const [disable, setdisable] = useState(true)
    const [profilePhoto, setprofilePhoto] = useState('')
    const [adminId, setadminId] = useState('')
    const [convertedFile, setconvertedFile] = useState('')
    const [message, setmessage] = useState('')
    const [status, setstatus] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [admin, setadmin] = useState('')
    useEffect(() => {
        setfirstname(adminDetail.firstname)
        setlastname(adminDetail.lastname)
        setemail(adminDetail.email)
        setcontact(adminDetail.contact)
        setusername(adminDetail.username)
        setadminId(adminDetail._id)
    }, [])
    console.log(admin);
    const editProfile = () => {
        setdisable(false)
    }
    const selectPhoto = (e) => {
        const selectedPhoto = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(selectedPhoto)
        reader.onload = () => {
            setconvertedFile(reader.result)
        }
    }
    const savePhoto = () => {
        axios.post(PROFILEPHOTOURI, { convertedFile, adminId }).then((res) => {
            console.log(res.data);
            setisLoading(false)
            if (res.data.status) {
                window.location.reload()
            } else {
                setmessage(() => { return res.data.message })
                setstatus(() => { return res.data.status })
            }
        })
    }

    const saveProfile = () => {
        const thisAdmin = { adminId, firstname, lastname, email, contact, username }
        axios.post(profileURI, thisAdmin).then((res) => {
            setisLoading(false)
            if (res.data.status) {
                window.location.reload()
            }
            else {
                setmessage(() => { return res.data.message })
                setstatus(() => { return res.data.status })
            }
        })
    }
    return (
        <>
            <div className='container-fluid cont_fluid bg-light pt-2'>
                <div className='container'>
                    <div className='row mt-4'>
                        <div className='col-lg-3 shadow-sm'>
                            <div className='card h-100 p-2'>
                                <Link to='' className='text-decoration-none text-dark'><FaRegUser size='4vh' /> My account</Link>
                                <hr />
                                <Link to='/admin/customers' className='text-decoration-none text-dark'><FaUserFriends size='4vh' /> Customer List</Link>
                                <Link to='/admin/addProduct' className='text-decoration-none text-dark mt-3'><FaCartArrowDown size='4vh' /> Add New Product</Link>
                                <Link to='/admin/signup' className='text-decoration-none text-dark mt-3'><FaRegBookmark size='4vh' /> Add New Staff</Link>
                                <button className='btn btn-outline-danger'>Delete account</button>
                            </div>
                        </div>
                        <div className='col-lg-9 shadow-sm py-5'>
                            <div className='card p-2'>
                                <div className='row col-12'>
                                    <div className='col-sm-8'>
                                        <label htmlFor='' >Upload profile photo(optional)</label>
                                        {isLoading ? '' :
                                            status ? '' : <p className={!disable ? 'alert alert-danger p-0 text-center d-none' : 'alert alert-danger p-0 text-center'}>{message}</p>
                                        }
                                        <input type='file' className='form-control border-0 border-bottom border-dark' placeholder='Upload' onChange={(e) => selectPhoto(e)} />
                                    </div>
                                    <div className='col-sm-4'>
                                        <button className='btn btnbg w-100 text-light py-3' onClick={savePhoto}>Save Profile Picture</button>
                                    </div>
                                </div>
                                <h4 className='card-header'>Details</h4>
                                {isLoading ? '' :
                                    !status ? <p className={disable ? 'alert alert-danger d-none' : 'alert alert-danger'}>{message}</p> : ''
                                }
                                <div className='row mt-3'>
                                    <div className='col-6 form-floating'>
                                        <input type='text' className='form-control border-0 border-bottom border-dark' disabled={disable} placeholder='Firstname' value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                                        <label htmlFor='' >Firstname</label>
                                    </div>
                                    <div className='col-6 form-floating'>
                                        <input type='text' className='form-control border-0 border-bottom border-dark' disabled={disable} placeholder='Lastname' value={lastname} onChange={(e) => setlastname(e.target.value)} />
                                        <label htmlFor='' >Lastname</label>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6 form-floating'>
                                        <input type='email' className='form-control border-0 border-bottom border-dark' disabled={disable} placeholder='email' value={email} onChange={(e) => setemail(e.target.value)} />
                                        <label htmlFor='' >Email Address</label>
                                    </div>
                                    <div className='col-6 form-floating'>
                                        <input type='text' className='form-control border-0 border-bottom border-dark' disabled={disable} placeholder='phone' value={contact} onChange={(e) => setcontact(e.target.value)} />
                                        <label htmlFor='' >Phone Number(optional)</label>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6 form-floating'>
                                        <select className='form-control border-0 border-bottom border-dark' disabled={disable}>
                                            <option >Please select</option>
                                            <option >Male</option>
                                            <option >Female</option>
                                        </select>
                                        <label htmlFor='' >Gender(optional)</label>
                                    </div>
                                    <div className='col-6 form-floating'>
                                        <input type='date' className='form-control border-0 border-bottom border-dark' disabled={disable} placeholder='phone' />
                                        <label htmlFor='' >Birthdate(optional)</label>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6 form-floating'>
                                        <input type='text' className='form-control border-0 border-bottom border-dark' disabled={disable} value={username} placeholder='username' onChange={(e) => setusername(e.target.value)} />
                                        <label htmlFor='' >Username(optional)</label>
                                    </div>

                                </div>
                                <div className='row shadow mt-4 btn-group pb-3'>
                                    <div className='col-6'>
                                        <button className='btn btn-success w-100' onClick={editProfile}>EDIT</button>
                                    </div>
                                    <div className='col-6 bgs rounded'>
                                        <button className='border-0 pt-2 w-100 bgs text-light' disabled={disable} onClick={saveProfile}>SAVE</button>
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

export default AdminProfile