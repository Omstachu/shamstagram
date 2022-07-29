import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import LogoutButton from "../auth/LogoutButton";
import image from "./images/image.png";
import plus from "./images/plus.png";
import profile from "./images/profile.png";
import logo from "./sham.png";
import "./LogoBar.css";

const LogoBar = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="logo-container__container">
            <div className="logo-container">
                <img className="logobar-image" src={logo} alt="logo" />
            </div>
            <ul className="nav_element">
                <li className="link-container">
                    <NavLink to="/" exact={true} activeClassName="active">
                        <i class="fa-solid fa-house fa-xl navbar-image"></i>
                    </NavLink>
                </li>
                <li className="link-container">
                    <NavLink to="/post" exact={true} activeClassName="active">
                        <i class="fa-regular fa-square-plus fa-xl navbar-image"></i>
                    </NavLink>
                </li>
                <li className="link-container__profile">
                    <button onClick={openModal} className="navbar-profile">
                        <i class="fa-regular fa-user fa-xl navbar-image"></i>
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
        </div>
    );
};

export default LogoBar;
