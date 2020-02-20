import React, { Component } from "react";
import "./styles/main.css";
import axios from "axios";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import VideoInfo from "./components/VideoInfo";
import Comments from "./components/Comments";
import VideosList from "./components/VideosList";

const apiKey = "c354bbd6-1b57-4f1e-b0f3-8743d4495710";

export default class App extends Component {
  state = {
    videos: [],
    currentVideo: {},
    loading: false
  };

  addComment = comment => {
    let newComments = this.state.currentVideo.comments;
    newComments.unshift(comment);
    this.setState({
      comments: newComments
    });
  };

  componentDidMount() {
    axios
      .all([
        axios.get(
          `https://project-2-api.herokuapp.com/videos/1af0jruup5gu?api_key=<${apiKey}>`
        ),
        axios.get(
          `https://project-2-api.herokuapp.com/videos?api_key=<${apiKey}>`
        )
      ])
      .then(responseArr => {
        this.setState({
          currentVideo: responseArr[0].data,
          videos: responseArr[1].data.filter(video => {
            return video.id !== "1af0jruup5gu";
          }),
          loading: true
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
          this.setState({
            currentVideo: responseArr[0].data,
            videos: responseArr[1].data.filter(video => {
              return video.id !== this.props.match.params.id;
            }),
            loading: true
          });
        });

      // axios
      //   .get(
      //     `https://project-2-api.herokuapp.com/videos/${this.props.match.params.id}?api_key=<${apiKey}>`
      //   )
      //   .then(response => {
      //     this.setState({
      //       currentVideo: response.data,
      //       videos: this.state.videos.filter(video => {
      //         return video.id !== this.props.match.params.id;
      //       })
      //     });
      //   });
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
              loading={this.state.loading}
            />
          </section>
          <VideosList videos={this.state.videos} />
        </section>
      </>
    );
  }
}
