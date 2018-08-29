import React, { Component } from 'react';
import axios from 'axios';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
  constructor() {
    super();
    this.state = {
      profiles: false,
      profile: '',
      key: ''
    };
  }

  componentDidMount = () => {
    axios
      .get('/api/profile/all')
      .then(res => {
        console.log(res.data);
        this.setState({
          profiles: true,
          profile: res.data
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  render() {
    console.log('I am in profile.js' + this.state.profile[0]);
    return (
      <div className="Profile">
        <div
          className="container"
          style={{ marginTop: '100px', marginBottom: '100px' }}
        >
          <div className="ro">
            <div className="col-md-12">
              <h5 className="display-4 text-center">FreeLancer's Profile</h5>
              <p className="lead text-center">Browse and connect!!</p>
              {this.state.profiles ? (
                <ProfileItem profile={this.state.profile} />
              ) : (
                <h4>No profile found</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profiles;
