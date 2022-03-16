import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./HallDetails.css";
import { useNavigate } from "react-router-dom";
import { setHall } from "../../reducer/halls/index";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
const HallDetails = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      halls: state.hallsReducer.halls,
      hallById: state.hallsReducer.hallById,
    };
  });
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const convertToBookingHall = (id) => {
    navigate(`/Hall-Booking/${id}`);
  };
  const { id } = useParams();
  const dispatch = useDispatch();

  //   /-------
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
                <video width="100%" controls  autoPlay id="video">
    
    <source src={element.video} type="video/mp4"/>
    </video> 
                </div>
                <div>
                  <img src={element.hall_image} />
                </div>
                <div>{element.hall_description}</div>
                {/* <div><img src={element.hall_image}/></div>
  <div><img src={element.hall_image}/></div>  */}
              </div>
              <div className="small-details">
                <h2>{element.price}$</h2>
                <button className="btnDetails" onClick={() => convertToBookingHall(element.id)}>
                  Booking
                </button>
              </div>

              <hr className="lineDetails" />

              {/* <div className="detailImg">
                    <img
                      className="leftSide"
                      src={element.hall_image}
                      alt="hallImage"
                      width="100%"
                    />
                  </div> */}

              {/* <p className="hallDetails">Hall</p> */}
              {/* <p>{element.hall_name}</p> */}
              {/* <p className="hallDetails">Description</p> */}
              {/* <p>{element.hall_description}</p> */}
              {/* <p className="hallDetails">Address</p> */}
              {/* <p>{element.hall_address}</p> */}
              {/* <p className="hallDetails">Price</p> */}
              {/* <p>{element.price}</p> */}
            </>
          ))}
      </div>
    </>
  );
};

export default HallDetails;
