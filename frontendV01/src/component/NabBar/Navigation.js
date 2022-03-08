import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
const Navigation = ({setSearch}) => {

  const dispatch = useDispatch();

  return (
    <>
    <input type = "text" placeholder="Search ..." onChange={(e)=>{
          setSearch(e.target.value)
    }}></input>
      <Link to="/home">Home</Link>
      <Link to="/new">new</Link>
    </>
  );
};

export default Navigation;
