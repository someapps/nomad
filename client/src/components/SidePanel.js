import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

export default class SidePanel extends Component {
  render() {
    return (
      <ul className="side-panel">
        <li className="side-panel__item">LOGO</li>
        <li className="side-panel__item"><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li className="side-panel__item"><NavLink to="/progress">Progress</NavLink></li>
        <li className="side-panel__item"><NavLink to="/profile">Profile</NavLink></li>
        <li className="side-panel__item"><NavLink to="/settings">Settings</NavLink></li>
      </ul>
    );
  }
}