import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { setHalls } from "../../reducer/halls/index";

const Address = ({ num, setNum, place, searchHall, setALLHalls, setPlace }) => {
  const [message, setMessage] = useState("");
  const [numAll, setNumAll] = useState(0);
  const [numAmman, setNumAmman] = useState(0);
  const [numIrbid, setNumIrbid] = useState(0);

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      halls: state.hallsReducer.halls,
    };
  });

  const dispatch = useDispatch();
  const { address } = useParams();
  const navigate = useNavigate();

  console.log(place);

  const getHallByAddress = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/halls/page/hall_address/?page=${num}&hall_address=${address}`,
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

  const convertToDetailsHall = (id) => {
    navigate(`/Hall-Details/${id}`);
  };

  //address
  const convertToHallsAddress = (address) => {
    navigate(`/halls/${address}`);
  };

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
    countNumAmman();
    countNumIrbid();
    countNumAll();
  }, []);

  useEffect(() => {
    getHallByAddress();
  }, [num,address]);

  console.log(num);
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
                          style={{ cursor: "pointer" }}
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
                          <h4 className="priceBeforeDiscount">
                            ${element.price}
                            {element.PriceBeforeDiscount == null ? (
                              <></>
                            ) : (
                              <span className="price">
                                ${element.PriceBeforeDiscount}
                              </span>
                            )}
                          </h4>
                        </div>
                      </div>
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
                   navigate("/all")
                  }}
                />{" "}
                <p>All Halls</p> <span>({numAll})</span>
              </div>
              <div className="filter">
                <input
                  type="checkbox"
                  onClick={() => {
                    convertToHallsAddress("Amman");
                  }}
                />{" "}
                <p>Amman</p> <span>({numAmman})</span>
              </div>
              <div className="filter">
                <input
                  type="checkbox"
                  onClick={() => {
                    convertToHallsAddress("Irbid");
                  
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

      <div className="containerPag">
        {" "}
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
        {num == 1 && state.halls && state.halls.length == 4 ? (
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
      </div>
    </>
  );
};

export default Address;
