import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container">
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

      </div>
    </>
  );
};

export default Home;
