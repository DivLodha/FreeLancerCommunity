import React, { Component } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: ''
    };
  }

  componentDidMount = () => {
    if (this.props.match.params.handle) {
      axios
        .get(`/api/profile/handle/${this.props.match.params.handle}`)
        .then(res => {
          console.log(res.data);
          this.setState({
            profile: res.data
          });
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  };

  render() {
    let profileContent;

    if (this.state.profile === '') {
      profileContent = <h4>Profile loading .........</h4>;
    } else {
      profileContent = (
        <div>
          <ProfileHeader profile={this.state.profile} />
          <ProfileAbout profile={this.state.profile} />
          <ProfileCreds
            education={this.state.profile.education}
            experience={this.state.profile.experience}
          />
          {this.state.profile.githubusername ? (
            <ProfileGithub username={this.state.profile.githubusername} />
          ) : null}
          <br />
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-dark mb-3 float-left">
                Back to profiles
              </Link>
            </div>
            <div className="md-6" />
          </div>
        </div>
      );
    }
    return (
      <div className="profile">
        <div
          className="container"
          style={{ marginTop: '60px', marginBottom: '60px' }}
        >
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
