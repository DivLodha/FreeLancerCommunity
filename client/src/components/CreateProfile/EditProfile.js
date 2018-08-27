import React, { Component } from "react";
import { isLoggedIn, getToken } from "../auth/authentication";
import classnames from "classnames";
import axios from "axios";
import { Redirect } from "react-router-dom";
import isEmpty from "../Validation/validation";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: isLoggedIn(),
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {},
      profileUpdated: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
          profile: true,
          handle: res.data.handle,
          company: !isEmpty(res.data.company) ? res.data.company : "",
          website: !isEmpty(res.data.website) ? res.data.website : "",
          location: !isEmpty(res.data.location) ? res.data.location : "",
          status: !isEmpty(res.data.status) ? res.data.status : "",
          skills: !isEmpty(res.data.skills) ? res.data.skills.join(",") : "",
          githubusername: !isEmpty(res.data.githubusername)
            ? res.data.githubusername
            : "",
          bio: !isEmpty(res.data.bio) ? res.data.bio : "",
          twitter: !isEmpty(res.data.social.twitter)
            ? res.data.social.twitter
            : "",
          facebook: !isEmpty(res.data.social.facebook)
            ? res.data.social.facebook
            : "",
          linkedin: !isEmpty(res.data.social.linkedin)
            ? res.data.social.linkedin
            : "",
          youtube: !isEmpty(res.data.social.youtube)
            ? res.data.social.youtube
            : "",
          instagram: !isEmpty(res.data.social.instagram)
            ? res.data.social.instagram
            : ""
        });
      })
      .catch(err => {
        console.log(err.response.data);
        console.log(getToken());
      });
  }

  onSubmit(e) {
    e.preventDefault();

    let token = getToken();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    console.log(profileData);

    axios
      .post("/api/profile", profileData, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({
          profileUpdated: true
        });
      })
      .catch(err => {
        this.setState({ errors: err.response.data });
        console.log(err.response.data);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    //select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    const selectOptions = options.map(option => (
      <option key={option.label} value={option.value}>
        {option.label}
      </option>
    ));

    return (
      <div
        className="create-profile"
        style={{ marginTop: "100px", marginBottom: "80px" }}
      >
        {this.state.loggedIn ? null : alert("You are not loggedIn")}
        {this.state.loggedIn ? null : <Redirect to="/login/" />}
        {this.state.profileUpdated ? <Redirect to="/dashboard/" /> : null}
        <div className="container" style={{ marginTop: "50px" }}>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 tex-center">Edit Your Profile</h1>
            </div>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.handle
                })}
                placeholder="* Profile Handle"
                name="handle"
                value={this.state.handle}
                disabled
              />
              <small className="form-text text-muted">
                A unique handle for your profile URL. You can use your full
                name, company name or nickname.
              </small>
              {errors.handle && (
                <div className="invalid-feedback">{errors.handle}</div>
              )}
            </div>
            <div className="form-group">
              <select
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.status
                })}
                placeholder="Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
              >
                {selectOptions}
              </select>
              <small className="form-text text-muted">
                Give us an idea of where you are at in your career.
              </small>
              {errors.status && (
                <div className="invalid-feedback">{errors.status}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.company
                })}
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
              />
              <small className="form-text text-muted">
                Could be your own company or one you work for.
              </small>
              {errors.company && (
                <div className="invalid-feedback">{errors.company}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.website
                })}
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
              />
              <small className="form-text text-muted">
                Could be your own website or a company one.
              </small>
              {errors.website && (
                <div className="invalid-feedback">{errors.website}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.location
                })}
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
              />
              <small className="form-text text-muted">
                City or city & state suggested (eg. Boston, MA)
              </small>
              {errors.location && (
                <div className="invalid-feedback">{errors.location}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.skills
                })}
                placeholder="*Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
              />
              <small className="form-text text-muted">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
              {errors.skills && (
                <div className="invalid-feedback">{errors.skills}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.githubusername
                })}
                placeholder="Github Username"
                name="githubusername"
                value={this.state.githubusername}
                onChange={this.onChange}
              />
              <small className="form-text text-muted">
                If you want your latest repos and a Github link, include your
                username.
              </small>
              {errors.githubusername && (
                <div className="invalid-feedback">{errors.githubusername}</div>
              )}
            </div>
            <div className="form-group">
              <textarea
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.bio
                })}
                placeholder="Short Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
              />
              <small className="form-text text-muted">
                Tell us a little about yourself.
              </small>
              {errors.bio && (
                <div className="invalid-feedback">{errors.bio}</div>
              )}
            </div>
            <div className="mb-3">
              <button
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
                className="btn btn-dark"
              >
                Add Social Network Links
              </button>
              <span className="text-muted"> Optional</span>
            </div>

            {this.state.displaySocialInputs ? (
              <div className="Social Input">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-twitter" />
                    </span>
                  </div>
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.twitter
                    })}
                    placeholder="Twitter URL"
                    name="twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                  />
                  {errors.twitter && (
                    <div className="invalid-feedback">{errors.twitter}</div>
                  )}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-facebook" />
                    </span>
                  </div>
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.facebook
                    })}
                    placeholder="Facebook URL"
                    name="facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                  />
                  {errors.facebook && (
                    <div className="invalid-feedback">{errors.facebook}</div>
                  )}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-linkedin" />
                    </span>
                  </div>
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.linkedin
                    })}
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                  />
                  {errors.linkedin && (
                    <div className="invalid-feedback">{errors.linkedin}</div>
                  )}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-youtube" />
                    </span>
                  </div>
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.youtube
                    })}
                    placeholder="Youtube URL"
                    name="youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                  />
                  {errors.youtube && (
                    <div className="invalid-feedback">{errors.youtube}</div>
                  )}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fab fa-instagram" />
                    </span>
                  </div>
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.instagram
                    })}
                    placeholder="Instagram URL"
                    name="instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                  />
                  {errors.instagram && (
                    <div className="invalid-feedback">{errors.instagram}</div>
                  )}
                </div>
              </div>
            ) : null}

            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
