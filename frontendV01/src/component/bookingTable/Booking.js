import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Booking.css";
import { MdPayment } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {
  BsFillCalendarDateFill,
  BsTelephoneOutboundFill,
  BsFillCalendarDayFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { setHall } from "../../reducer/halls";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
const BookingTable = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      hallById: state.hallsReducer.hallById,
    };
  });
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { halls_id } = useParams();
  const getBookingById = () => {
    axios
      .get(
        `http://localhost:5000/booking/all/${localStorage.getItem("hall-id")}`,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((result) => {
        console.log(result.data.result);

        dispatch(setHall(result.data.result));
      });
  };
  console.log(state.hallById);
  useEffect(() => {
    getBookingById();
  }, []);
  const convert = () => {
    Navigate(`/details/${localStorage.getItem("hall-id")}`);
  };
  return (
    <>
      <div>
        <table className="head">
          <tr className="table1">
            <th className="id1">Id</th>
            <th className="name1">
              <MdDriveFileRenameOutline style={{ fontSize: "1.3em" }} /> Name{" "}
            </th>
            <th className="day1">
              <BsFillCalendarDayFill /> Day
            </th>
            <th className="date1">
              <BsFillCalendarDateFill /> Date
            </th>
            <th className="phone1">
              <BsTelephoneOutboundFill /> Phone
            </th>
            <th className="time1">
              <IoIosTime style={{ fontSize: "1.3em" }} /> Time{" "}
            </th>
            <th className="payment1">
              <MdPayment style={{ fontSize: "1.3em" }} /> Payment
            </th>
          </tr>{" "}
          {state.hallById &&
            state.hallById.map((element, i) => (
              <tr>
                <td className="id">{element.id}</td>
                <td className="name">{element.reserver}</td>
                <td className="day">{element.booking_day}</td>
                <td className="date"> {element.date_booking}</td>
                <td className="phone"> {element.phone}</td>
                <td className="time">{element.booking_time} AM </td>
                <td className="donation">{element.Payment}</td>
              </tr>
              //
            ))}
        </table>

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

              <a className="link1" onClick={() => convert()}>
                Booking Tables
              </a>
              <br />
              <br />
              <br />
              {/* <NavLink className="blog" to="/blog">
            
            </NavLink> */}
            </nav>
          </menu>
        </div>
      </div>
    </>
  );
};
export default BookingTable;
