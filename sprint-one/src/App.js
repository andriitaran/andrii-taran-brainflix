import React from "react";
import "./styles/main.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainVideo from "./components/MainVideo";
import Comments from "./components/Comments";
import uuid from "uuid/v1";

export default function App() {
  let comments = [
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
  ];

  return (
    <>
      <Header />
      <Hero />
      <MainVideo />
      <Comments comments={comments} />
    </>
  );
}
