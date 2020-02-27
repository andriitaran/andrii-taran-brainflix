import React, { Component } from "react";
import "./styles/main.css";
import axios from "axios";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import VideoInfo from "./components/VideoInfo";
import Comments from "./components/Comments";
import VideosList from "./components/VideosList";

export default class App extends Component {
  state = {
    videos: [],
    currentVideo: {},
    loading: false
  };

  componentDidMount() {
    axios({
      method: "get",
      url: `http://localhost:5000/api/videos`,
      headers: { "Access-Control-Allow-Origin": "*" }
    }) //gets videos from API
      .then(responseArr => {
        const randomVideo = // assigns random video as a main video
          responseArr.data[Math.floor(Math.random() * responseArr.data.length)];
        this.setState({
          videos: responseArr.data.filter(video => {
            // excludes main video from array of side videos
            return video.id !== randomVideo.id;
          })
        });
        return randomVideo;
      })
      .then(randomVideo => {
        axios
          .get(
            //gets main video(random video) details
            `http://localhost:5000/api/videos/${randomVideo.id}`
          )
          .then(response => {
            response.data.comments.sort((a, b) => {
              //sorts comment by time of posting
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
    console.log("Component was updated!");
    if (prevProps.match.params.id !== this.props.match.params.id) {
      // checks if new video is not the same as a previous one
      axios
        .all([
          axios.get(
            //gets main video details from an API
            `http://localhost:5000/api/videos/${this.props.match.params.id}`
          ),
          axios.get(
            //gets videos from API
            `http://localhost:5000/api/videos/`
          )
        ])
        .then(responseArr => {
          responseArr[0].data.comments.sort((a, b) => {
            //sorts comments by time of posting
            return b.timestamp - a.timestamp;
          });
          this.setState({
            //assigns new main video and side video to state
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

  // function for adding new comments
  addComment = comment => {
    const randomVideoId = //to make sure adding comments work correctly only on the first loaded video, we're comparing main video with random video stored in state
      this.props && this.props.match.params.id
        ? this.props.match.params.id
        : this.state.currentVideo.id;
    axios({
      method: "post", //posts comments to the API
      url: `http://localhost:5000/api/videos/${randomVideoId}/comments`,
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
          `http://localhost:5000/api/videos/${randomVideoId}`
        );
      })
      .then(response => {
        //sorts comments by time of posting
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
    const randomVideoId = //to make sure adding comments work correctly only on the first loaded video, we're comparing main video with random video stored in state
      this.props && this.props.match.params.id
        ? this.props.match.params.id
        : this.state.currentVideo.id;
    axios
      .delete(
        `http://localhost:5000/api/videos/${randomVideoId}/comments/${comment.id}`
      )
      .then(response => {
        return axios.get(
          //gets video with updated comments
          `http://localhost:5000/api/videos/${randomVideoId}`
        );
      })
      .then(response => {
        //sorts comments by time of posting
        response.data.comments.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
        this.setState({
          currentVideo: response.data //updates video with updated comments
        });
      });
  };

  likeVideo = video => {
    // axios
    //   .put(
    //     `http://localhost:5000/api/videos/${this.props.match.params.id}/likes`
    //   )
    //   .then(response => {
    //     this.setState({
    //       currentVideo: response.data //updates video with updated likes
    //     });
    //   });
    axios({
      method: "put",
      url: `http://localhost:5000/api/videos/${this.props.match.params.id}/likes`,
      headers: { "Access-Control-Allow-Origin": "*" }
    }).then(response => {
      this.setState({
        currentVideo: response.data //updates video with updated likes
      });
    });
  };

  uploadVideo = video => {
    axios({
      method: "post", //posts comments to the API
      url: `http://localhost:5000/api/videos/}`,
      data: {
        id: video.id,
        title: video.title,
        channel: video.channel,
        desciption: video.description,
        image: video.image
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(response => {
      this.setState({
        videos: response.data //updates video with updated comments
      });
    });
  };

  render() {
    return (
      <>
        <Header />
        <VideoPlayer currentVideo={this.state.currentVideo} />
        <section className="wrapper-1">
          <section className="wrapper-2">
            <VideoInfo
              currentVideo={this.state.currentVideo}
              likeVideo={this.likeVideo}
            />
            <Comments
              currentVideo={this.state.currentVideo}
              addComment={this.addComment}
              deleteComment={this.deleteComment}
              loading={this.state.loading}
            />
          </section>
          <VideosList videos={this.state.videos} />
        </section>
      </>
    );
  }
}
