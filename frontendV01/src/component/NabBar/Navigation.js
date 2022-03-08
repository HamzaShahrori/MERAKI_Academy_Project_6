import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/home">Home</Link>
      <Link to="/new">new</Link>
    </>
  );
};

export default Navigation;
