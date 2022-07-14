import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaRegHeart, FaRegUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import style from './style.css'

function Profile() {
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [contact, setcontact] = useState('')
    const [username, setusername] = useState('')
    const [gender, setgender] = useState('')
    const [DOB, setDOB] = useState('')
    const [disable, setdisable] = useState(true)
    const [profilePhoto, setprofilePhoto] = useState('')
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const SAVEPROFILEURI = 'http://localhost:4000/user/save'
    const GETUSERURI = 'http://localhost:4000/user/thisuser'
    let userId
    if (localStorage.userDetails) {
         userId = userDetails._id
    }
    useEffect(() => {
        getUser()
    }, [])
    const getUser = () => {
        axios.post(GETUSERURI, {userId}).then((res)=>{
            const thisUser = res.data.user
            setfirstname(()=>{return thisUser.firstname})
            setlastname(()=>{return thisUser.lastname})
            setemail(()=>{return thisUser.email})
            setcontact(()=>{return thisUser.contact})
            setusername(()=>{return thisUser.username})
        })
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
        }
    }
    const saveProfile = () => {
        const userDetails = { firstname, lastname, email, contact, profilePhoto }
        axios.post(SAVEPROFILEURI, userDetails)
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
                            </div>
                        </div>
                        <div className='col-lg-9 shadow-sm py-5'>
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
                                        <input type='text' className='form-control border-0 border-bottom border-dark' disabled={disable} value={username} placeholder='username' onChange={(e) => selectPhoto(e)} />
                                        <label htmlFor='' >Username(optional)</label>
                                    </div>
                                    <div className='col-6 form-floating'>
                                        <input type='file' className='form-control border-0 border-bottom border-dark' disabled={disable} placeholder='Upload' onChange={(e) => selectPhoto(e)} />
                                        <label htmlFor='' >Upload profile photo(optional)</label>
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

export default Profile