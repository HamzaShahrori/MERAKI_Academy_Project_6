import React, { useState, useEffect } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { CDBFooter } from 'cdbreact';
// import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer } from 'cdbreact';
import { useNavigate } from "react-router-dom";
import { setHallsHasDiscount } from "../../reducer/halls/index";
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
const Home = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      hallsWithDiscount: state.hallsReducer.hallsWithDiscount,
    };
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllHallsHasDiscount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/halls/page/Home?page=1`,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      );

      if (res.data.success) {
        dispatch(setHallsHasDiscount(res.data.result));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllHallsHasDiscount();
  });

  return (
    <>
      <div className="containerHero">
        <div className="contentHero">
          <h1>
            Book now at the
            <br /> lowest price
          </h1>
          <div className="btuHeroBook">
            <Link to="/all">
              <button>Booking Now</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="cover-discount">
        <div className="cover">
          <div className="logoMarriage">
            <img src="./image/57.png" />
          </div>

          <div className="contentDiscount">
            <span>Discounts on booking upto</span>
            <h3>90% off</h3>
            {/* <p>offers ends after 5 days</p> */}
            <Link to="/discounts" className="btnDiscount">
              Book now{" "}
            </Link>
          </div>
          <div className="wowDiscount">
            <img src="./image/w.png" />
          </div>
        </div>
      </div>

      <div className="containerVideo">
        <h1>It is recommended by users</h1>
        <div className="rowVideo">
          {state.hallsWithDiscount &&
            state.hallsWithDiscount.slice(0, 1).map((element, i) => (
              <>
                {" "}
                <div className="colVideo">
                  <div className="Big-img">
                    <img src={element.hall_image} width="100%" />
                    <img src="./image/play.png" className="btnPlay" />
                  </div>
                </div>
              </>
            ))}

            

          <div className="colVideo">
            {state.hallsWithDiscount &&
              state.hallsWithDiscount.slice(1, 4).map((element, i) => (
                <>
                  {" "}
                  <div className="Small-img-row">
                    <div className="small-img">
                      <img src={element.hall_image} />
                      <img
                        src="./image/play.png"
                        type="button"
                        className="btn btn-primary btnPlay"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@getbootstrap"
                      />
                    </div>
                    <p>{element.hall_description}</p>
                  </div>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-headera">
                          <div className="video-player" id="videoPlayer">
                            <video width="100%" controls autoPlay id="video">
                              <source src={element.video} type="video/mp4" />
                            </video>
                            <img src="./image/play.png" className="btnClose" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
      <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase"> Happy Wedding</h5>
                <p>Amman / Gardens / Building No. 20</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Important Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">About</a></li>
                    <li><a href="#!">Services</a></li>
                   
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Connect with us</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">+765-85656525125</a></li>
                    <li><a href="#!">Facebook</a></li>
                   
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2022 Copyright:
        <a href="https://mdbootstrap.com/"> CodeWarriors
</a>
    </div>

</footer>
      {/* 


  <script>


  </script> */}
    </>
  );
};

export default Home;
