import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [reservation, setReservation] = useState(0);
  const [publishing, setPublishing] = useState(0);
  const role_id = "2";
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users", {
        firstName,
        lastName,
        country,
        email,
        pass,
        reservation,
        publishing,
        role_id,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage("The user has been created successfully");
        navigate("/login");
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  return (
    <>
      <br />
      <br />
      <br />

      {/* <div className="Form">
        <>
          <p className="Title">Register:</p>
          <form onSubmit={addNewUser}>
            <br />
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />

            <br />
            <input
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            />
            <br />
            <input
              onClick={() => {
                setPublishing(1);
              }}
              class="form-check-input mt-0"
              type="checkbox"
              value=""
              aria-label="Checkbox for following text input"
            ></input>
            <span> as a publisher </span>

            <input
              onClick={() => {
                setReservation(1);
              }}
              class="form-check-input mt-0"
              type="checkbox"
              value=""
              aria-label="Checkbox for following text input"
            />
            <span> for reservations </span>

            <br />
            <button>Register</button>
            <br />
          </form> */}

      <br />

      <form   onSubmit={addNewUser}>
        <div class="form-group">
          <label for="exampleInputEmail1">First Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="First Name"
            style={{ width: "20rem" }}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="exampleInputFirstName1">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputLastName1"
            placeholder="Last Name"
            style={{ width: "20rem" }}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="exampleInputCountry1">Country</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Country"
            style={{ width: "20rem" }}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Email"
            style={{ width: "20rem" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            style={{ width: "20rem" }}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              onClick={() => {
                setPublishing(1);
              }} 
            />{" "}
            as a publisher
          </label>
          <label>
            <input
              type="checkbox"
              onClick={() => {
                setReservation(1);
              }} 
            />{" "}
            for reservations
          </label>
        </div>

        <button type="submit" class="btn btn-success">
          Register
        </button>
      </form>

      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && (
            <div
              class="alert alert-danger"
              role="alert"
              style={{ width: "20rem" }}
            >
              {message}
            </div>
          )}

      {/* 
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>} */}
    </>
    // </div>
    // </>
  );
};

export default Register;
