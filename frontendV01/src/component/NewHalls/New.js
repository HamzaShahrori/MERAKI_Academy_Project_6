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

  const addNewHall = (user_id) => {
    console.log("user");
    axios
      .post(
        `http://localhost:5000/halls/${user_id}`,
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
            discount,
            priceBeforeDiscount,
          })
        );
        setMessage("the hall has been created successfully");
      })
      .catch((err) => {
        console.log("err", err);
        setMessage(err.response.data.message);
      });
  };
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div class="input-group">
        <div class="input-group col-mb-3" style={{ width: "300px" }}>
          <span
            class="input-group-text"
            id="basic-addon1"
            style={{ background: "rgb(0, 0, 49)", color: "white" }}
          >
            Image Link
          </span>
          <input
            className="image"
            onChange={(e) => {
              setHall_image(e.target.value);
            }}
            type="text"
            class="form-control"
            placeholder=" Image Link"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div style={{ width: "300px" }} class="input-group col-mb-3">
          <span
            class="input-group-text"
            id="basic-addon1"
            style={{ background: "rgb(0, 0, 49)", color: "white" }}
          >
            Hall Name
          </span>
          <input
            type="text"
            class="form-control"
            placeholder=" Hall Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div style={{ width: "300px" }} class="input-group col-mb-3">
          <span
            class="input-group-text"
            id="basic-addon1"
            style={{ background: "rgb(0, 0, 49)", color: "white" }}
          >
            Video Link
          </span>
          <input
            type="Video"
            onChange={(e) => {
              setVideo(e.target.value);
            }}
            class="form-control"
            placeholder=" Video Link"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div style={{ width: "300px" }} class="input-group col-mb-3">
          <span
            class="input-group-text"
            id="basic-addon1"
            style={{ background: "rgb(0, 0, 49)", color: "white" }}
          >
            Description
          </span>
          <textarea
            class="form-control"
            placeholder="Description"
            id="floatingTextarea"
            type="text"
            onChange={(e) => {
              setHall_description(e.target.value);
            }}
          ></textarea>{" "}
        </div>
      </div>
      <div class="row g-1">
        <div class="col-md">
          <div class="form-floating" style={{ width: "300px" }}>
            <input
              type="number"
              class="form-control"
              id="floatingInputGrid"
              placeholder="Hall Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label for="floatingInputGrid">Hall Price</label>
          </div>
        </div>
        <div class="col-md">
          <div class="form-floating" style={{ width: "300px" }}>
            <input
              type="number"
              onChange={(e) => setDiscount(e.target.value)}
              class="form-control"
              id="floatingInputGrid"
              placeholder="Discount"
            />
            <label for="floatingInputGrid">Discount</label>
          </div>
        </div>
        <div class="col-md">
          <div class="form-floating" style={{ width: "300px" }}>
            <input
              type="number"
              class="form-control"
              id="floatingInputGrid"
              placeholder="Discount"
              onChange={(e) => setPriceBeforeDiscount(e.target.value)}
            />
            <label for="floatingInputGrid">Price Before</label>
          </div>
        </div>{" "}
        <div class="form-floating" style={{ width: "450px" }}>
          <select
            onChange={(e) => {
              setHall_address(e.target.value);
            }}
            style={{ width: "200px" }}
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
            <option value="12">Ajlun</option>
          </select>
          <label for="floatingSelect">Select Address</label>
        </div>
      </div>

      <button onClick={() => addNewHall}>new hall</button>
      {/* <button onClick={addNewHall} class="btn btn-primary">
        new hall
      </button> */}

      {/* <button className="new">
          New Hall
        </button> */}
      {/* <input
          placeholder="address"
          type="text"
          onChange={(e) => {
            setHall_address(e.target.value);
          }}
        ></input>{" "} */}
      {/* <textarea
          className="description"
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setHall_description(e.target.value);
          }}
        ></textarea> */}
      {/* <input
          placeholder="priceBeforeDiscount"
          type="text"
          onChange={(e) => {
            setPriceBeforeDiscount(e.target.value);
          }}
        ></input> */}
      {/* <input
          placeholder="discount"
          type="text"
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
        ></input> */}
    </>
  );
};
export default New;
