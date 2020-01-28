import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const NavBar = () => (
  <div className="navbar">
    <Link to="/">Feed</Link>
    <Link to="/profile">Profile</Link>
  </div>
);

const Template = ({ title }) => (
  <div>
    1
    <NavBar />
    <p className="page-info">This is the {title} page</p>
  </div>
);

const Feed = () => <Template title="Feed" />;

const Profile = () => <Template title="Profile" />;

const App = () => (
  <Router>
    <Route exact path="/" component={Feed} />
    <Route path="/profile" component={Profile} />
  </Router>
);

export default App;
