import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducer/login";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
const Navigation = ({
  setSearchHall,
  setPlace,
  setAllHalls,
  setNum,
  userId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      halls: state.hallsReducer.halls,
    };
  });
  const detailsBooking = (id = userId) => {
    navigate(`/details-booking/${id}`);
  };

  const logout = () => {
    state.isLoggedIn = false;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("hall-id");
    localStorage.removeItem("publishing");
    dispatch(logoutUser());
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Happy Wedding
          </Link>
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
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all"
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    setAllHalls(true);
                    setPlace(false);
                    setNum(1);
                  }}
                >
                  Wedding Halls
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                onChange={(e) => {
                  setSearchHall(e.target.value);
                }}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            {localStorage.getItem("publishing") == 1 ? (
              <li
                className="nav-item"
                style={{ listStyle: "none" }}
                onClick={() => detailsBooking(localStorage.getItem("userId"))}
              >
                <a className="nav-link" style={{ cursor: "pointer" }} id="link">
                  Profile
                </a>
              </li>
            ) : (
              <></>
            )}
            {state.isLoggedIn ? (
              <>
                <li
                  onClick={logout}
                  className="nav-item"
                  style={{ listStyle: "none" }}
                >
                  <Link to="/" className="nav-link" id="link">
                    {" "}
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item" style={{ listStyle: "none" }}>
                  <Link to="/register" className="nav-link" id="link">
                    {" "}
                    Register
                  </Link>
                </li>
                <li className="nav-item" style={{ listStyle: "none" }}>
                  <Link to="/login" className="nav-link" id="link">
                    {" "}
                    Login
                  </Link>
                </li>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
