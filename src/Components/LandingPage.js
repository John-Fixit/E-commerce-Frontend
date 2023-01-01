import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.css";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import AdSense from 'react-adsense'
import { baseUrl } from "../Utils/BaseUrl";
function LandingPage() {
  const navigate = useNavigate();
  const productURI = `${baseUrl}/user/products`;
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [pageNumber, setpageNumber] = useState(0);
  const [title, settitle] = useState("");
  const productPerPage = 12;
  const productVisited = pageNumber * productPerPage;
  const countPage = Math.ceil(products.length / productPerPage);
  useEffect(() => {
    axios.get(productURI).then((res) => {
      setisLoading(false);
      if (res.data.status) {
        setproducts(() => {
          return res.data.result;
        });
      }
    });
  }, []);
  const modalOut = (title) => {
    settitle(() => {
      return title;
    });
  };
  const signup = () => {
    navigate("/signup");
  };
  const query = useSelector((state) => state.query);
  const productFiltered = products.filter((item) => item.title.includes(query));
  const displayProducts = productFiltered
    .slice(productVisited, productVisited + productPerPage)
    .map((eachProduct, index) => (
      <div className="col-lg-3 col-md-6 col-sm-12 mt-3" key={index}>
        <div className="card shadow p-2 h-100">
          <img src={eachProduct.image} className="card-img-top mx-auto" />
          <div className="card-body">
            <h6 className="card-title text-start">{eachProduct.title}</h6>
            <p className="rate">RATE: {eachProduct.rating}</p>
            <p className="card-text text-start">
              Price : ₦{eachProduct.price} <span>per product</span>
            </p>
          </div>
          <div className="card-footer">
            <button
              type="button"
              className="btn text-light w-100 pBtn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => modalOut(eachProduct.title)}
            >
              {" "}
              Add To Cart <FaCartPlus size="4vh" className="float-cente textColor" />
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Select Quantity variation
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row justify-content-between">
                      <div className="col-sm-6">
                        <p className="card-text">
                          Please sign up to be able to preceed with this action
                          and add <b> {title} </b> to your cart!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer btn-group shadow">
                    <button
                      className="btn btnbg text-light"
                      data-bs-dismiss="modal"
                      onClick={signup}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  const changePage = ({ selected }) => {
    setpageNumber(selected);
  };

  return (
    <>
      
      <div className="container-fluid cont_fluid">
        <h3 className="card-header rounded border-0 btnbg mb-2 text-light">
          {" "}
          <marquee
            behavior="infinite"
            direction="alternate"
            className="btnbg text-light macque"
          >
            Welcome to JFIX e-commerce site.
          </marquee>
        </h3>
        <div className="products_row">
          <div className="landingpageText">
            <p className="card-body col-lg-7 col-md-12 fw-bold">
              Get your product online, it's fast and good to use. With this
              simple store site, you can purchase products of your choice. We
              offer good and quality product.
              <Link to="/signup" className="card-title text-decoration-none">
                Click Here to Get Started
              </Link>{" "}
              and Enjoy us
            </p>
          </div>
        </div>
        <div className="col-sm-12 products_row">
          <marquee
            behavior="infinite"
            direction="alternate"
            className="btnbg text-light macque"
          >
            Create an account to access your mainboard at JFIX e-commerce site
          </marquee>
          <div className="row">
            <p className="card-header text-center text-muted fs-4">
              All Products Available
            </p>
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="row">
                {displayProducts}
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={countPage}
                  onPageChange={changePage}
                  containerClassName={"paginationBtns"}
                  activeClassName={"paginationActive"}
                />
              </div>
            )}
          </div>
        </div>
        <Link to="/signup" className="btn mt-3 btnbg text-white py-2 px-4">
          Get Started{" "}
        </Link>
      </div>
    </>
  );
}

export default LandingPage;
