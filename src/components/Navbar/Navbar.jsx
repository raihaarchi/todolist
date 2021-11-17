import React from 'react';
import { NavLink } from 'react-router-dom';
// Style
import './style.scss';

const Navbar = () => (
  <div className="Navbar">
    <NavLink
      exact
      to="/"
      className="Navbar__link Navbar__link--secondary"
      activeClassName="Navbar__link--secondary--active"
    >
      Active tasks
    </NavLink>
    <NavLink
      to="/completed-tasks"
      className="Navbar__link Navbar__link--primary"
      activeClassName="Navbar__link--primary--active"
    >
      Completed
    </NavLink>
  </div>
);

export default Navbar;
