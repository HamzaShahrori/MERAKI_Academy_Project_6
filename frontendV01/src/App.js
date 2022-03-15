import React, { useState } from "react";
import "./App.css";
//
import { Routes, Route } from "react-router-dom";
import Navigation from "./component/NabBar/Navigation";
//
import "bootstrap/dist/css/bootstrap.min.css";
import New from "./component/NewHalls/New";
import Home from "./component/Home/Home";
import Login from "./component/login/Login";
//HallDetails
import AllHallsWithDiscount from "./component/Discount/Discount";
import HallDetails from "./component/hallDetails/HallDetails";
// HallBooking
import HallBooking from "./component/Booking/Booking";
import Register from "./component/register/Register";

import AllHalls from "./component/allHalls/AllHalls";
import Address from "./component/Address/Address";
import StarRating from "./component/StarRating/StarRating";
function App() {
  const [userId, setUserId] = useState("");
  const [num, setNum] = useState(1);
  const [allHalls, setALLHalls] = useState("");
  const [place, setPlace] = useState("");
  const [searchHall, setSearchHall] = useState("");

  console.log(place);
  console.log(allHalls);
  return (
    <>
      <Navigation
        setSearchHall={setSearchHall}
        setALLHalls={setALLHalls}
        setPlace={setPlace}
        setNum={setNum}
        userId={userId}
      />
      <Routes>
        <Route path="/details-booking/:user_id" element={<New />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/discounts"
          element={
            <AllHallsWithDiscount
              num={num}
              setNum={setNum}
              searchHall={searchHall}
            />
          }
        />
        <Route path="/login" element={<Login setUserId={setUserId} />} />

        <Route
          path="/all"
          element={
            <AllHalls
              num={num}
              setNum={setNum}
              searchHall={searchHall}
              allHalls={allHalls}
              setALLHalls={setALLHalls}
              place={place}
              setPlace={setPlace}
            />
          }
        />

        <Route
          path="/address"
          element={
            <Address
              num={num}
              setNum={setNum}
              searchHall={searchHall}
              allHalls={allHalls}
              setALLHalls={setALLHalls}
              place={place}
              setPlace={setPlace}
            />
          }
        />

        <Route path="/Hall-Details/:id" element={<HallDetails />} />
        <Route path="/Hall-Booking/:halls_id" element={<HallBooking />} />

        <Route path="/all/rating" element={<StarRating />} />



      </Routes>
    </>
  );
}
//
export default App;
