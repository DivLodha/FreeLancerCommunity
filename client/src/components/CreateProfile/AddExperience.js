import React, { Component } from "react";
import { isLoggedIn, getToken } from "../auth/authentication";
import { Link } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AddExperience extends Component {
  constructor() {
    super();
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false,
      expAdded: false
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    axios
      .post("/api/profile/experience", expData, {
        headers: {
          Authorization: getToken()
        }
      })
      .then(res => {
        this.setState({
          expAdded: true
        });
        console.log(res.data);
      })
      .catch(err => {
        this.setState({ errors: err.response.data });
        console.log(err.response.data);
      });
  };

  render() {
    const { errors } = this.state;

    return (
      <div
        className="container"
        style={{ marginTop: "80px", marginBottom: "80px" }}
      >
        {isLoggedIn() ? null : alert("You are not loggedIn")}
        {isLoggedIn() ? null : <Redirect to="/login/" />}
        {this.state.expAdded ? <Redirect to="/dashboard/" /> : null}
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-dark">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Your Experience</h1>
            <p className="lead text-center">
              Add any developer/programming positions that you have had in the
              past.
            </p>
            <small className="d-block pb-3">* = required field</small>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.company
                  })}
                  value={this.state.company}
                  onChange={this.onChange}
                  placeholder="* Company"
                  name="company"
                />
                {errors.company && (
                  <div className="invalid-feedback">{errors.company}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.title
                  })}
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder="* Job Title"
                  name="title"
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.location
                  })}
                  value={this.state.location}
                  onChange={this.onChange}
                  placeholder="Job location"
                  name="location"
                />
                {errors.location && (
                  <div className="invalid-feedback">{errors.location}</div>
                )}
              </div>

              <h6>From Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.from
                  })}
                  value={this.state.from}
                  onChange={this.onChange}
                  name="from"
                />
                {errors.from && (
                  <div className="invalid-feedback">{errors.from}</div>
                )}
              </div>
              <h6>To Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.to
                  })}
                  value={this.state.to}
                  onChange={this.onChange}
                  name="to"
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                {errors.to && (
                  <div className="invalid-feedback">{errors.to}</div>
                )}
              </div>
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.onCheck}
                  id="current"
                />
                <label className="form-check-label" htmlFor="current">
                  Current Job
                </label>
              </div>
              <div className="form-group">
                <textarea
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.description
                  })}
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder="Job Description"
                  name="description"
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
                <small className="form-text text-muted">
                  Some of your responsibilities, etc
                </small>
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddExperience;
