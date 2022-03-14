import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./New.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
// AiOutlineCloudUpload
// import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { AddHall, setHalls } from "../../reducer/halls/index";
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
        `http://localhost:5000/halls/${localStorage.getItem('userId')
      }`,
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
      .get(`http://localhost:5000/halls/add/${localStorage.getItem('userId')}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        dispatch(setHalls(result.data.result));
       
      });
  };
  useEffect(() => {
    getHallByUserId();
  }, []);
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="input-group">
        {/* <div className="input-group col-mb-3" style={{ width: "300px", height:"50px" }} >
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{ background: "rgb(0, 0, 49)", color: "white" }}
          >
          Video Link </span>
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

          <button type="button" class="btn btn-primary" onClick={() => uploadVideo(imageselected)}> <AiOutlineCloudUpload/> </button>
        </div> */}
        <div
          className="input-group col-mb-3"
          style={{ width: "300px", height: "50px" }}
        >
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{ background: "rgb(0, 0, 49)", color: "white" }}
          >
            Image Link
          </span>
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
            class="btn btn-primary"
            onClick={() => uploadImage(imageselected)}
          >
            <AiOutlineCloudUpload />{" "}
          </button>
        </div>

        <div
          style={{ width: "300px", height: "50px" }}
          className="input-group col-mb-3"
        >
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{ background: "rgb(0, 0, 49)", color: "white" }}
          >
            Hall Name
          </span>
          <input
            onChange={(e) => {
              setHall_name(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder=" Hall Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div
          className="input-group col-mb-3"
          style={{ width: "300px", height: "50px" }}
        >
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{ background: "rgb(0, 0, 49)", color: "white" }}
          >
            Video Link{" "}
          </span>
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
            class="btn btn-primary"
            onClick={() => uploadVideo(imageselected)}
          >
            {" "}
            <AiOutlineCloudUpload />{" "}
          </button>
        </div>
        <div
          style={{ width: "300px", height: "50px" }}
          className="input-group col-mb-3"
        >
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{ background: "rgb(0, 0, 49)", color: "white" }}
          >
            Description
          </span>
          <textarea
            className="form-control"
            placeholder="Description"
            id="floatingTextarea"
            type="text"
            onChange={(e) => {
              setHall_description(e.target.value);
            }}
          ></textarea>{" "}
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
        <div className="col-md">
          <div className="form-floating" style={{ width: "300px" }}>
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
        <div className="col-md">
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
        <div className="form-floating" style={{ width: "450px" }}>
          <select
            onChange={(e) => {
              setHall_address(e.target.value);
            }}
            style={{ width: "200px" }}
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
          <label for="floatingSelect">Select Address</label>
        </div>
      </div>

      <button  type="button" class="btn btn-primary" onClick={addNewHall}>
        new hall
      </button>
     
    </>
  );
};
export default New;
