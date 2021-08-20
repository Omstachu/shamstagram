import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import LogoutButton from "../auth/LogoutButton";
import image from "./images/image.png";
import plus from "./images/plus.png";
import profile from "./images/profile.png";
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
        <li className="link-container__profile">
          <button onClick={openModal} className="navbar-profile">
            <img src={profile} className="navbar-profile__image" alt="create" />
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="navbar-modal"
            overlayClassName="navbar-modal__overlay"
            parentSelector={() => document.querySelector(".navbar-profile")}
            ariaHideApp={false}
          >
            <LogoutButton className="navbar-modal__button" />
          </Modal>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
