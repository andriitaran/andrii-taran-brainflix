import React, { Component } from "react";
import "../styles/main.css";
import Play from "../assets/Icons/SVG/Icon-play.svg";
import Pause from "../assets/Icons/SVG/Icon-pause.svg";
import FullScreen from "../assets/Icons/SVG/Icon-fullscreen.svg";
import Volume from "../assets/Icons/SVG/Icon-volume.svg";
import Views from "../assets/Icons/SVG/Icon-views.svg";
import Likes from "../assets/Icons/SVG/Icon-likes.svg";
import DefaultVideo from "../assets/Video/BrainStation.mp4";

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.mainVideo = React.createRef();
  }
  render() {
    return (
      <section className="video-player">
        <div className="video-player__container">
          <video
            ref={this.mainVideo}
            className="current-video"
            id={this.props.currentVideo.id}
            width="320"
            height="183"
            poster={this.props.currentVideo.image}
          >
            <source
              // src={this.props.currentVideo.video}
              src={DefaultVideo}
              type="video/mp4"
            ></source>
          </video>

          <div className="video-player__container--controls">
            <button
              onClick={() => {
                if (this.mainVideo.current.paused){
                  this.mainVideo.current.play();
                } else {
                  this.mainVideo.current.pause();
                }              
              }}
              className="video-player__container--controls--play"
              id="playpause"
              title="play"
            >
              <img src={Play} alt="play button" />
            </button>
            <div className="video-player__container--controls--scrubber"></div>
            <div className="video-player__container--controls--functions">
              <img src={FullScreen} alt="full screen" />
              <img src={Volume} alt="volume" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
