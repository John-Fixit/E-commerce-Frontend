import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaRegHeart, FaRegUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import style from './style.css'

function Profile() {
    const navigate = useNavigate()
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [contact, setcontact] = useState('')
    const [status, setstatus] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [message, setmessage] = useState('')
    const [username, setusername] = useState('')
    const [gender, setgender] = useState('')
    const [dispp, setdispp] = useState(true)
    const [disable, setdisable] = useState(true)
    const [disBtn, setdisBtn] = useState(true)
    const [isGoing, setisGoing] = useState(false)
    const [isComing, setisComing] = useState(false)
    const [understand, setunderstand] = useState(false)
    const [profilePhoto, setprofilePhoto] = useState('')
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const SAVEPROFILEURI = 'https://jfix-e-commerce-site.herokuapp.com/user/save'
    const UPLOADURI = 'https://jfix-e-commerce-site.herokuapp.com/user/uploadProfilePhoto'
    const GETUSERURI = 'https://jfix-e-commerce-site.herokuapp.com/user/thisuser'
    const deleteAccURI = 'https://jfix-e-commerce-site.herokuapp.com/user/deleteAccount'
    let userId
    if (localStorage.userDetails) {
        userId = userDetails._id
    }
    useEffect(() => {
        getUser()
    }, [])
    const getUser = () => {
        axios.post(GETUSERURI, { userId }).then((res) => {
            const thisUser = res.data.user
            setfirstname(() => { return thisUser.firstname })
            setlastname(() => { return thisUser.lastname })
            setemail(() => { return thisUser.email })
            setcontact(() => { return thisUser.contact })
            setusername(() => { return thisUser.username })
            setgender(() => { return thisUser.gender })
        })
    }

    const options = [gender, 'female', 'male']
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
            setprofilePhoto(() => { return reader.result })
            setdispp(false)
        }
    }
    const savePhoto = () => {
        axios.post(UPLOADURI, { profilePhoto, userId }).then((res) => {
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
        const userDetails = { userId, firstname, lastname, email, contact, gender }
        setisComing(true)
        axios.post(SAVEPROFILEURI, userDetails).then((res) => {
            setisComing(false)
            if (res.data.status) {
                window.location.reload()
            }
        })
    }
    const tama = () => {
        setdisBtn(false)
        setunderstand(true)
    }
    const closeModal = () => {
        setisGoing(false)
        setunderstand(false)
    }
    const deleteAccount = () => {
        setisGoing(true)
        axios.post(deleteAccURI, { email }).then((res) => {
            setisGoing(false)
            if (res.data.status) {
                navigate('/signin')
            }
            else {
                alert(res.data.message);
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
                                <Link to='' className='text-decoration-none text-dark'><FaRegHeart size='4vh' /> Saved Items</Link>
                                <button className='rounded mt-3 btn-outline-danger col-9' data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-back-drop='false'>Delete account</button>
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
                                                <button type="button" className="btn btnbg  text-light" data-bs-dismiss="modal" disabled={disBtn} onClick={deleteAccount}>{isGoing ? <div className="spinner-border text-light opacity-50" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : 'Proceed and Delete'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-9 shadow-sm py-5'>
                            <div className='row col-12'>
                                <div className='col-sm-8'>
                                    <label htmlFor='' >Upload profile photo(optional)</label>
                                    {isLoading ? '' :
                                        status ? '' : <p className={!disable ? 'alert alert-danger p-0 text-center d-none' : 'alert alert-danger p-0 text-center'}>{message}</p>
                                    }
                                    <input type='file' className='form-control border-0 border-bottom border-dark' placeholder='Upload' onChange={(e) => selectPhoto(e)} />
                                </div>
                                <div className='col-sm-4'>
                                    <button className='btn btnbg w-100 text-light py-3' onClick={savePhoto} disabled={dispp}>Save Profile Picture</button>
                                </div>
                            </div>
                            <div className='card h-100 p-2'>
                                <h4 className='card-header'>Details</h4>
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

                                <div className='row shadow mt-4 btn-group pb-3'>
                                    <div className='col-6'>
                                        <button className='btn btn-success w-100' onClick={editProfile}>EDIT</button>
                                    </div>
                                    <div className='col-6 bgs rounded'>
                                        <button className='border-0 pt-2 w-100 bgs text-light' disabled={disable} onClick={saveProfile}>{isComing ? <div className="spinner-border text-light opacity-50" role="status">
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

export default Profile