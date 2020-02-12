// import React, { Component } from "react";
// import NewComment from "./NewComment";
// import OldComments from "./OldComments";

// export default class Comments extends Component {
//   render() {
//     return (
// <>
//   <NewComment />
//   <OldComments />
// </>
//     );
//   }
// }

import React from "react";
import NewComment from "./NewComment";
import OldComments from "./OldComments";

export default function Comments({comments}) {
  return (
    <>
      <NewComment comments={comments}/>
      <OldComments comments = {comments} />
    </>
  );
}
