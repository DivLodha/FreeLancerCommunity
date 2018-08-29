import React, { Component } from 'react';
import isEmpty from '../Validation/validation';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItem = experience.map(exp => {
      return (
        <li key={exp._id} className="list-group-item">
          <h4>{exp.company}</h4>
          <p>
            <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{' '}
            {!exp.current ? (
              <Moment format="DD/MM/YYYY">{exp.to}</Moment>
            ) : (
              <p>Current</p>
            )}
          </p>
          <p>
            <strong>Position : {exp.title}</strong>
          </p>
          <p>
            {isEmpty(exp.location) ? null : (
              <span>
                <strong>Location : {exp.location}</strong>
              </span>
            )}
          </p>
          <p>
            {isEmpty(exp.description) ? null : (
              <span>
                <strong>Description : {exp.description}</strong>
              </span>
            )}
          </p>
        </li>
      );
    });

    const eduItem = education.map(edu => {
      return (
        <li key={edu._id} className="list-group-item">
          <h4>{edu.school}</h4>
          <p>
            <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{' '}
            {!edu.current ? (
              <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            ) : (
              <p>Current</p>
            )}
          </p>
          <p>
            <strong>Degree : {edu.degree}</strong>
          </p>
          <p>
            <strong>Field of Study : {edu.fieldofstudy}</strong>
          </p>

          <p>
            {isEmpty(edu.description) ? null : (
              <span>
                <strong>Description : {edu.description}</strong>
              </span>
            )}
          </p>
        </li>
      );
    });

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="tex-center text-info">Experience</h3>
          {expItem.length > 0 ? (
            <ul className="list-group">{expItem}</ul>
          ) : (
            <p className="text-center">No experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="tex-center text-info">Education</h3>
          {eduItem.length > 0 ? (
            <ul className="list-group">{eduItem}</ul>
          ) : (
            <p className="text-center">No education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
