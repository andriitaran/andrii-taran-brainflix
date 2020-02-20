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
    // function for adding new comments
    axios({
      method: "post", // posts new comment to API
      url: `https://project-2-api.herokuapp.com/videos/${this.props.match.params.id}/comments?api_key=<${apiKey}>`,
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
          `https://project-2-api.herokuapp.com/videos/${this.props.match.params.id}?api_key=<${apiKey}>`
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

  // componentDidMount() {
  //   axios
  //     .all([
  //       axios.get(
  //         `https://project-2-api.herokuapp.com/videos/1af0jruup5gu?api_key=<${apiKey}>`
  //       ),
  //       axios.get(
  //         `https://project-2-api.herokuapp.com/videos?api_key=<${apiKey}>`
  //       )
  //     ])
  //     .then(responseArr => {
  //       responseArr[0].data.comments.sort((a, b) => {
  //         return b.timestamp - a.timestamp;
  //       });
  //       this.setState({
  //         currentVideo: responseArr[0].data,
  //         videos: responseArr[1].data.filter(video => {
  //           return video.id !== "1af0jruup5gu";
  //         }),
  //         loading: true
  //       });
  //     });
  // }

  // let randomVideo = axios
  //   .get(`https://project-2-api.herokuapp.com/videos?api_key=<${apiKey}>`)
  //   .then(response => {
  //     return response.data[Math.floor(Math.random() * response.data.length)];
  //   });

  // console.log(randomVideo);

  componentDidMount() {
    axios
      .get(`https://project-2-api.herokuapp.com/videos?api_key=<${apiKey}>`)
      .then(responseArr => {
        const randomVideo =
          responseArr.data[Math.floor(Math.random() * responseArr.data.length)];
        this.setState({
          videos: responseArr.data.filter(video => {
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
              currentVideo: response.data,
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
              loading={this.state.loading}
            />
          </section>
          <VideosList videos={this.state.videos} />
        </section>
      </>
    );
  }
}
