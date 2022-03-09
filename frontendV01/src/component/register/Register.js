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
    <br/>
    <br/>
    <br/>

      <div className="Form">
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
          </form>
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
        </>
      </div>
      
    </>
  );
};

export default Register;
