import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHalls } from "../../reducer/halls/index";
import { useNavigate } from "react-router-dom";

const AllHalls = () => {
  const state = useSelector((state) => {
    return {
      halls: state.hallsReducer.halls,
    };
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllHalls = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/page`
        // { headers: { Authorization: `Bearer ${state.token}` } }
      );
      if (res.data.success) {
        dispatch(setHalls(res.data.result));
      }
    } catch (error) {
      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };
  return (
    <>
      {state.halls &&
        state.halls.map((element, i) => {
          <div key={i}></div>;
        })}
    </>
  );
};
export default AllHalls;
