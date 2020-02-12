import React, { Component } from "react";
import "../styles/main.css";
import Views from "../assets/Icons/SVG/Icon-views.svg";
import Likes from "../assets/Icons/SVG/Icon-likes.svg";

export default class MainVideo extends Component {
  render() {
    return (
      <section className="main-video">
        <div className="main-video-container">
          <div className="main-video-container__top">
          <span className="main-video-container__top--title">
            BMX Rampage: 2018 Highlights
          </span>
          <span className="main-video-container__top--author">By Red Cow</span>
          <span className="main-video-container__top--date">12/18/2018</span>
          <span className="main-video-container__top--views">
            <img src={Views} alt="views" />
            1,001,23
          </span>
          <span className="main-video-container__top--likes">
            {" "}
            <img src={Likes} alt="likes" />
            110,985
          </span>
          </div>
          <span className="main-video-container__description">
            On a gusty day in Southern Utah, a group of 25 daring mountain
            bikers blew the doors off what is possible on two wheels, unleashing
            some of the biggest moments the sport has ever seen. While mother
            nature only allowed for one full run before the conditions made it
            impossible to ride, that was all that was needed for event veteran
            Kyle Strait, who won the event for the second time -- eight years
            after his first Red Cow Rampage title
          </span>
        </div>
      </section>
    );
  }
}
