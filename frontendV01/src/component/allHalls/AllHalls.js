import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHalls, updateHalls, deleteHalls } from "../../reducer/halls/index";
import { useNavigate } from "react-router-dom";
import "./AllHalls.css";

const AllHalls = ({
  num,
  setNum,
  searchHall,
  allHalls,
  place,
  setPlace,
  setALLHalls,
}) => {
  const [numAmman, setNumAmman] = useState(0);
  const [numIrbid, setNumIrbid] = useState(0);
  const [numAll, setNumAll] = useState(0);
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
        `http://localhost:5000/halls/page/hall_address/?page=${num}&hall_address=${place}`,
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
  const countNumAmman = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/count/amman
 `
      );

      if (res.data.success) {
        setNumAmman(res.data.result[0].Address);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ------
  // ------------------------------------------------------------------------------
  const countNumIrbid = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/count/irbid
 `
      );

      if (res.data.success) {
        setNumIrbid(res.data.result[0].Address);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ------
  // ------------------------------------------------------------------------------
  const countNumAll = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/count/all
 `
      );

      if (res.data.success) {
        setNumAll(res.data.result[0].Address);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ------

  useEffect(() => {
    //if (place) {
    getHallByAddress();
    //}
  }, [place]);
  useEffect(() => {
    countNumAmman();
    countNumIrbid();
    countNumAll();
  }, []);
  useEffect(() => {
    // if (allHalls) {
    getAllHalls();
    // }
  }, [allHalls]);

  const convertToDetailsHall = (id) => {
    navigate(`/Hall-Details/${id}`);
  };













  return (
    <>
      <br />
      <div className="containerAllHalls">
        <div className="list-container">
          <div className="left-col-list">
            <pre>{numAll - 1}+ options</pre>
            <h1>Recommended Halls In Jordan</h1>
            {/* <div key={i} className="hall">
           
          </div> */}

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
                    <div key={i} className="hall">
                      <div className="hall-img">
                        <img
                          src={element.hall_image}
                          onClick={() => {
                            convertToDetailsHall(element.id);
                          }}
                        />
                      </div>
                      <div className="hall-info">
                        <p>name Hall</p>
                        <h3>{element.hall_name}</h3>
                        <p>{element.hall_description}</p>
                        <div className="hall-price">
                          {/* <p>2 Guest</p> */}
                          <h4 className="priceBeforeDiscount">
                            ${element.price}
                            <span className="price">
                              ${element.PriceBeforeDiscount}
                            </span>
                          </h4>
                        </div>
                      </div>
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
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
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
                                    onChange={(e) =>
                                      setHall_image(e.target.value)
                                    }
                                    type="text"
                                    // defaultValue={element.hall_image}
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="Image Link"
                                  />
                                  <label for="floatingInputValue">
                                    Image Link
                                  </label>
                                </form>

                                <br />
                                <form className="form-floating">
                                  <input
                                    onChange={(e) =>
                                      setHall_name(e.target.value)
                                    }
                                    type="text"
                                    // defaultValue={element.hall_name}
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="Hall Name"
                                  />
                                  <label for="floatingInputValue">
                                    Hall Name
                                  </label>
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
                                  <label for="floatingInputValue">
                                    Video Link
                                  </label>
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
                                        onChange={(e) =>
                                          setPrice(e.target.value)
                                        }
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
                                  <label for="floatingSelect">
                                    Select Address
                                  </label>
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
                      <button onClick={() => deleteHallById(element.id)}>
                        delete
                      </button>
                    </div>
                  </>
                ))}
          </div>
          <div className="right-col-list">
            <div className="sidebar">
              <h2>Select Filters</h2>
              <h3>Choose the province</h3>
              <div className="filter">
                <input
                  type="checkbox"
                  onClick={() => {
                    setALLHalls(true);
                    setPlace(false);
                    setNum(1);
                  }}
                />{" "}
                <p>All Halls</p> <span>({numAll})</span>
              </div>
              <div className="filter">
                <input
                  type="checkbox"
                  onClick={() => {
                    setALLHalls(false);

                    setPlace(`amman`);
                    setNum(1);
                  }}
                />{" "}
                <p>Amman</p> <span>({numAmman})</span>
              </div>
              <div className="filter">
                <input
                  type="checkbox"
                  onClick={() => {
                    setALLHalls(false);

                    setPlace(`Irbid`);
                    setNum(1);
                  }}
                />{" "}
                <p>Irbid</p> <span>({numIrbid})</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Zarqa</p> <span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Salt</p> <span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Ma'an</p> <span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Jerash</p> <span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Mafraq</p> <span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Madaba</p> <span>(0)</span>
              </div>

              <h3>Additional options</h3>
              <div className="filter">
                <input type="checkbox" /> <p>Tafila</p> <span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Karak</p> <span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Aqapa</p> <span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Gawr</p> <span>(0)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    
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
