import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./HallDetails.css";
import { useNavigate } from "react-router-dom";
import { setHall } from "../../reducer/halls/index";
const HallDetails = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      halls: state.hallsReducer.halls,
      hallById: state.hallsReducer.hallById,
    };
  });
  const navigate = useNavigate();

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
    <br/>
    <br/>

    <br/>

      <div className="wrapperHall">
      {state.hallById &&
          state.hallById.map((element, i) => (
            <>

              <img
                className="leftSide"
                src={element.hall_image}
                alt="hallImage"
                width="100%"
              />
              <p>{element.hall_name}</p>
              <p>{element.hall_description}</p>
              <p>{element.hall_address}</p>
              <p>{element.price}</p>


            
            </>))}
          
          
          </div>
    
    
    
    </>)
};


export default HallDetails;
