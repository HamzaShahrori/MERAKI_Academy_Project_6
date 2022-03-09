import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./Home.css";

const Home = () => {
  return (
    <>
   <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="./image/4.avif" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="./image/1.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="./image/2.jpg" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      {/* <div className="container">
        <nav>
          <h1 className="logo">TEST</h1>
          <ul>
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Register</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Booking</a>
            </li>
          </ul>
        </nav>


        <div className="left-col">
          <h1>Welcome in <br/>Booking Website</h1></div>
        <div className="right-col">
          <video autoPlay loop muted className="back-video">
            <source src="./image/Project6.mp4" type="video/mp4"/>
            </video>
        
          </div>

      </div> */}
    </>
  );
};

export default Home;
