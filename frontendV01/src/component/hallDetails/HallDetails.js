import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./HallDetails.css";
import { useNavigate } from "react-router-dom";
import { setHall } from "../../reducer/halls/index";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { FiUsers } from "react-icons/fi";

import ReactStars from "react-rating-stars-component";
const HallDetails = () => {
  const [hall_rating, setHall_Rating] = useState(0);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      halls: state.hallsReducer.halls,
      hallById: state.hallsReducer.hallById,
    };
  });
  const navigate = useNavigate();
  const convertToBookingHall = (id) => {
    navigate(`/Hall-Booking/${id}`);
  };
  const { id } = useParams();
  const dispatch = useDispatch();

  //-------
  const getHallById = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/halls/${id}`);
      dispatch(setHall(result.data.result));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getHallById();
  }, []);

  const getStarRating = () => {
    axios
      .get(`http://localhost:5000/halls/rating/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        setHall_Rating(result.data.result[0].AverageRating);
        getStarRating();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStarRating();
  }, []);

  const thirdExample = {
    size: 40,
    count: 5,
    isHalf: false,
    value: 0,
    color: "black",
    activeColor: "yellow",
    onChange: (newValue) => {
      const hall_rating = newValue;
      console.log(newValue);
      console.log(`Example 3: new value is ${newValue}`);
      axios
        .post(
          `http://localhost:5000/halls/rating/${id}`,
          { hall_rating },
          { headers: { Authorization: `Bearer ${state.token}` } }
        )
        .then((result) => {
          setMessage("done");
        })

        .catch((err) => {
          console.log("err", err);
        });
    },
  };

  const getRatingCountById = () => {
    axios
      .get(`http://localhost:5000/count/ratingcount/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        console.log(result.data.result[0].ratingCount);
        setCount(result.data.result[0].ratingCount);
        getRatingCountById();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRatingCountById();
  }, []);

  return (
    <>
      <div className="hall_details">
        {state.hallById &&
          state.hallById.map((element, i) => (
            <>
              <div className="hall_title">
                <h1>{element.hall_name}</h1>
                <div className="row_hallDetails">
                  <div>
                    <p>{element.hall_address}</p>
                  </div>
                </div>
              </div>

              <div className="gallery_hallDetails">
                <div className="gallery_hallDetails-video">
                  <video width="100%" controls autoPlay id="video">
                    <source src={element.video} type="video/mp4" />
                  </video>

                  <div className="divstar">
                    <div className="starRating">
                      <ReactStars {...thirdExample} />
                    </div>
                    <div className="hall_ratingDiv">
                      <p>({hall_rating}/5)</p>
                    </div>
                    <div className="divCount">
                      <FiUsers className="userIcon"></FiUsers>
                      <p className="countP">{count}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <img src={element.hall_image} />
                </div>
                <div style={{transform:"translate(0em,-3em)"}}>{element.hall_description}</div>
              </div>
              <div className="small-details">
                <h2>{element.price}$</h2>
                <button
                  className="btnDetails"
                  onClick={() => convertToBookingHall(element.id)}
                >
                  Booking Now
                </button>
              </div>

              <hr className="lineDetails" />
            </>
          ))}
        {/* {message} */}
      </div>
    </>
  );
};

export default HallDetails;
