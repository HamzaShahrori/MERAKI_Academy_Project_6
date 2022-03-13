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

  useEffect(() => {
    getAllHallsHasDiscount();
  });

  //   console.log(state.hallsWithDiscount);
  return (
    <>
      <br />
      <br />
      <br />
      {/* <div className="container"> */}
      <div className="row">
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
              <div
                key={i}
                className="card col-12 col-sm-6 col-md-4 col-lg-3 

              "
                style={{ width: "18rem" }}
              >
                <img src={element.hall_image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{element.hall_name}</h5>
                  <p className="card-text beforeDiscount">
                    {element.PriceBeforeDiscount}
                  </p>
                  <p className="card-text">{element.price}</p>

                  <Link to="/" className="btn btn-primary">
                    Booking Now
                  </Link>
                </div>
              </div>
            ))}
      </div>
      {/* </div> */}
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
