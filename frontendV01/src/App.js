import React, { useState } from "react";
import "./App.css";
//
import { Routes, Route } from "react-router-dom";
import Navigation from "./component/NabBar/Navigation";
import New from "./component/NewHalls/New";
import Home from "./component/Home/Home";
function App() {
  return (
    <>
    <Navigation/>
      <Routes>
        <Route path="/new" element={<New />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
