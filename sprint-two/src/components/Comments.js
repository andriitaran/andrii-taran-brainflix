import React from "react";
import NewComment from "./NewComment";
import OldComments from "./OldComments";

export default function Comments({ currentVideo, addComment }) {
  return (
    <>
      <NewComment currentVideo={currentVideo} addComment={addComment} />
      <OldComments currentVideo={currentVideo} />
    </>
  );
}
