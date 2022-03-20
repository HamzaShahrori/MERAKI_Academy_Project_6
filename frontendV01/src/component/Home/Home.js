import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { GrFacebook } from "react-icons/gr";
import { AiFillLinkedin } from "react-icons/ai";
import { FaTwitterSquare } from "react-icons/fa";
import { BsInstagram, BsSnapchat } from "react-icons/bs";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { setHallsHasDiscount } from "../../reducer/halls/index";
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
            <span>Discounts on booking up to</span>
            <h3>90% off</h3>
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
        <h1>Categorized By Rating</h1>
        <div className="rowVideo">
          {state.hallsWithDiscount &&
            state.hallsWithDiscount.slice(0, 1).map((element, i) => (
              <>
                {" "}
                <div className="colVideo">
                  <div className="Big-img">
                    <img src={element.hall_image} width="100%" />
                    {/* <img src="./image/play.png" className="btnPlay" /> */}
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
                      {/* <img
                        // src="./image/play.png"
                        type="button"
                        className="btn btn-primary btnPlay"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@getbootstrap"
                      /> */}
                    </div>
                    <p>{element.hall_name}</p>
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
                            {/* <video width="100%" controls autoPlay id="video">
                              <source src={element.video} type="video/mp4" />

                            </video>
                            {/* <img src="./image/play.png" className="btnClose" /> */}

                            {/* </video> */} 
                            
                           
                          
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
              <h5 className="text-uppercase"> Location</h5>
              <p className="p">Amman - Gardens - Building No. 20</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Around The Web</h5>
              <ul className="socialsFooter">
                <li>
                  <a>
                    <GrFacebook className="icon1"></GrFacebook>
                  </a>

                  <a>
                    <BsInstagram className="icon2"></BsInstagram>
                  </a>

                  <a>
                    <AiFillLinkedin className="icon3"></AiFillLinkedin>
                  </a>

                  <a>
                    <BsSnapchat className="icon4"></BsSnapchat>
                  </a>

                  <a>
                    <FaTwitterSquare className="icon5"></FaTwitterSquare>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Any Question</h5>
              <input
                placeholder="Question"
                style={{
                  padding: "5px",
                  transform: "translate(0.2em,0em)",
                  width: "180px",
                }}
              ></input>
              <button className="bb">send</button>
            </div>
          </div>
        </div>

        <div id="copy" className="footer-copyright text-center py-3">
          © 2022 Copyright:
          <a href="https://mdbootstrap.com/">
            {" "}
            <span style={{ fontWeight: "bold" }}>CodeWarriors</span>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
