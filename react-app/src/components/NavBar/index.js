import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import LogoutButton from "../auth/LogoutButton";
import image from "./image.png";
import plus from "./plus.png";
import profile from "./profile.png";
import "./NavBar.css";

const NavBar = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <nav>
      <ul>
        <li className="link-container">
          <NavLink to="/" exact={true} activeClassName="active">
            <img src={image} className="navbar-image" alt="logo" />
          </NavLink>
        </li>
        <li className="link-container">
          <NavLink to="/post" exact={true} activeClassName="active">
            <img src={plus} className="navbar-image" alt="create" />
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
        <li className="link-container__profile">
          <button onClick={openModal} className="navbar-profile">
            <img src={profile} className="navbar-profile__image" alt="create" />
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="navbar-modal"
            overlayClassName="navbar-modal__overlay"
          >
            <LogoutButton className="navbar-modal__button" />
            <button className="navbar-modal__button">
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </button>
            <button className="navbar-modal__button">
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </button>
          </Modal>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
