import React, { Component } from "react";
import "../styles/main.css";
import Play from "../assets/Icons/SVG/Icon-play.svg";
import FullScreen from "../assets/Icons/SVG/Icon-fullscreen.svg";
import Volume from "../assets/Icons/SVG/Icon-volume.svg";

export default class Hero extends Component {
  render() {
    return (
      <section className="hero">
        <div className="hero__container">
          <div className="hero__container--media-bar">
            <div className="hero__container--media-bar--play">
              <img src={Play} alt="play button" />
            </div>
            <div className="hero__container--media-bar--scrubber"></div>
            <div className="hero__container--media-bar--functions">
              <img src={FullScreen} alt="full screen" />
              <img src={Volume} alt="volume" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
