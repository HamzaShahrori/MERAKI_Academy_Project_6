import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHallsHasDiscount } from "../../reducer/halls/index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Discount.css";

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

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="containerAllHalls ">
        <div className="list-container ">
          <div className="left-col-list ">
            <h1>Recommended Halls In Jordan</h1>

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
        </div>
      </div>
      <div className="containerPag">
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

        {num == 1 &&
        state.hallsWithDiscount &&
        state.hallsWithDiscount.length == 4 ? (
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
export default AllHallsWithDiscount;
