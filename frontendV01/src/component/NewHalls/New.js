import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./New.css";

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

  const getAllHalls = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/halls/page?page=${num}`,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      );
      if (!res.data.success) {
        if (num == 0) {
          setNum(num + 1);
        } else {
          setNum(num - 1);
        }
      }
      if (res.data.success) {
        dispatch(setHalls(res.data.result));
      }
    } catch (error) {
      if (error) {
        if (num == 0) {
          setNum(num + 1);
        } else {
          setNum(num - 1);
        }
      }

      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
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
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      {state.halls &&
        state.halls.map((element, i) => (
          <>
            <div key={i}>
              
              <div class="card" style={{}}>
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
                <img
                  src={element.hall_image}
                  class="card-img-bottom"
                  alt="hall"
                  style={{ width: "50%" }}
                />
              </div>

              <div
                class="card"
                style={{
                  width: "40rem",
                  marginLeft: "20%",
                  marginTop: "2%",
                  overflowX: "hidden",
                }}
              >
                {/* <img
                  class="card-img-top"
                  // width="50%"
                  src={element.hall_image}
                ></img> */}
                <video
                  class="card-img-top"
                  controls
                  autoPlay
                  id="video"
                  style={{ width: "100%" }}
                >
                  <source src={element.video} type="video/mp4" />
                </video>{" "}
                <h5 class="card-title">Name:{element.hall_name}</h5>
                <p class="card-text">Description: {element.hall_description}</p>
                <p class="card-text">Address: {element.hall_address}</p>
                <p class="card-text">Price: {element.price}$</p>
                <p class="card-text">Discount: {element.discount}%</p>
                <p class="card-text">
                  PriceBefore: {element.priceBeforeDiscount}$
                </p>
                <button onClick={() => deleteHallById(element.id)}>
                  delete
                </button>
                <div class="card-body">
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@getbootstrap"
                >
                  Update Hall
                </button>
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
                        <form>
                          <form className="form-floating">
                            <input
                              onChange={(e) => setHall_image(e.target.value)}
                              type="text"
                              // defaultValue={element.hall_image}
                              className="form-control"
                              id="floatingInputValue"
                              placeholder="Image Link"
                            />
                            <label for="floatingInputValue">Image Link</label>
                          </form>

                          <br />
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
                          <form className="form-floating">
                            <input
                              onChange={(e) => setVideo(e.target.value)}
                              type="text"
                              // defaultValue={element.hall_name}
                              className="form-control"
                              id="floatingInputValue"
                              placeholder="Video Link"
                            />
                            <label for="floatingInputValue">Video Link</label>
                          </form>

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
                                  onChange={(e) => setDiscount(e.target.value)}
                                  className="form-control"
                                  id="floatingInputGrid"
                                  placeholder="Discount"
                                />
                                <label for="floatingInputGrid">Discount</label>
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
                          <div className="mb-3">
                            <label
                              for="message-text"
                              className="col-form-label"
                            >
                              discription:
                            </label>
                            <textarea
                              onChange={(e) =>
                                setHall_description(e.target.value)
                              }
                              className="form-control"
                              id="message-text"
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
        ))}
      <div className="input-group"></div>
      {/*--- create new hall --- */}
      <form>
        <fieldset>
          <legend>Create New Hall</legend>
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
          <br></br>
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
          <br></br>
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
          <br></br>
          <div
            className="input-group col-mb-3"
            style={{ width: "300px", height: "50px" }}
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
              class="btn btn-primary"
              onClick={() => uploadImage(imageselected)}
            >
              <AiOutlineCloudUpload title="upload Image" />{" "}
            </button>
          </div>{" "}
          <br></br>
          <div
            className="input-group col-mb-3"
            style={{ width: "300px", height: "50px" }}
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
              class="btn btn-primary"
              onClick={() => uploadVideo(imageselected)}
            >
              {" "}
              <AiOutlineCloudUpload title="upload Video" />{" "}
            </button>
          </div>
          <br></br>
          <div class="mb-3">
            <div className="form-floating" style={{ width: "700px" }}>
              <select
                onChange={(e) => {
                  setHall_address(e.target.value);
                }}
                style={{ width: "300px" }}
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
          <button type="button" class="btn btn-primary " onClick={addNewHall}>
            New Hall
          </button>
          {/* <button type="button" class="btn btn-primary btn-lg">New Hall</button> */}
        </fieldset>
      </form>
    </>
  );
};
export default New;
