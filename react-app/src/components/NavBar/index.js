import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import image from "./image.png"


const NavBar = () => {
  return (
    <nav>
      <ul>
          <img src={image} className="navbar-logo" alt="logo" />
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/post" exact={true} activeClassName="active">
            Post
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/images" exact={true} activeClassName="active">
            Images
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts/1" exact={true} activeClassName="active">
            First Post
          </NavLink>
        </li>
        <li>
          <LogoutButton className="logout-navbar" />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
