import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light px-5">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to='/homepage/home' class="nav-link active">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='' class="nav-link active">About us</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='' class="nav-link active">Products</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='' class="nav-link active">Help</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Contact
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Profile</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" />
                                        <button className='dropdown-ite w-100 py-2 btn btn-danger'>Log out</button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar