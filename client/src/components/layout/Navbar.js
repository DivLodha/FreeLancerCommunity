import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userLogout, isLoggedIn, userInfo } from "../auth/authentication";

class Navbar extends Component {
  logout = e => {
    userLogout();
    window.location.href = "/";
  };

  render() {
    const full_name = isLoggedIn() ? userInfo().full_name : null;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark mb-4 navbar-fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            FreeLancer Community
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  FreeLancers
                </Link>
              </li>
            </ul>
            {isLoggedIn() ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link">{full_name}</a>
                </li>
                <li className="nav-item">
                  <button onClick={this.logout} className="btn btn-warning">
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

/*import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { userLogout, isLoggedIn, userInfo } from "../helpers/authentication";
class Header extends Component {
  logout = e => {
    userLogout();
    window.location.href = "/";
  };

  render() {
    const full_name = isLoggedIn() ? userInfo().full_name : null;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to={"/about"}
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to={"/users/"}
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
        {isLoggedIn() ? (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link">{full_name}</a>
            </li>
            <li className="nav-item">
              <button onClick={this.logout} className="btn btn-warning">
                Logout
              </button>
            </li>
          </ul>
        ) : null}
      </nav>
    );
  }
}

export default Header;
 */
