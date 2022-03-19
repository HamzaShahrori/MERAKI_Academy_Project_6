import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducer/login";
import "./Login.css";
import { FaUser } from "react-icons/fa";
import { IoIosKey } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
const Login = ({ setUserId }) => {
  // const state = useSelector((state) => {
  //   return {
  //     isLoggedIn: state.loginReducer.isLoggedIn,
  //     token: state.loginReducer.token,
  //   };
  // });
  ////
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
        localStorage.setItem("publishing", result.data.result[0].publishing);
        navigate("/");

        setUserId(result.data.result[0].id);
        localStorage.setItem("userId", result.data.result[0].id);
      })
      .catch((err) => {
        console.log(err.response.data.message);

        setMessage(err.response.data.message);
      });
  };

  return (
    <>
      <br />
      {/* <br /> 
     <br />  */}
      <div className="cont">
        <div className="left">
          <form style={{ width: "20rem" }}>
            <h2 className="login">Welcome Back!</h2>
            <h6 className="welcome">Login to continue</h6>
            <p className="or">
              <span></span>
            </p>
            <div class="mb-3" id="mb-3">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Email"
                className="email"
              />
              <button className="user">
                <FaUser />
              </button>
              {/* <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div> */}
            </div>{" "}
            <div class="mb-3" id="mb-3">
              <input
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                placeholder="Password"
                type="password"
                className="password"
              />{" "}
              <button className="user">
                <IoIosKey />
              </button>
            </div>
            
            <button onClick={login} type="submit" className="btn">
              LOGIN
            </button>
            <button
          
              type="submit"
              className="btn3"
              style={{ marginTop: "1rem" }}
            >
              <Link to="/register" id="btn3"> SIGN UP</Link>
             
            </button>
          </form>
          {message ? (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ width: "20rem", marginTop: "1rem" }}
            >
              {message}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default Login;
