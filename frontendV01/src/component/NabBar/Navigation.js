import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducer/login";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
const Navigation = ({ setSearchHall, setPlace, setAllHalls, setNum }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const logout = () => {
    state.isLoggedIn = false;
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };
  ////
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
              <li className="nav-item">
                <Link to="/new" className="nav-link">
                  Add Hall
                </Link>
              </li>
              {state.isLoggedIn ? (
                <>
                  <li onClick={logout} className="nav-item">
                    <Link to="/" className="nav-link">
                      {" "}
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
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
                </>
              )}
              {/* <li class="nav-item">
                <Link
                  to="/all"
                  class="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    setAllHalls(true);
                    setPlace(false);
                    setNum(1);
                  }}
                >
                  all
                </Link>
              </li> */}

              <li class="nav-item dropdown">
                <Link
                  to="/all"
                  class="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">

<li>
                <Link
                  to="/all"
                  class="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    setAllHalls(true);
                    setPlace(false);
                    setNum(1);
                  }}
                > 
                  all
                </Link>
                </li>



                  <li>
                    <Link
                      to="/address"
                      class="dropdown-item"
                      onClick={() => {
                        setAllHalls(false);
                        setPlace(`Amman`);
                        setNum(1);
                      }}
                    >
                      Amman
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/all"
                      class="dropdown-item"
                      onClick={() => {
                        setAllHalls(false);

                        setPlace(`Irbid`);
                        setNum(1);
                      }}
                    >
                      Irbid
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      to="/all"
                      class="dropdown-item"
                      onClick={() => {
                        setAllHalls(false);

                        setPlace(`else`);
                        setNum(1);
                      }}
                    >
                      Something else here
                    </Link>
                  </li>


                





                </ul>
              </li>

              <li>
                    <Link
                      to="/address"
                      class="dropdown-item"
                      onClick={() => {
                        setAllHalls(false);

                        setPlace(`else`);
                        setNum(1);
                      }}
                    >
Test                    </Link>
                  </li>



              {/* <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li> */}
            </ul>
            <form class="d-flex">
              <input
                onChange={(e) => {
                  setSearchHall(e.target.value);
                }}
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
