import React, { Component } from "react";
import "../styles/main.css";
import Logo from "../assets/Logo/Logo-brainflix.svg";
import Search from "../assets/Icons/SVG/Icon-search.svg";
import UploadIcon from "../assets/Icons/SVG/Icon-upload.svg";

export default class Header extends Component {
  render() {
    return (
      <section className="header">
        <div className="header__container">
          <div className="header__container--logo">
            <img src={Logo} alt="brainflix logo" />
          </div>
          <div className="header__container--search">
            <input
              className="header__container--search-input"
              type="text"
              placeholder="Search"
            />
            <img className="header__container--search-img" src={Search} alt="search" />
          </div>

          <button className="header__container--upload">
            <img src={UploadIcon} height="16px" alt="upload icon" />
            UPLOAD
          </button>
          <div className="header__container--avatar"></div>
        </div>
      </section>
    );
  }
}
