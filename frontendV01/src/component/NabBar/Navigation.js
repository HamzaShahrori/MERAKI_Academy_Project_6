import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducer/login";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
const Navigation = ({ setSearch }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const logout=()=>{
    state.isLoggedIn=false
    localStorage.removeItem('token')
    dispatch(logoutUser())
  }
  return (
    <>

  
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/home" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/new" className="nav-link">
                  Add Hall
                </Link>
              </li>
              {state.isLoggedIn?(<><li onClick={logout} className="nav-item">
                <Link to="/home" className="nav-link">
                  {" "}
                  Logout
                </Link>
              </li></>):( <><li className="nav-item">
                <Link to="/register" className="nav-link">
                  {" "}
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  {" "}
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/all" class="nav-link active" aria-current="page">
                  all
                </Link>
              </li>

              </li></>)}
             
              {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
              {/* <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li> */}
            </ul>
            <form class="d-flex">
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
