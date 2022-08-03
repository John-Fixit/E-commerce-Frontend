import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa'
function Footage() {
    return (
        <footer className="page-footer font-small sticky-bottom">
            <div className="container">
                <hr className="rgba-white-light" />
                <div className="row pb-2">
                    <div className="col-md-12">
                        <div className="mb-2 text-center">
                            <a href='https://www.facebook.com/adeoye.johnoluwakayode' className="me-4 textColor">
                                <FaFacebook size='4vh' />
                            </a>
                            <a href='https://github.com/john-Fixit' className="me-4 textColor">
                                <FaTwitter size='4vh' />
                            </a>
                            <a href='https://github.com/john-Fixit' className="me-4 textColor">
                                <FaLinkedin size='4vh' />
                            </a>
                            <a href='https://github.com/john-Fixit' className="me-4 textColor">
                                <FaGithub size='4vh' />
                            </a>
                            <a href='https://www.instagram.com/john_fixit/' className="me-4 textColor">
                                <FaInstagram size='4vh' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3">© 2022 Copyright:
                <a href="https://github.com/john-Fixit" className='textColor'> Jfix.com</a>
            </div>
        </footer>
    )
}

export default Footage