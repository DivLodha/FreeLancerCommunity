import React, { Component } from "react";
import { isLoggedIn } from "./authentication";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: isLoggedIn()
    };
  }
  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        {this.state.loggedIn ? null : alert("You are not loggedIn")}
        {this.state.loggedIn ? null : <Redirect to="/login/" />}
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
