import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProfile from './components/CreateProfile/CreateProfile';
import EditProfile from './components/CreateProfile/EditProfile';
import AddExperience from './components/CreateProfile/AddExperience';
import AddEducation from './components/CreateProfile/AddEducation';
import Profiles from './components/Profiles/Profiles';
import Profile from './components/Profile/Profile';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/createprofile" component={CreateProfile} />
            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/add-education" component={AddEducation} />
            <Route exact path="/add-experience" component={AddExperience} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
