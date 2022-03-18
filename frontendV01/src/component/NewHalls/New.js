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
    <div id="all">
      {/*--- create new hall --- */}
      <div className="div2">
        <form style={{ marginLeft: "30%" }}>
          <fieldset>
            <div className="mb-3">
              <div className="form-floating" style={{ width: "300px" }}>
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputGrid"
                  placeholder="Hall Name"
                  onChange={(e) => setHall_name(e.target.value)}
                />
                <label for="floatingInputGrid">Hall Name</label>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-floating" style={{ width: "300px" }}>
                <textarea
                  type="text"
                  className="form-control"
                  id="floatingInputGrid"
                  placeholder="Hall Name"
                  onChange={(e) => setHall_description(e.target.value)}
                />
                <label for="floatingInputGrid"> Description</label>
              </div>
            </div>
            <div className="row g-1">
              <div className="col-md">
                <div className="form-floating" style={{ width: "300px" }}>
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInputGrid"
                    placeholder="Hall Price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label for="floatingInputGrid">Hall Price</label>
                </div>
              </div>
            </div>
            <br></br>{" "}
            <div className="dis">
              <div
                className="col-md"
                style={{ marginLeft: "380px", width: "300px" }}
              >
                <div className="form-floating">
                  <input
                    type="number"
                    onChange={(e) => setDiscount(e.target.value)}
                    className="form-control"
                    id="floatingInputGrid"
                    placeholder="Discount"
                  />
                  <label for="floatingInputGrid">Discount</label>
                </div>
              </div>
              <br></br>
              <div className="col-md" style={{ marginLeft: "40%" }}>
                <div className="form-floating" style={{ width: "300px" }}>
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInputGrid"
                    placeholder="Discount"
                    onChange={(e) => setPriceBeforeDiscount(e.target.value)}
                  />
                  <label for="floatingInputGrid">Price Before</label>
                </div>
              </div>{" "}
              <br></br>
              <div
                style={{
                  marginTop: "0%",
                  width: "300px",
                  height: "50px",
                  marginLeft: "40%",
                }}
                className="input-group col-mb-3"
              >
                <input
                  type="file"
                  onChange={(e) => {
                    setImageSelected(e.target.files[0]);
                  }}
                  className="form-control"
                  placeholder=" Video Link"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                <button
                  type="button"
                  class="btn "
                  id="upload"
                  onClick={() => uploadImage(imageselected)}
                >
                  <AiOutlineCloudUpload title="upload Image" />{" "}
                </button>
              </div>{" "}
              <br></br>
            </div>
            <br></br>
            <div class="mb-3" id="select">
              <div className="form-floating" style={{ width: "700px" }}>
                <select
                  onChange={(e) => {
                    setHall_address(e.target.value);
                  }}
                  style={{ marginTop: "6%", width: "300px" }}
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
                </select>
                {/* <label for="floatingSelect">Select Address</label> */}
              </div>
            </div>
            {/* <button type="button" btn-lg">New Hall</button> */}
          </fieldset>
          <br></br>
          <div
            className="input-group col-mb-3"
            style={{
              width: "300px",
              height: "50px",
              marginTop: "-10%",
              marginLeft: "40%",
            }}
          >
            <input
              type="file"
              onChange={(e) => {
                setImageSelected(e.target.files[0]);
              }}
              className="form-control"
              placeholder=" Video Link"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />

            <button
              type="button"
              class="btn"
              id="upload"
              onClick={() => uploadVideo(imageselected)}
            >
              {" "}
              <AiOutlineCloudUpload title="upload Video" />{" "}
            </button>
          </div>
          <br></br> <br></br>
          <button type="button" id="button" onClick={addNewHall}>
            New Hall
          </button>
        </form>
      </div>
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
