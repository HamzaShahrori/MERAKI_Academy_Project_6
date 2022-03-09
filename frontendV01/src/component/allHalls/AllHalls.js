import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHalls } from "../../reducer/halls/index";
import { useNavigate } from "react-router-dom";

const AllHalls = ({ num, setNum, searchHall }) => {
  const [message, setMessage] = useState("");

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
      const res = await axios.get(`http://localhost:5000/halls/page?page=${num}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
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
  //  console.log("info",hallinfo);
  // console.log("seARCH",searchHall); //

            if ((searchHall == "")) {

              return hallinfo;

            } else if (
              hallinfo.hall_address
                .toLowerCase()
                .includes(searchHall.toLowerCase()) ||
              hallinfo.hall_name.toLowerCase().includes(searchHall.toLowerCase())
            ) {
              console.log("after",searchHall); //

              return hallinfo;
            }
          })
          .map((element, i) => (
            <div key={i}>
              <img src={element.image}></img>
              <p>{element.hall_name}</p>
              <video>{element.video}</video>
              <p>{element.hall_description}</p>
              <p>{element.price}</p>
              <p>{element.discount}</p>
              <p>{element.PriceBeforeDiscount}</p>
            </div>
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
