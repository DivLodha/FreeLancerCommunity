import React, { Component } from "react";
import { isLoggedIn, userInfo, getToken } from "./authentication";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: isLoggedIn(),
      profile: false
    };
  }

  componentDidMount() {
    axios
      .get("/api/profile", {
        headers: {
          Authorization: getToken(),
          "Access-Control-Allow-Headers": ""
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          profile: true
        });
      })
      .catch(err => {
        console.log(err.response.data);
        console.log(getToken());
      });
  }

  render() {
    const full_name = isLoggedIn() ? userInfo().full_name : null;
    return (
      <div style={{ marginTop: "100px" }}>
        {this.state.loggedIn ? null : alert("You are not loggedIn")}
        {this.state.loggedIn ? null : <Redirect to="/login/" />}
        {this.state.profile ? (
          <div className="Dashboard">
            <p className="lead text-muted">Welcome {full_name}</p>
            <p>Here is your profile!!!</p>
          </div>
        ) : (
          <div className="Dashboard">
            <p className="lead text-muted">Welcome {full_name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/createprofile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
/*import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    axios
    .get('/api/profile')
    .then(res =>
      
        payload: res.data
    )
    .catch(err =>
      
        payload: {}
      
    );
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);



import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

*/
