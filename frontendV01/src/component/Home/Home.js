
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    
   <div className="containerHero">
     <div className="contentHero">
       <h1>Book now at the<br/> lowest price</h1>
       <div className="btuHeroBook">
       <Link to="/all"><button>Booking Mow</button></Link></div>
       </div>
     </div>

  

       <div className="cover-discount">
         <div className="cover">
           <div className="logoMarriage">
             <img src="./image/57.png"/>
             </div>

             <div className="contentDiscount">
               <span>Discounts on booking upto</span>
               <h3>90% off</h3>
               {/* <p>offers ends after 5 days</p> */}
              <Link to="/discounts" className="btnDiscount">Book now </Link>
               </div>
               <div className="wowDiscount">
                 <img src="./image/w.png"/>
                 </div>
           </div>
         </div>





      
    </>
  );
};

export default Home;
