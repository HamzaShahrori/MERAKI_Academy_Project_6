import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Wedding.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

const Wedding = ({ num, setNum, search }) => {
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

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      halls: state.hallsReducer.halls,
    };
  });
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { user_id } = useParams();
  const getAllHalls = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/halls/page?page=${num}`,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------------------------------------------------------

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
        console.log(result.data.result[0].id);
        localStorage.setItem("hall-id", result.data.result[0].id);
        dispatch(setHalls(result.data.result));
      });
  };
  useEffect(() => {
    getHallByUserId();
  }, []);
  //upload images using cloudinary

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
  //upload videos using cloudinary
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
  //---------------------------------------------------------------------------
  const updateHallById = async (id) => {
    console.log("id", id);
    axios
      .put(
        `http://localhost:5000/halls/${id}`,
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
        console.log("result", result.data);
        dispatch(updateHalls(result.data));

        getAllHalls();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const convert = () => {
    Navigate(`/details/${localStorage.getItem("hall-id")}`);
  };
  //------------------------------------------------------------------------------
  const deleteHallById = async (id) => {
    console.log("id", id);
    try {
      await axios.delete(`http://localhost:5000/halls/${id}`);
      dispatch(deleteHalls(id));
      getAllHalls();
    } catch (error) {
      console.log(error);
    }
  };
  //------------------------------------------------------------------------------
  return (
    <>
      <div className="div">
        <menu
          className="main-menu"
          // style={{ marginTop: "10%", marginLeft: "3%" }}
        >
          <div className="main-menu__top"></div>
          <br /> <br />
          <nav className="main-menu_nav" id="menu">
            <NavLink className="link1" to="/details-booking/:user_id">
              New Hall
            </NavLink>
            <br />
            <br /> <br />
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
          </nav>
        </menu>
      </div>

      <div className="wedding">
        {state.halls &&
          state.halls.map((element, i) => (
            <>
              <div key={i}>
                <div>
                  <div class="card-body" id="hall">
                    <img
                      src={element.hall_image}
                      class="card-img-bottom"
                      alt="hall"
                      style={{
                        width: "60%",
                        height: "250px",
                        borderRadius: "5px",
                      }}
                    />{" "}
                    <br />
                    <br />
                    <h5 class="card-title">
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        Name:
                      </span>{" "}
                      {element.hall_name}
                    </h5>{" "}
                    <p class="card-text">
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        Address:
                      </span>{" "}
                      {element.hall_address}
                    </p>
                    <p class="card-text" id="price">
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        Price:
                      </span>{" "}
                      {element.price}$
                    </p>
                    <p class="card-text">
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        Discount:
                      </span>{" "}
                      {element.discount}%
                    </p>
                    <p class="card-text">
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        PriceBefore:
                      </span>{" "}
                      {element.priceBeforeDiscount}$
                    </p>
                    <p class="card-text" style={{ width: "50%" }}>
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        Description:
                      </span>
                      {element.hall_description}
                    </p>
                    <button
                      id="button-update"
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@getbootstrap"
                    >
                      Update Hall
                    </button>
                    <button
                      id="button-delete"
                      type="button"
                      onClick={() => deleteHallById(element.id)}
                    >
                      delete
                    </button>{" "}
                    <p class="card-text"></p>
                  </div>
                </div>
                <div>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Update Hall
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>

                        <div className="modal-body">
                          <form className="form-floating">
                            <input
                              onChange={(e) => setHall_name(e.target.value)}
                              type="text"
                              // defaultValue={element.hall_name}
                              className="form-control"
                              id="floatingInputValue"
                              placeholder="Hall Name"
                            />
                            <label for="floatingInputValue">Hall Name</label>
                          </form>
                          <br />
                          <form>
                            <div
                              style={{
                                marginTop: "0%",
                                width: "465px",
                                height: "50px",
                                marginLeft: "0%",
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
                                id="upload1"
                                onClick={() => uploadImage(imageselected)}
                              >
                                <AiOutlineCloudUpload
                                  title="upload Image2"
                                  id="upl"
                                />{" "}
                              </button>
                            </div>{" "}
                            <br />
                            <div
                              className="input-group col-mb-3"
                              style={{
                                marginTop: "0%",
                                width: "465px",
                                height: "50px",
                                marginLeft: "0%",
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
                                <AiOutlineCloudUpload
                                  title="upload Video"
                                  id="upl"
                                />{" "}
                              </button>
                            </div>
                            <br />
                            <div className="row g-2">
                              <div className="col-md">
                                <div className="form-floating">
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputGrid"
                                    placeholder="Hall Price"
                                    onChange={(e) => setPrice(e.target.value)}
                                  />
                                  <label for="floatingInputGrid">
                                    Hall Price
                                  </label>
                                </div>
                              </div>
                              <div className="col-md">
                                <div className="form-floating">
                                  <input
                                    type="number"
                                    onChange={(e) =>
                                      setDiscount(e.target.value)
                                    }
                                    className="form-control"
                                    id="floatingInputGrid"
                                    placeholder="Discount"
                                  />
                                  <label for="floatingInputGrid">
                                    Discount
                                  </label>
                                </div>
                              </div>
                              <div className="col-md">
                                <div className="form-floating">
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputGrid"
                                    placeholder="Discount"
                                    onChange={(e) =>
                                      setPriceBeforeDiscount(e.target.value)
                                    }
                                  />
                                  <label for="floatingInputGrid">
                                    Price Before
                                  </label>
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className="form-floating">
                              <select
                                className="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                              >
                                <option
                                  selected
                                  onChange={(e) =>
                                    setHall_address(e.target.value)
                                  }
                                >
                                  Select Address
                                </option>
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
                                <option value="Gawr">Gawr</option>
                              </select>
                              <label for="floatingSelect">Select Address</label>
                            </div>
                            <br />
                            <div className="mb-3">
                              <textarea
                                onChange={(e) =>
                                  setHall_description(e.target.value)
                                }
                                className="form-control"
                                id="message-text"
                                placeholder="Description"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            onClick={() => {
                              updateHallById(element.id);
                            }}
                            type="button"
                            style={{
                              backgroundColor: "rgba(184, 19, 206, 0.404)",
                              border: "1px solid rgba(184, 19, 206, 0.404)",
                              color: "black",
                            }}
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@getbootstrap"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}{" "}
      </div>
    </>
  );
};
export default Wedding;
