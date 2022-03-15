import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Booking.css";
import { useNavigate } from "react-router-dom";
// import { setHall } from "../../reducer/halls/index";

const HallBooking = () => {
  // const state = useSelector((state) => {
  //   return {
  //     token: state.loginReducer.token,
  //     halls: state.hallsReducer.halls,
  //     hallById: state.hallsReducer.hallById,
  //   };
  // });

  //   booking_day VARCHAR(255),
  // date_booking DATE,
  // booking_time VARCHAR(255),
  // phone VARCHAR(255),
  // Payment INT
  const navigate = useNavigate();
  const [reserver, setReserver] = useState("");
  const [phone, setPhone] = useState("");

  const [date_booking, setDate_booking] = useState("");

  const [booking_day, setBooking_day] = useState("");
  const [booking_time, setBooking_time] = useState("");
  const [Payment, setPayment] = useState("");
  const [message, setMessage] = useState("");
  const { halls_id } = useParams();
console.log(halls_id);

  const addBooking = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`http://localhost:5000/booking/${halls_id}`, {
        reserver,
        phone,
        date_booking,
        booking_day,
        booking_time,
        Payment,
      });


      if (result.data.success) {
   
        setMessage("Booking done")
      } else throw Error;

    } catch {}
  };

  const dispatch = useDispatch();

  //   /-------

  return (
    <>
      <br />

      <div className="container-booking">
        <div className="container-info">
          <h2 className="heading">
            Conditions and laws from the Ministry of Health
          </h2>
          <h3 className="heading-COVID-19">COVID-19</h3>
          <p>Wear the mask correctly, covering the nose and mouth</p>
          <p>Avoid shaking hands and kissing</p>

          <h3 className="heading-COVID-19">Please adhere to the following</h3>
          <p>The number of attendees should not exceed 100 people</p>
          <p>
            Not using the phone for the purpose of taking pictures inside the
            hall
          </p>
          <hr />
          <h4 className="heading-Congratulation">
            God bless you and bless on you and join you in good
          </h4>
        </div>
        <div className="container-form">
          <form className="form">
            <h2 className="heading heading-form  ">Reservation information</h2>

            <div className="form-filed">
              <p>Your Name</p>
              <input
                type="text"
                placeholder="your name"
                onChange={(e) => setReserver(e.target.value)}
              />
            </div>
            <div className="form-filed">
              <p>Your Phone</p>
              <input
                type="text"
                placeholder="your phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-filed">
              <p>Booking Day</p>
              <input
                type="text"
                placeholder="booking day"
                onChange={(e) => setBooking_day(e.target.value)}
              />
            </div>

            <div className="form-filed">
              <p>booking Date</p>
              <input
                type="date"
                onChange={(e) => setDate_booking(e.target.value)}
              />
            </div>

            <div className="form-filed">
              <p>booking Time</p>
              <input
                type="time"
                onChange={(e) => setBooking_time(e.target.value)}
              />
            </div>

            <div className="form-filed">
              <p>Payment value</p>
              <input type="text" onChange={(e) => setPayment(e.target.value)} />
              {/* <select name="select" id="#">
                <option value="10%">10%</option>
                <option value="20%">20%</option>
                <option value="30%">30%</option>
                <option value="40%">40%</option>
                <option value="50%">50%</option>
                <option value="60%">60%</option>
                <option value="70%">70%</option>
                <option value="80%">80%</option>
                <option value="90%">90%</option>
                <option value="100%">100%</option>
              </select> */}
            </div>
            <button className="btn-Booking" onClick={addBooking} >SUBMIT</button>
          </form>
        </div>
      </div>
      {setMessage}
    </>
  );
};

export default HallBooking;
