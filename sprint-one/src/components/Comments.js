

import React from "react";
import NewComment from "./NewComment";
import OldComments from "./OldComments";

export default function Comments({ currentVideo }) {
  return (
    <>
      <NewComment currentVideo={currentVideo} />
      <OldComments currentVideo={currentVideo} />
    </>
  );
}
