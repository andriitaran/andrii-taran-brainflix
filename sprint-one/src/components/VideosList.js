import React from "react";

export default function VideosList({ videos }) {
  const videosList = videos.map(video => {
    return (
      <div className="videos-list-container__video-element" key={video.id}>
        <img
          className="videos-list-container__video-element--img"
          src={video.image}
          alt="video"
        />
        <div className="videos-list-container__video-element--info">
          <span className="videos-list-container__video-element--info--title">
            {video.title}
          </span>
          <span className="videos-list-container__video-element--info--channel">
            {video.channel}
          </span>
        </div>
      </div>
    );
  });
  return (
    <section className="videos-list">
      <div className="videos-list-container">
        <span className="videos-list-container__header">NEXT VIDEO</span>
        {videosList}
      </div>
    </section>
  );
}
