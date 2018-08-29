import React, { Component } from 'react';

class ProfileGithub extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <h1>Click to go to Github account</h1>
        <a href={username}>{username}</a>
      </div>
    );
  }
}

export default ProfileGithub;
