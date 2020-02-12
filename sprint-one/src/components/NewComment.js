import React, { Component } from "react";

export default class NewComment extends Component {
  render() {
    return (
      <section className="comments">
        <div className="comments-container">
          <span className="comments-container__commentcount">
            {this.props.comments.length} Comments
          </span>
          <span className="comments-container__join">
            JOIN THE CONVERSATION
          </span>
          <div className="comments-container__newcomment">
            <div className="comments-container__newcomment--avatar"></div>
            <form
              className="comments-container__newcomment--box"
              id="submit-form"
            >
              <textarea
                className="comments-container__newcomment--box--comment"
                name="comment"
                id="new-comment"
                placeholder="Add a new comment"
              ></textarea>
              <input
                className="comments-container__newcomment--box--button"
                id="button"
                type="submit"
                value="COMMENT"
              ></input>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
