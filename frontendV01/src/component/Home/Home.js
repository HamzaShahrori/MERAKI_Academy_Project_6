import React, { useState, useEffect } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      hallsWithDiscount: state.hallsReducer.hallsWithDiscount,
    };
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
        <h1>Top 5</h1>
        <div className="rowVideo">
          {state.hallsWithDiscount.slice(1, 4) &&
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
            {state.hallsWithDiscount.slice(1, 4) &&
              state.hallsWithDiscount.slice(1, 4).map((element, i) => (
                <>
                  {" "}
                  <div className="Small-img-row">
                    <div className="small-img">
                      <img src={element.hall_image} />
                      <img src="./image/play.png"    type="button"
                        className="btn btn-primary btnPlay"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@getbootstrap" />
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
  <video width="100%" controls  autoPlay id="video">
    
    <source src={element.video} type="video/mp4"/>
    </video> 
    <img src="./image/play.png" className="btnClose"/>
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


    
  


      {/* 


  <script>


  </script> */}
    </>
  );
};

export default Home;
