import React from 'react'
import { Link } from 'react-router-dom'
function LandingNav() {
  return (
    <>
         <nav className="navbar navbar-expand-lg navbar-light fixed-top padding_nav bgs">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand fs-2 fw-bold text-light">JFIX</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5" style={{ marginLeft: '6vh' }}>
                            <li className="nav-item ms-5">
                                <Link to='/' className="nav-link active text-light ">Home</Link>
                            </li>
                            <li className="nav-item ms-5">
                                <Link to='/about' className="nav-link active text-light">About us</Link>
                            </li>
                            <li className="nav-item ms-5">
                                <Link to='/contact' className="nav-link active text-light">Contact</Link>
                            </li>
                        </ul>
                        <form className='ms-4 d-flex'>
                            <Link to='/signin' className=' text-decoration-none'><button className='btn btn-light textColor fw-bold' > Log In </button></Link>
                            <Link to='/signup' className=' text-decoration-none'><button className='btn btn-outline-light ms-3 fw-bold'>Create account</button></Link>
                        </form>
                    </div>
                </div>
            </nav>
    </>
  )
}

export default LandingNav