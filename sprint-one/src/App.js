import React from "react";
import "./styles/main.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainVideo from "./components/MainVideo";
import Comments from "./components/Comments";
import VideosList from "./components/VideosList";
import uuid from "uuid/v1";
// import CurrentVideoFile from "./assets/Video/BrainStation.mp4";

export default function App() {
  const videos = [
    {
      id: uuid(),
      title: "Become A Travel Pro In One Easy Lesson",
      channel: "Scotty Cranmer",
      image:
        "https://previews.123rf.com/images/seventyfour74/seventyfour741811/seventyfour74181100176/111337433-man-riding-bmx-bike.jpg"
    },
    {
      id: uuid(),
      title: "Les Houches The Hidden Gem Of The...",
      channel: "Andrii Taran",
      image:
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    },
    {
      id: uuid(),
      title: "Become A Travel Pro In One Easy Lesson",
      channel: "Scotty Cranmer",
      image:
        "https://previews.123rf.com/images/seventyfour74/seventyfour741811/seventyfour74181100176/111337433-man-riding-bmx-bike.jpg"
    },
    {
      id: uuid(),
      title: "Les Houches The Hidden Gem Of The...",
      channel: "Andrii Taran",
      image:
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    }
  ];

  let currentVideo = {
    id: uuid(),
    title: "BrainStation Demo",
    description:
      "Are you looking to change your career? BrainStation’s full-time diploma programs were designed to prepare you for a new career in a digital role. Immersive and project-based, our programs replicate what you will experience in the field, ensuring you’re ready to jump into a new career.",
    channel: "BrainStation",
    image:
      "https://media.blogto.com/events/2016/09/21/094eb300-d840-427d-bed7-cf3e78695a6f.jpg?w=2048&cmd=resize&quality=70",
    views: "1,123,456",
    likes: "123,456",
    duration: "type of <string>",
    video: "http://localhost:3000/Video/BrainStation.mp4",
    timestamp: 1578869853000,
    comments: [
      {
        id: uuid(),
        name: "Michael Lyons",
        timestamp: "Sun Jan 26 2020 08:20:24 GMT-0800 (Pacific Standard Time)",
        commentText:
          "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed."
      },
      {
        id: uuid(),
        name: "Gary Wong",
        timestamp: "Tue Dec 31 2019 08:20:24 GMT-0800 (Pacific Standard Time)",
        commentText:
          "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!"
      },
      {
        id: uuid(),
        name: "Theodore Duncan",
        timestamp: "Mon Nov 25 2019 08:20:24 GMT-0800 (Pacific Standard Time)",
        commentText:
          "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!"
      }
    ]
  };

  return (
    <>
      <Header />
      {/* <Hero /> */}
      <MainVideo currentVideo={currentVideo} />
      <Comments currentVideo={currentVideo} />
      <VideosList videos={videos} />
    </>
  );
}
