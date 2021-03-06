import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { Redirect } from "react-router-dom";
//import { isLoggedIn } from "../auth/authentication";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div
                className="col-md-12 text-center"
                style={{ marginTop: "200px" }}
              >
                <h1 className="display-3 mb-4">FreeLancer Community</h1>
                <p className="lead">
                  {" "}
                  Create your profile, share posts and get help from other
                  developers.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
