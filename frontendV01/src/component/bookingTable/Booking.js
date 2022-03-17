import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Booking.css";
import { setHall } from "../../reducer/halls";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
const BookingTable = () => {
  const [reserver, setReserver] = useState("");
  const [booking_day, setBooking_day] = useState("");
  const [date_booking, setDate_booking] = useState("");
  const [booking_time, setBooking_time] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      halls: state.hallsReducer.halls,
    };
  });
  const dispatch = useDispatch();
  const { halls_id } = useParams();
  const getBookingById = () => {
    axios
      .get(`http://localhost:5000/booking/all/${halls_id}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(setHall(result.data.result));
      });
  };
  useEffect(() => {
    getBookingById();
  }, []);

  return (
    <>
      {state.halls &&
        state.halls.map((element, i) => {
          <div key={i}>
            <p>{element.reserver}</p>;<p>{element.booking_day}</p>;
            <p>{element.booking_time}</p>;<p>{element.phone}</p>;
            <p>{element.payment}</p>;
          </div>;
        })}
      <div className="div3">
        <menu
          className="main-menu"
          style={{ marginTop: "10%", marginLeft: "3%" }}
        >
          <div className="main-menu__top">
            {/* <SiBitdefender className="logo"></SiBitdefender> */}
          </div>
          <br />
          <nav className="main-menu_nav" id="menu2">
            <NavLink className="link1" to="/details-booking/:user_id">
              New Hall
            </NavLink>
            <br />
            <br />
            <br />
            <NavLink className="link1" to="/wedding-Hall">
              Wedding Halls
            </NavLink>
            <br />
            <br />
            <br />

            <NavLink className="link1" to="/details/:halls_id">
              Booking Tables
            </NavLink>
            <br />
            <br />
            <br />
            {/* <NavLink className="blog" to="/blog">
            
            </NavLink> */}
          </nav>
        </menu>
      </div>
    </>
  );
};
export default BookingTable;
