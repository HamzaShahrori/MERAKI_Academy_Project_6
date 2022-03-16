import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Wedding.css";
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
        console.log(result.data.result);
        dispatch(setHalls(result.data.result));
      });
  };
  useEffect(() => {
    getHallByUserId();
  }, []);
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
  return (
    <>
      <menu
        className="main-menu"
        style={{ marginTop: "10%", marginLeft: "3%" }}
      >
        <div className="main-menu__top">
          {/* <SiBitdefender className="logo"></SiBitdefender> */}
        </div>
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
          <NavLink className="link1" to="/contact">
            Booking Tables
          </NavLink>
          <br />
          <br />
        </nav>
      </menu>
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
    </>
  );
};
export default Wedding;
