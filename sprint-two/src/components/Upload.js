import React from "react";
import UploadImage from "../assets/Images/video-list-5.jpg";
import Header from "../components/Header";

export default function Upload() {
  return (
    <>
      <Header />
      <section className="upload-page">
        <div className="upload-page-container">
          <span className="upload-page-container__title">Upload Video</span>
          <div className="upload-page-container__thumbnail">
            <span className="upload-page-container__thumbnail--text">
              VIDEO THUMBNAIL
            </span>
            <img
              className="upload-page-container__thumbnail--img"
              src={UploadImage}
              alt="video thumbnail"
            />
          </div>
          <form
            className="upload-page-container__upload-section"
            action="submit"
          >
            <span className="upload-page-container__upload-section--title">
              TITLE YOUR VIDEO
            </span>
            <input
              className="upload-page-container__upload-section--add-title"
              type="text"
              placeholder="Add a title to your video"
            />
            <span className="upload-page-container__upload-section--description">
              ADD A VIDEO DESCRIPTION
            </span>
            <textarea
              name="description"
              id=""
              className="upload-page-container__upload-section--add-description"
              placeholder="Add a description of your video"
            ></textarea>
          </form>
          <div className="upload-page-container__upload-section-container">
            <input
              className="upload-page-container__upload-section--publish"
              id="button"
              type="submit"
              value="PUBLISH"
            ></input>
            <input
              className="upload-page-container__upload-section--cancel"
              id="button"
              type="submit"
              value="CANCEL"
            ></input>
          </div>
        </div>
      </section>
    </>
  );
}
