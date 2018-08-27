import React, { Component } from "react";
import Moment from "react-moment";
import axios from "axios";
import { getToken, isLoggedIn } from "../auth/authentication";
import { Redirect } from "react-router-dom";

class Education extends Component {
  onDeleteExp(id) {
    if (window.confirm("Are you sure? This cannot be undone!")) {
      axios
        .delete(`/api/profile/education/$id`, {
          headers: {
            Authorization: getToken(),
            "Access-Control-Allow-Headers": ""
          }
        })
        .then(res => {
          console.log(res.data);
          window.location.reload();
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  }

  render() {
    let education = this.props.education.map(exp => {
      return (
        <tr key={exp._id}>
          <td>{exp.school}</td>
          <td>{exp.degree}</td>
          <td>{exp.fieldofstudy}</td>
          <td>
            <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
            {!exp.current ? (
              <Moment format="DD/MM/YYYY">{exp.to}</Moment>
            ) : (
              <p>Current</p>
            )}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={this.onDeleteExp.bind(this, exp._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        {isLoggedIn() ? null : alert("You are not loggedIn")}
        {isLoggedIn() ? null : <Redirect to="/login/" />}

        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field Of Study</th>
              <th>Years</th>
              <th />
            </tr>

            {education}
          </thead>
        </table>
      </div>
    );
  }
}

export default Education;
