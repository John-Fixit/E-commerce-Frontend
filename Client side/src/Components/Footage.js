import React from 'react'
import { FaFacebook, FaGooglePlus, FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Footage() {
    return (
        <footer className="page-footer font-small indigo fixed-bottom">
            <div className="container">
                {/* <div className="row text-center d-flex justify-content-center pt-5 mb-3">
                    <div className="col-md-2 mb-3">
                        <h6 className="text-uppercase font-weight-bold">
                            <Link to='' >About us</Link>
                        </h6>
                    </div>
                    <div className="col-md-2 mb-3">
                        <h6 className="text-uppercase font-weight-bold">
                            <Link to='' >Products</Link>
                        </h6>
                    </div>
                    <div className="col-md-2 mb-3">
                        <h6 className="text-uppercase font-weight-bold">
                            <Link to='' >Awards</Link>
                        </h6>
                    </div>
                    <div className="col-md-2 mb-3">
                        <h6 className="text-uppercase font-weight-bold">
                            <Link to='' >Help</Link>
                        </h6>
                    </div>
                    <div className="col-md-2 mb-3">
                        <h6 className="text-uppercase font-weight-bold">
                            <Link to='' >Contact</Link>
                        </h6>
                    </div>
                </div> */}
                <hr className="rgba-white-light" />
                <div className="row pb-3">
                    <div className="col-md-12">
                        <div className="mb-3 text-center">
                            <Link to='' className="me-4">
                                <FaFacebook size='4vh' />
                            </Link>
                            <Link to='' className="me-4">
                                <FaTwitter size='4vh' />
                            </Link>
                            <Link to='' className="me-4">
                                <FaGooglePlus size='4vh' />
                            </Link>
                            <Link to='' className="me-4">
                                <FaLinkedin size='4vh' />
                            </Link>
                            <Link to='' className="me-4">
                                <FaInstagram size='4vh' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3">© 2022 Copyright:
                <Link to='' href="https://mdbootstrap.com/"> Jfix.com</Link>
            </div>
        </footer>
    )
}

export default Footage