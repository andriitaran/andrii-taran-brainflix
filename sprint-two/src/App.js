import React, { Component } from "react";
import "./styles/main.css";
import axios from "axios";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import VideoInfo from "./components/VideoInfo";
import Comments from "./components/Comments";
import VideosList from "./components/VideosList";
import { Redirect } from "react-router-dom";

const apiKey = "c354bbd6-1b57-4f1e-b0f3-8743d4495710";

export default class App extends Component {
  state = {
    videos: [],
    currentVideo: {},
    loading: false
  };

  // function for adding new comments
  addComment = comment => {
    const randomVideoId =
      this.props && this.props.match.params.id
        ? this.props.match.params.id
        : this.state.currentVideo.id;
    axios({
      method: "post",
      url: `https://project-2-api.herokuapp.com/videos/${randomVideoId}/comments?api_key=<${apiKey}>`,
      data: {
        name: comment.name,
        comment: comment.comment
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
      .then(response => {
        return axios.get(
          //gets video with updated comments
          `https://project-2-api.herokuapp.com/videos/${randomVideoId}?api_key=<${apiKey}>`
        );
      })
      .then(response => {
        console.log(response);
        response.data.comments.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
        this.setState({
          currentVideo: response.data //updates video with updated comments
        });
      });
  };

  // function that deletes a comment
  deleteComment = comment => {
    axios
      .delete(
        `https://project-2-api.herokuapp.com/videos/${this.props.match.params.id}/comments/${comment.id}?api_key=<${apiKey}>`
      )
      .then(response => {
        return axios.get(
          //gets video with updated comments
          `https://project-2-api.herokuapp.com/videos/${this.props.match.params.id}?api_key=<${apiKey}>`
        );
      })
      .then(response => {
        this.setState({
          currentVideo: response.data //updates video with updated comments
        });
      });
  };

  componentDidMount() {
    axios
      .get(`https://project-2-api.herokuapp.com/videos?api_key=<${apiKey}>`)
      .then(responseArr => {
        const randomVideo = // gets random video
          responseArr.data[Math.floor(Math.random() * responseArr.data.length)];
        this.setState({
          videos: responseArr.data.filter(video => { // excludes main video from array of side videos
            return video.id !== randomVideo.id;
          })
        });
        return randomVideo;
      })
      .then(randomVideo => {
        axios
          .get(
            `https://project-2-api.herokuapp.com/videos/${randomVideo.id}?api_key=<${apiKey}>`
          )
          .then(response => {
            response.data.comments.sort((a, b) => {
              return b.timestamp - a.timestamp;
            });
            this.setState({
              currentVideo: response.data, // sets random video as the main video
              loading: true
            });
          });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      axios
        .all([
          axios.get(
            `https://project-2-api.herokuapp.com/videos/${this.props.match.params.id}?api_key=<${apiKey}>`
          ),
          axios.get(
            `https://project-2-api.herokuapp.com/videos?api_key=<${apiKey}>`
          )
        ])
        .then(responseArr => {
          responseArr[0].data.comments.sort((a, b) => {
            return b.timestamp - a.timestamp;
          });
          this.setState({
            currentVideo: responseArr[0].data,
            videos: responseArr[1].data.filter(video => {
              return video.id !== this.props.match.params.id;
            }),
            loading: true
          });
        });
      window.scrollTo(0, 0); // takes user to the top of the page after click on the side video
    }
  }

  render() {
    return (
      <>
        <Header />
        <VideoPlayer currentVideo={this.state.currentVideo} />
        <section className="wrapper-1">
          <section className="wrapper-2">
            <VideoInfo currentVideo={this.state.currentVideo} />
            <Comments
              currentVideo={this.state.currentVideo}
              addComment={this.addComment}
              deleteComment={this.deleteComment}
              likeComment={this.likeComment}
              loading={this.state.loading}
            />
          </section>
          <VideosList videos={this.state.videos} />
        </section>
      </>
    );
  }
}
