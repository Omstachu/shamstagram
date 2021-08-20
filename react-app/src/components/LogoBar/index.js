import React from "react";
import logo from "./sham.png";
import "./LogoBar.css";

const LogoBar = () => {
  return (
    <div className="logo-container__container">
      <div className="logo-container">
        <img className="logobar-image" src={logo} alt_text="logo" />
      </div>
    </div>
  );
};

export default LogoBar;
