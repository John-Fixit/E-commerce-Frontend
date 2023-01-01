import React from 'react'
import { Link } from 'react-router-dom'


function About() {
    return (
        <>
            <div className='col-12 cont_fluid'>
                <h2 className='btnbg text-center text-light py-2'>About Us</h2>
                <div className='col-lg-6 col-sm-12 col-md-7 ms-auto p-3'>
                    <p className=''>I am John Adeoye by name, (A.K.A JohnFixit), a student of SQI College of ICT. Studying Software Enginneer. I am now a full stack developer.</p>
                    <h4>Have good experience on:</h4>
                    <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>Bootstrap</li>
                        <li>Javascript</li>
                        <li>Firebase</li>
                        <li>React</li>
                        <li>Nodejs</li>
                    </ul>
                    <Link to='/contact' className="text-decoration-none btn btnbg text-light fw-bold mt-2">Get in Touch</Link>
                </div>
                <div className="col-12 p-3 text-justify-end">
                    Lorem ipsum <span className='textColor'>Johnfixit</span>, dolor sit amet consectetur adipisicing elit. Beatae assumenda ut saepe nulla? Nostrum odio, adipisci maiores, ipsam quae architecto, molestias sunt voluptatibus temporibus velit saepe. <span className='btnbg px-2 text-light'> Asperiores repudiandae vel quis.</span>  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae assumenda ut saepe nulla? Nostrum odio, adipisci maiores, ipsam quae architecto, molestias sunt voluptatibus temporibus velit saepe. Asperiores repudiandae vel quis.  Lorem ipsum,<span className='textColor'> dolor sit amet consectetur adipisicing elit.</span> Beatae assumenda ut saepe nulla? Nostrum odio, adipisci maiores, ipsam quae architecto, molestias sunt voluptatibus temporibus velit saepe. Asperiores repudiandae vel quis.  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae assumenda ut saepe nulla? Nostrum odio, adipisci maiores, ipsam quae architecto, molestias sunt voluptatibus temporibus velit saepe. Asperiores repudiandae vel quis.
                </div>
            </div>
        </>
    )
}

export default About