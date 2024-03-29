import axios, { Axios } from 'axios'
import React, { useState, useEffect } from 'react'
import { FaCartArrowDown, FaRegBookmark, FaRegUser, FaUserFriends } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import user from '../Images/user.PNG'
import { baseUrl } from '../Utils/BaseUrl'
import style from './style.css'
function AdminProfile({ adminDetail }) {
    const profileURI = `${baseUrl}/admin/save`
    const PROFILEPHOTOURI = `${baseUrl}/admin/uploadProfilePhoto`
    const deleteAccURI = `${baseUrl}/admin/deleteAccount`
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [contact, setcontact] = useState('')
    const [username, setusername] = useState('')
    const [gender, setgender] = useState('')
    const [disable, setdisable] = useState(true)
    const [dispp, setdispp] = useState(true)
    const [adminId, setadminId] = useState('')
    const [convertedFile, setconvertedFile] = useState('')
    const [message, setmessage] = useState('')
    const [status, setstatus] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [isGoing, setisGoing] = useState(false)
    const [isSaving, setisSaving] = useState(false)
    const [isSavingPicture, setisSavingPicture] = useState(false)
    const [disBtn, setdisBtn] = useState(true)
    const [understand, setunderstand] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setfirstname(adminDetail.firstname)
        setlastname(adminDetail.lastname)
        setemail(adminDetail.email)
        setcontact(adminDetail.contact)
        setusername(adminDetail.username)
        setadminId(adminDetail._id)
        setgender(adminDetail.gender)
    }, [])
    const options = [gender, 'male', 'female']
    const handleChange = (e) => {
            setgender(e.target.value)
    }
    const editProfile = () => {
        setdisable(false)
    }
    const selectPhoto = (e) => {
        const selectedPhoto = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(selectedPhoto)
        reader.onload = () => {
            setdispp(false)
            setconvertedFile(reader.result)
        }
    }
    const savePhoto = () => {
        setisSavingPicture(true)
        axios.post(PROFILEPHOTOURI, { convertedFile, adminId }).then((res) => {
            setisSavingPicture(false)
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
        setisSaving(true)
        const thisAdmin = { adminId, firstname, lastname, email, contact, username }
        axios.post(profileURI, thisAdmin).then((res) => {
            setisSaving(false)
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
    const closeModal = () => {
        setisGoing(false)
        setunderstand(false)
    }
    const deleteAccount = () => {
        setisGoing(true)
        axios.post(deleteAccURI, { adminId }).then((res) => {
            setisGoing(false)
            if (res.data.status) {
                navigate('/admin_login')
            }
            else {
                alert(res.send.message)
            }
        })
    }

    const tama = () => {
        setdisBtn(false)
        setunderstand(true)
    }
    return (
        <>
            <div className='container-fluid cont_fluid bg-light pt-2'>
                <div className='container'>
                    <div className='row mt-4'>
                        <div className='col-lg-3 shadow-sm'>
                            <div className='card h-100 p-2'>
                                <Link to='' className='text-decoration-none text-dark list'><FaRegUser size='4vh' /> My account</Link>
                                <hr />
                                <Link to='/admin/customers' className='text-decoration-none text-dark list'><FaUserFriends size='4vh' /> Customer & Staff List</Link>
                                <Link to='/admin/addProduct' className='text-decoration-none text-dark list mt-3'><FaCartArrowDown size='4vh' /> Add New Product</Link>
                                <Link to='/admin/signup' className='text-decoration-none text-dark list mt-3'><FaRegBookmark size='4vh' /> Add New Staff</Link>
                                <button className='rounded col-9 mt-3 btn-outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal" data-backdrop="false">Delete account</button>

                                <div className="modal fade" id="exampleModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h6 className="modal-title mx-auto text-danger" id="exampleModalLabel">WARNING! WARNING!! WARNING!!!</h6>
                                            </div>
                                            <div className="modal-body">
                                                <p className='text-danger'><b >Notice : </b>If you <b>proceed</b> this aspect, this account will be permanently deleted from JFIX e-commerce site. And all your data will be also be discarded here!</p>
                                            </div>
                                            <div className='col-4 ms-3'>
                                                <button className='btn btn-warning' onClick={tama} disabled={understand}>I understand you</button>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                                                <button type="button" className="btn btnbg text-light" data-bs-dismiss="modal" disabled={disBtn} onClick={deleteAccount}>{isGoing ? <div className="spinner-border text-light opacity-50" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : 'Proceed and Delete'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-9 shadow-sm py-3'>
                        <img src={ adminDetail.profilePhoto == '' ? user : adminDetail.profilePhoto} className='card-img-top rounded-circle' style={{ width: '12vh', height: '12vh' }} /><span className='text-light'>Hi, {firstname}</span>
                            <div className='row col-sm-12'>
                                <div className='col-sm-8'>
                                    <label htmlFor='' >profile photo</label>
                                    {isLoading ? '' :
                                        status ? '' : <p className={!disable ? 'alert alert-danger p-0 text-center d-none' : 'alert alert-danger p-0 text-center'}>{message}</p>
                                    }
                                    <input type='file' className='form-control border-0 border-bottom border-dark' placeholder='Upload' onChange={(e) => selectPhoto(e)} />
                                </div>
                                <div className='col-sm-4'>
                                    <button className='btn btnbg w-100 text-light py-3' onClick={savePhoto} disabled={dispp}>{isSavingPicture ? <div className="spinner-border text-light opacity-50" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : 'Save Profile Picture'}</button>
                                </div>
                            </div>
                            <div className='card border-0 p-2'>
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
                                        <input type='email' className='form-control border-0 border-bottom border-dark' disabled={true} placeholder='email' value={email} onChange={(e) => setemail(e.target.value)} />
                                        <label htmlFor='' >Email Address : <span className='text-muted'>This field can not be edited for now</span></label>
                                    </div>
                                    <div className='col-6 form-floating'>
                                        <input type='text' className='form-control border-0 border-bottom border-dark' disabled={disable} placeholder='phone' value={contact} onChange={(e) => setcontact(e.target.value)} />
                                        <label htmlFor='' >Phone Number(optional)</label>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6 form-floating'>
                                    <select className='form-control border-0 border-bottom border-dark' defaultValue={gender} disabled={disable} onChange={handleChange}>
                                            {
                                                options.map((option) => (
                                                    <option value={option}>{option}</option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor='' >Gender(optional)</label>
                                    </div>
                                    <div className='col-6 form-floating'>
                                        <input type='text' className='form-control border-0 border-bottom border-dark' disabled={disable} value={username} placeholder='username' onChange={(e) => setusername(e.target.value)} />
                                        <label htmlFor='' >Username(optional)</label>
                                    </div>
                                </div>
                                <div className='row mt-3'>

                                </div>
                                <div className='row shadow mt-4 btn-group pb-3'>
                                    <div className='col-6'>
                                        <button className='btn btn-success w-100' onClick={editProfile}>EDIT</button>
                                    </div>
                                    <div className='col-6 bgs rounded'>
                                        <button className='border-0 pt-2 w-100 bgs text-light' disabled={disable} onClick={saveProfile}>{isSaving ? <div className="spinner-border text-light opacity-50" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : 'SAVE'}</button>
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