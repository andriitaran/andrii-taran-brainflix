import React from "react";
import "../styles/main.css";
import Play from "../assets/Icons/SVG/Icon-play.svg";
import FullScreen from "../assets/Icons/SVG/Icon-fullscreen.svg";
import Volume from "../assets/Icons/SVG/Icon-volume.svg";
import Views from "../assets/Icons/SVG/Icon-views.svg";
import Likes from "../assets/Icons/SVG/Icon-likes.svg";
import timeSince from "./timeSince";

export default function VideoInfo({ currentVideo }) {


  return (
    <>
      <section className="video-info">
        <div className="video-info-container">
          <div className="video-info-container__top">
            <span className="video-info-container__top--title">
              {currentVideo.title}
            </span>
            <span className="video-info-container__top--author">
              {currentVideo.channel}
            </span>
            <span className="video-info-container__top--date">
              {timeSince(new Date(currentVideo.timestamp))}
            </span>
            <span className="video-info-container__top--views">
              <img src={Views} alt="views" />
              {currentVideo.views}
            </span>
            <span className="video-info-container__top--likes">
              {" "}
              <img src={Likes} alt="likes" />
              {currentVideo.likes}
            </span>
          </div>
          <span className="video-info-container__description">
            {currentVideo.description}
          </span>
        </div>
      </section>
    </>
  );
}
