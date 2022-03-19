import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
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

  
      <div className="registerContainer">
        <div className="left-register">
          <form onSubmit={addNewUser}>
            <h2 className="sign">SIGN UP</h2>
            <br />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="input"
                placeholder="First Name"
                style={{ width: "20rem" }}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="input"
                placeholder="Last Name"
                style={{ width: "20rem" }}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="input"
                placeholder="Country"
                style={{ width: "20rem" }}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="input"
                placeholder="Email"
                style={{ width: "20rem" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="input"
                placeholder="Password"
                style={{ width: "20rem" }}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="checkbox" >
              <label id="check">
                <input
                  type="checkbox"
                  onClick={() => {
                    setPublishing(1);
                  }}
                />{" "}
                Publisher
              </label>
              <label id="checkbox">
                <input
                  type="checkbox"
                  style={{ marginLeft: "1rem", marginTop: "1rem" }}
                  onClick={() => {
                    setReservation(1);
                  }}
                />{" "}
                Reservations
              </label>
            </div>
            <button
              type="submit"
              className="btn4"
              style={{ marginTop: "1rem" }}
            >
              SIGN UP
            </button>
            <button
              type="submit"
              className="btn6"
              style={{ marginTop: "1rem" }}
            >
              <Link to="/login" id="btn6">
                {" "}
                SIGN IN
              </Link>
            </button>
          </form>

          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && (
                <div
                  className="alert alert-danger"
                  role="alert"
                  style={{ width: "20rem", marginTop: "1rem" }}
                >
                  {message}
                </div>
              )}
        </div>

        <div className="right-register">
          {/* <p className="newhere">Login and discover our website</p> */}
          {/* <p className="wordSign">
   
  </p> */}

          {/* <img src= "./image/reg.png" className="registerImg" alt="logo"/> */}

          {/* <button type="submit" class="btn btn-primary">

  <Link to="/login" className="link">
      Sign In
    </Link>
  </button> */}
        </div>

        {/* 
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>} */}
      </div>
    </>
    // </div>
    // </>
  );
};

export default Register;
