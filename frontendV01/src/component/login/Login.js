import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reducer/login";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Login = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const userLogin = { email, pass };

  const login = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", userLogin)

      .then(async (result) => {
        dispatch(loginUser(result.data.token));

        localStorage.setItem("token", result.data.token);
        navigate("/");
      })

      .catch((err) => {
        console.log(err.response.data.message);

        setMessage(err.response.data.message);
      });
  };

  return (
    <>
      <br />
      <br />
      <br />
      <div className="container">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              onChange={(e) => {
                setPass(e.target.value);
              }}
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button onClick={login} type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>

    
      </div>
    </>
  );
};
export default Login;
