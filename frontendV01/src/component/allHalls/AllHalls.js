import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHalls, updateHalls, deleteHalls } from "../../reducer/halls/index";
import { useNavigate } from "react-router-dom";

const AllHalls = ({ num, setNum, search }) => {
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
      console.log("res", res.data);
      if (!res.data.success) {
        if (num == 0) {
          setNum(num + 1);
        } else {
          setNum(num - 1);
        }
      }
      if (res.data.success) {
        dispatch(setHalls(res.data.result));
        console.log(res.data.result);
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
    try {
      const result = await axios.put(`http://localhost:5000//halls/${id}`, {
        hall_image,
        hall_name,
        video,
        hall_description,
        hall_address,
        price,
        discount,
        priceBeforeDiscount,
      });
      dispatch(updateHalls(result.data.results));
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
  console.log(state.halls);

  return (
    <>
      {state.halls &&
        state.halls
          .filter((hallinfo) => {
            if ((search = "")) {
              return hallinfo;
            } else if (
              hallinfo.hall_address
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              hallinfo.hall_name.toLowerCase().includes(search.toLowerCase())
            ) {
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
                  updateHallById(hallId);
                }}
              >
                update
              </button>
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
