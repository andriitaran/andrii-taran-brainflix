import React from "react";
import timeSince from "./timeSince";

export default function OldComments({ currentVideo }) {
  const oldComments = currentVideo.comments.map(comment => {
    return (
      <div key={comment.id} className="comment-card">
        <div className="comment-card__avatar"></div>
        <div className="comment-card__body">
          <div className="comment-card__body--top">
            <span className="comment-card__body--top--username">
              {comment.name}
            </span>
            <span className="comment-card__body--top--date">
              {timeSince(new Date(comment.timestamp))}
            </span>
          </div>
          <span className="comment-card__body--text">
            {comment.comment}
          </span>
        </div>
      </div>
    );
  });
  return (
    <section className="old-comments">
      <div className="old-comments-container">{oldComments}</div>
    </section>
  );
}
