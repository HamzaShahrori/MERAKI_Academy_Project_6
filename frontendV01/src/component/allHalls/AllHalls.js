import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHalls, updateHalls, deleteHalls } from "../../reducer/halls/index";
import { useNavigate } from "react-router-dom";

const AllHalls = ({ num, setNum, searchHall }) => {
  const [message, setMessage] = useState("");
  const [hallId, setHallId] = useState("");
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
  const navigate = useNavigate();
  //hall_image
  // hall_name
  // video
  // hall_description
  // hall_address
  // price
  // discount
  // PriceBeforeDiscount

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

  const getHallByAddress = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/halls/page/hall_address/?page=1&hall_address=Amman`,
        { headers: { Authorization: `Bearer ${state.token}` } }
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
      if (num == 0) {
        setNum(num + 1);
      } else {
        setNum(num - 1);
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
  useEffect(() => {
    getAllHalls();
  });

  useEffect(() => {});

  // console.log(state.halls);
  return (
    <>
      {state.halls &&
        state.halls
          .filter((hallinfo) => {
            if (searchHall == "") {
              return hallinfo;
            } else if (
              hallinfo.hall_address
                .toLowerCase()
                .includes(searchHall.toLowerCase()) ||
              hallinfo.hall_name
                .toLowerCase()
                .includes(searchHall.toLowerCase())
            ) {
              console.log("after", searchHall); //

              return hallinfo;
            }
          })

          .map((element, i) => (
           <>
            <br/>
            <br/>
            <div key={i}>
              {/* <img src={element.hall_image}></img>
              <p>{element.hall_name}</p>
              {/* <video src={element.video}></video> */}
              <video width="320" height="240" controls>
                <source src={element.video} type="video" />
              </video>
              <p>{element.hall_description}</p>
              <p>{element.price}</p>

              <p>{element.discount}%</p>
              <p>{element.PriceBeforeDiscount}</p>
              <input
                type="text"
                placeholder="image"
                defaultValue={element.hall_image}
                onChange={(e) => setHall_image(e.target.value)}
              ></input>{" "}
               <input
                type="text"
                placeholder="Video"
                defaultValue={element.video}
                onChange={(e) => setVideo(e.target.value)}
              ></input>
               <input
                type="text"
                placeholder="name"
                defaultValue={element.hall_name}
                onChange={(e) => setHall_name(e.target.value)}
              ></input>
               <input
                type="text"
                placeholder="description"
                defaultValue={element.hall_description}
                onChange={(e) => setHall_description(e.target.value)}
              ></input>
               <input
                type="text"
                placeholder="price"
                defaultValue={element.price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>

           

              <button
                onClick={() => {
                  updateHallById(element.id);
                }}
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@getbootstrap"
              >
                Update Hall
              </button>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Update Hall
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div class="modal-body">
                      <form>
                        <form class="form-floating">
                          <input
                            onChange={(e) => setHall_image(e.target.value)}
                            type="text"
                            defaultValue={element.hall_image}
                            class="form-control"
                            id="floatingInputValue"
                            placeholder="Image Link"
                          />
                          <label for="floatingInputValue">Image Link</label>
                        </form>

                        <br />
                        <form class="form-floating">
                          <input
                            onChange={(e) => setHall_name(e.target.value)}
                            type="text"
                            defaultValue={element.hall_name}
                            class="form-control"
                            id="floatingInputValue"
                            placeholder="Hall Name"
                          />
                          <label for="floatingInputValue">Hall Name</label>
                        </form>

                        <br />
                        <form class="form-floating">
                          <input
                            onChange={(e) => setVideo(e.target.value)}
                            type="text"
                            defaultValue={element.hall_name}
                            class="form-control"
                            id="floatingInputValue"
                            placeholder="Video Link"
                          />
                          <label for="floatingInputValue">Video Link</label>
                        </form>

                        <br />
                        <div class="row g-2">
                          <div class="col-md">
                            <div class="form-floating">
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
                            <div class="form-floating">
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
                            <div class="form-floating">
                              <input
                                type="number"
                                class="form-control"
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
                     
                        <div class="form-floating">
                          <select
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
                        <div class="mb-3">
                          <label for="message-text" class="col-form-label">
                            discription:
                          </label>
                          <textarea
                            class="form-control"
                            id="message-text"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          updateHallById(element.id);
                        }}
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          updateHallById(element.id);
                        }}
                        type="button"
                        class="btn btn-primary"
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
              <button onClick={() => deleteHallById(element.id)}>delete</button>
            </div>
            </>
          ))}

      {num == 1 ? (
        <></>
      ) : (
        <a
          onClick={() => {
            setNum(num - 1);
          }}
        >
          <span>BACK</span>
        </a>
      )}

      {num == 1 ? (
        <a
          onClick={() => {
            setNum(num + 1);
          }}
        >
          <span>Next</span>
        </a>
      ) : (
        <> </>
      )}
    </>
  );
};
export default AllHalls;
