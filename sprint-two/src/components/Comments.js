import React from "react";
import NewComment from "./NewComment";
import OldComments from "./OldComments";

export default function Comments({ currentVideo, addComment, loading }) {
  if (loading) {
    return (
      <>
        <NewComment currentVideo={currentVideo} addComment={addComment} />
        <OldComments currentVideo={currentVideo} />
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
