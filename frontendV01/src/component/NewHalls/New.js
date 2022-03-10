import React, { useState, useEffect } from "react";
import axios from "axios";
import "./New.css";
import { useDispatch, useSelector } from "react-redux";
import { AddHall, setHalls } from "../../reducer/halls/index";
const New = ({ num, setNum, search }) => {
  const [message, setMessage] = useState("");
  const [hall_image, setHall_image] = useState("");
  const [hall_name, setHall_name] = useState("");
  const [video, setVideo] = useState("");
  const [discount, setDiscount] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("");
  const [hall_description, setHall_description] = useState("");
  const [hall_address, setHall_address] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      halls: state.hallsReducer.halls,
    };
  });

  const addNewHall = () => {
    axios
      .post(
        "http://localhost:5000/halls",
        {
          hall_image,
          hall_name,
          video,
          hall_description,
          hall_address,
          price,
          discount,
          priceBeforeDiscount,
        },
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((result) => {
        dispatch(
          AddHall({
            hall_image,
            hall_name,
            video,
            hall_description,
            hall_address,
            price,
          })
        );
        setMessage("the hall has been created successfully");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  return (
    <>
    <br/>
    <br/>

      <div>
    
        {/* <input
          className="name"
          type="text"
          placeholder="name"
          onChange={(e) => {
            setHall_name(e.target.value);
          }}
        ></input>
        <input
          className="image"
          type="text"
          placeholder="Image"
          onChange={(e) => {
            setHall_image(e.target.value);
          }}
        ></input>{" "}
        <input
          className="price"
          type="number"
          placeholder="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="video"
          onChange={(e) => {
            setVideo(e.target.value);
          }}
        ></input> */}
    
        <div class="form-floating">
          <select style={{width:"200px"}}
            class="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
          >
            <option selected>Select Address</option>
            <option value="1">Amman</option>
            <option value="2">Irbid</option>
            <option value="3">Zarqa</option>
            <option value="4">Salt</option>
            <option value="5">Madaba</option>
            <option value="6">Mafraq</option>
            <option value="7">Jerash</option>
            <option value="8">Ma'an</option>
            <option value="9">Tafila</option>
            <option value="10">Karak</option>
            <option value="11">Aqapa</option>
            <option value="12">Gawr</option>
          </select>
          <label for="floatingSelect">Select Address</label>
        </div>
        {/* <input
          placeholder="address"
          type="text"
          onChange={(e) => {
            setHall_address(e.target.value);
          }}
        ></input>{" "} */}
        <textarea
          className="description"
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setHall_description(e.target.value);
          }}
        ></textarea>
        <input
          placeholder="priceBeforeDiscount"
          type="text"
          onChange={(e) => {
            setPriceBeforeDiscount(e.target.value);
          }}
        ></input>
        <input
          placeholder="discount"
          type="text"
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
        ></input>
        <button className="new" onClick={addNewHall}>
          New Hall
        </button>
      </div>
    </>
  );
};
export default New;
