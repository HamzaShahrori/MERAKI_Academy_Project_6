import React, { useState } from "react";
import "./App.css";
//
import { Routes, Route } from "react-router-dom";
import Navigation from "./component/NabBar/Navigation";
//
import 'bootstrap/dist/css/bootstrap.min.css';
import New from "./component/NewHalls/New";
import Home from "./component/Home/Home";
import Login from "./component/login/Login";

import Register from "./component/register/Register";

import AllHalls from "./component/allHalls/AllHalls";
function App() {

  const [num, setNum] = useState(1);
  const [categoryNav,setCategory] = useState("")
  const [search,setSearch] = useState("")
  return (
    <>
    <Navigation setSearch={setSearch}/>
      <Routes>
        <Route path="/new" element={<New />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all" element={<AllHalls num = {num} setNum={setNum} search={search} />} />
      </Routes>
    </>
  );
}

export default App;
