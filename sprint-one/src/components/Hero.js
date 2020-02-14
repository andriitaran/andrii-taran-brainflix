import React from "react";
import "../styles/main.css";
import Play from "../assets/Icons/SVG/Icon-play.svg";
import FullScreen from "../assets/Icons/SVG/Icon-fullscreen.svg";
import Volume from "../assets/Icons/SVG/Icon-volume.svg";
import Views from "../assets/Icons/SVG/Icon-views.svg";
import Likes from "../assets/Icons/SVG/Icon-likes.svg";

export default function Hero({ currentVideo }) {
  const videoControl = event => {
    const mainVideo = document.querySelector(".current-video");
    mainVideo.play();
  };

  return (
    <section className="hero">
      <div className="hero__container">
        <video
          className="current-video"
          id={currentVideo.id}
          width="320"
          height="183"
          poster={currentVideo.image}
        >
          <source src={currentVideo.video} type="video/mp4"></source>
        </video>

        <div className="hero__container--controls">
          <button
            onClick={videoControl}
            className="hero__container--controls--play"
            id="playpause"
            title="play"
          >
            <img src={Play} alt="play button" />
          </button>
          <div className="hero__container--controls--scrubber"></div>
          <div className="hero__container--controls--functions">
            <img src={FullScreen} alt="full screen" />
            <img src={Volume} alt="volume" />
          </div>
        </div>
      </div>
    </section>
  );
}
