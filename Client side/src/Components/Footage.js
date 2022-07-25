import React from 'react'
import { FaFacebook, FaGooglePlus, FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Footage() {
    return (
        <footer className="page-footer font-small indigo sticky-bottom">
            <div className="container">
                <hr className="rgba-white-light" />
                <div className="row pb-3">
                    <div className="col-md-12">
                        <div className="mb-3 text-center">
                            <Link to='' className="me-4 textColor">
                                <FaFacebook size='4vh' />
                            </Link>
                            <Link to='' className="me-4 textColor">
                                <FaTwitter size='4vh' />
                            </Link>
                            <Link to='' className="me-4 textColor">
                                <FaLinkedin size='4vh' />
                            </Link>
                            <Link to='' className="me-4 textColor">
                                <FaInstagram size='4vh' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3">© 2022 Copyright:
                <Link to='' href="https://mdbootstrap.com/" className='textColor'> Jfix.com</Link>
            </div>
        </footer>
    )
}

export default Footage