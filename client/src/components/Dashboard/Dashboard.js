import React, { Component } from 'react';
import {
  isLoggedIn,
  userInfo,
  getToken,
  userLogout
} from '../auth/authentication';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProfileActions from '../CreateProfile/ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      profile: false,
      handle: '',
      exp: '',
      edu: ''
    };
  }

  onDeleteClick = e => {
    if (window.confirm('Are you sure? This cannot be undone!')) {
      axios
        .delete('/api/profile', {
          headers: {
            Authorization: getToken(),
            'Access-Control-Allow-Headers': ''
          }
        })
        .then(res => {
          userLogout();
          window.location.reload();
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  };

  componentDidMount() {
    axios
      .get('/api/profile', {
        headers: {
          Authorization: getToken(),
          'Access-Control-Allow-Headers': ''
        }
      })
      .then(res => {
        this.setState({
          profile: true,
          handle: res.data.handle,
          exp: res.data.experience,
          edu: res.data.education
        });
      })
      .catch(err => {
        if (err.response.data === 'Unauthorized') {
          userLogout();
          window.location.reload();
        }
        console.log(err.response.data);
      });
  }

  render() {
    const full_name = isLoggedIn() ? userInfo().full_name : null;
    return (
      <div style={{ marginTop: '100px' }}>
        {isLoggedIn() ? null : alert('You are not loggedIn')}
        {isLoggedIn() ? null : <Redirect to="/login/" />}
        {this.state.profile ? (
          <div className="Dashboard">
            <p className="lead text-muted">
              Welcome{' '}
              <Link to={`/profile/${this.state.handle}`}>
                {this.state.handle}
              </Link>
            </p>
            <ProfileActions />
            <Experience experience={this.state.exp} />
            <br />
            <br />
            <Education education={this.state.edu} />
            <div style={{ marginBottom: '60px' }} />
            <button className="btn btn-danger" onClick={this.onDeleteClick}>
              Delete My Account
            </button>
          </div>
        ) : (
          <div className="Dashboard">
            <p className="lead text-muted">Welcome {full_name}</p>
            <p>You have not yet setup your profile, please add some info.</p>
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
