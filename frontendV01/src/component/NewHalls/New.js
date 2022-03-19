import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import "./New.css";
import { NavLink } from "react-router-dom";

import { AiOutlineCloudUpload } from "react-icons/ai";
// AiOutlineCloudUpload
// import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddHall,
  setHalls,
  updateHalls,
  deleteHalls,
} from "../../reducer/halls/index";
const New = ({ num, setNum, search }) => {
  const [imageselected, setImageSelected] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [hall_image, setHall_image] = useState("");
  const [hall_name, setHall_name] = useState("");
  const [video, setVideo] = useState("");
  const [discount, setDiscount] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("");
  const [hall_description, setHall_description] = useState("");
  const [hall_address, setHall_address] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      halls: state.hallsReducer.halls,
    };
  });

  const addNewHall = () => {
    axios
      .post(
        `http://localhost:5000/halls/${localStorage.getItem("userId")}`,
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
        console.log("res", result);
      })
      .catch((err) => {
        console.log("err", err);
        // setMessage(err.response.data.message);
      });
  };
  const uploadVideo = (videoFile) => {
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("upload_preset", "my-uploads");
    axios
      .post("https://api.cloudinary.com/v1_1/dnx1t4ulp/video/upload", formData)

      .then((result) => {
        console.log(result);
        setVideo(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "my-uploads");
    axios
      .post("https://api.cloudinary.com/v1_1/dnx1t4ulp/image/upload", formData)

      .then((result) => {
        setHall_image(result.data.secure_url);
        setImage(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const getHallByUserId = () => {
    console.log("user", user_id);
    axios
      .get(
        `http://localhost:5000/halls/add/${localStorage.getItem("userId")}`,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((result) => {
        console.log(result.data.result);
        dispatch(setHalls(result.data.result));
      });
  };
  useEffect(() => {
    getHallByUserId();
  }, []);
  const convert = () => {
    Navigate(`/details/${localStorage.getItem("hall-id")}`);
  };
  return (
    <div>
      <input
        type="text"
        style={{
          transform: "translate(26em,9.8em)",
          width: "300px",
          height: "50px",
          padding: "5px",
        }}
        placeholder="Hall Name"
        onChange={(e) => setHall_name(e.target.value)}
      />
      <br />{" "}
      <textarea
        style={{
          transform: "translate(26em,11.5em)",
          width: "300px",
          height: "50px",
          padding: "5px",
        }}
        type="text"
        // className="form-control"
        id="input2"
        placeholder="description"
        onChange={(e) => setHall_description(e.target.value)}
      />{" "}
      <br />
      <input
        style={{
          transform: "translate(26em,12em)",
          width: "300px",
          height: "50px",
          padding: "5px",
        }}
        type="number"
        // className="form-control"
        id="input2"
        placeholder="Hall Price"
        onChange={(e) => setPrice(e.target.value)}
      />{" "}
      <br />{" "}
      <input
        type="number"
        style={{
          transform: "translate(50em,0em)",
          width: "300px",
          height: "50px",
          padding: "5px",
        }}
        onChange={(e) => setDiscount(e.target.value)}
        // className="form-control"
        id="input22"
        placeholder="Discount"
      />
      <br />
      <input
        type="number"
        style={{
          transform: "translate(50em,1em)",
          width: "300px",
          height: "50px",
          padding: "5px",
        }}
        // className="form-control"
        id="input2"
        placeholder="PriceBefore"
        onChange={(e) => setPriceBeforeDiscount(e.target.value)}
      />
      <br />{" "}
      <input
        style={{
          width: "300px",
          height: "50px",
          padding: "5px",
          transform: "translate(50em,7em)",
        }}
        type="file"
        onChange={(e) => {
          setImageSelected(e.target.files[0]);
        }}
        // className="form-control"
        placeholder=" Video Link"
        // aria-label="Username"
        // aria-describedby="basic-addon1"
      />
      <button
        type="button"
        style={{
          transform: "translate(48em,7em)",
          backgroundColor: "rgba(184, 19, 206, 0.404)",
        }}
        // className="btn9"
        // id="upload2"
        onClick={() => uploadImage(imageselected)}
      >
        <AiOutlineCloudUpload title="upload Image" style={{ width: "40px" }} />{" "}
      </button>
      <br />{" "}

      <select
        onChange={(e) => {
          setHall_address(e.target.value);
        }}
        style={{
          width: "300px",
          height: "50px",
          padding: "5px",
          marginTop: "6%",
          transform:"translate(50em,-6em)",
          width: "300px",
        }}
        className="form-select"
        id="floatingSelect"
        aria-label="Floating label select example"
      >
        <option selected>Select Address</option>
        <option value="Amman">Amman</option>
        <option value="Irbid">Irbid</option>
        <option value="Zarqa">Zarqa</option>
        <option value="Salt">Salt</option>
        <option value="Madaba">Madaba</option>
        <option value="Mafraq">Mafraq</option>
        <option value="Jerash">Jerash</option>
        <option value="Ma'an">Ma'an</option>
        <option value="Tafila">Tafila</option>
        <option value="Karak">Karak</option>
        <option value="Aqapa">Aqapa</option>
        <option value="Ajlun">Ajlun</option>
      </select>{" "}
      <input
        style={{
          width: "300px",
          height: "50px",
          padding: "5px",
          transform: "translate(26em,-4em)",
        }}
        type="file"
        onChange={(e) => {
          setImageSelected(e.target.files[0]);
        }}
        // className="form-control"
        placeholder=" Video Link"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
      <button
        style={{
          transform: "translate(23.4em,-4em)",
          backgroundColor: "rgba(184, 19, 206, 0.404)",
        }}
        type="button"
        className="btn9"
        onClick={() => uploadVideo(imageselected)}
      >
        {" "}
        <AiOutlineCloudUpload
          title="upload Video"
          style={{ width: "40px" }}
        />{" "}
      </button>
      <br /> {/* <br></br> <br></br> */}
      <button type="button" id="button" onClick={addNewHall}>
        New Hall
      </button>
      {/*--- create new hall --- */}
      <div className="div1">
        <menu
          className="main-menu"
          style={{ marginTop: "10%", marginLeft: "3%" }}
        >
          <div className="main-menu__top">
            {/* <SiBitdefender className="logo"></SiBitdefender> */}
          </div>
          <br />
          <nav className="main-menu_nav" id="menu">
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
  );
};
export default New;
