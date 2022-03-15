import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHallsHasDiscount } from "../../reducer/halls/index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AllHallsWithDiscount = ({ num, setNum, searchHall }) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      hallsWithDiscount: state.hallsReducer.hallsWithDiscount,
    };
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllHallsHasDiscount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/halls/page/Home?page=${num}`,
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
        dispatch(setHallsHasDiscount(res.data.result));
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
        console.log(error);
      }
    }
  };



  const convertToDetailsHall = (id) => {
    navigate(`/Hall-Details/${id}`);
  };

  useEffect(() => {
    getAllHallsHasDiscount();
  });

  //   console.log(state.hallsWithDiscount);
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="containerAllHalls">
        <div className="list-container">
          <div className="left-col-list">
            {/* <pre>{numAll - 1}+ options</pre> */}
            <h1>Recommended Halls In Jordan</h1>
            {/* <div key={i} className="hall">
           
          </div> */}

            {state.hallsWithDiscount &&
              state.hallsWithDiscount
                .filter((hallInfo) => {
                  if (searchHall == "") {
                    return hallInfo;
                  } else if (
                    hallInfo.hall_address
                      .toLowerCase()
                      .includes(searchHall.toLowerCase()) ||
                      hallInfo.hall_name
                      .toLowerCase()
                      .includes(searchHall.toLowerCase())
                  ) {
                    console.log("after", searchHall); //

                    return hallInfo;
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
                      
                    
                   
                    </div>
                  </>
                ))}
          </div>
          {/* <div className="right-col-list">
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
          </div> */}
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
export default AllHallsWithDiscount;
