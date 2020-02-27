const express = require("express");
const router = express.Router();
const helper = require("../../helper/helper");

const videosFile = __dirname + "/../../models/videos.json";
const videos = require(videosFile);

router.get("/", (req, res) => {
  //gets and array of videos with 4 key:value pairs
  // const videoList = videos.map(video => {
  //   return {
  //     id: video.id,
  //     title: video.title,
  //     channel: video.channel,
  //     image: video.image
  //   };
  // });
  return res.send(
    videos.map(video => {
      return (video = {
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image
      });
    })
  );
});

router.get("/:id", (req, res) => {
  // gets a unique video by id
  let video = videos.find(video => {
    return video.id === req.params.id;
  });
  if (video.id === req.params.id) {
    return res.json(video);
  } else {
    res.status(404).json({
      error: `Video ID${req.params.id} is not found`
    });
  }
});

router.post("/", (req, res) => {
  const newVideo = {
    id: req.body.id,
    title: req.body.title,
    channel: req.body.channel,
    image: req.body.image,
    desciption: req.body.desciption,
    views: "0",
    likes: "0",
    duration: "0",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: Math.round(new Date().getTime()),
    comments: []
  };
  console.log(newVideo);
  videos.push(newVideo);
  helper.writeJSONFile(videosFile, videos);
  res.json(videos);
});

router.post("/:id/comments", (req, res) => {
  const video = videos.find(video => {
    return video.id === req.params.id;
  });
  console.log(video);
  if (video) {
    const newComment = {
      id: helper.getNewId(),
      name: req.body.name,
      comment: req.body.comment,
      timestamp: Math.round(new Date().getTime())
    };
    if (!newComment.name || !newComment.comment) {
      return res.status(400).json({
        errorMessage: " Please provide name and comment"
      });
    }
    video.comments.push(newComment);
    videos.forEach(newVideo => {
      if (newVideo.id === video.id) {
        newVideo = video;
      }
    });
    helper.writeJSONFile(videosFile, videos);
    res.json(video);
  } else {
    res.status(404).json({
      error: `Video ID${req.params.id} is not found`
    });
  }
});

router.delete("/:videoId/comments/:commentId", (req, res) => {
  const video = videos.find(video => {
    return video.id === req.params.videoId;
  });
  if (video) {
    const comment = video.comments.find(comment => {
      return comment.id === req.params.commentId;
    });
    if (comment) {
      const updatedVideoComments = video.comments.filter(newComment => {
        return newComment.id !== comment.id;
      });
      video.comments = updatedVideoComments;
      res.json(video.comments);
    } else {
      res.status(404).json({
        error: `Comment ID${req.params.id} is not found`
      });
    }
  } else {
    res.status(404).json({
      error: `Video ID${req.params.id} is not found`
    });
  }
});

router.put("/:id/likes", (req, res) => {
  let video = videos.find(video => {
    return video.id === req.params.id;
  });
  if (video.id === req.params.id) {
    const likesNumber = parseInt(video.likes.replace(/,/g, ""), 10) + 1;
    video.likes = likesNumber.toLocaleString();
    videos.forEach(newVideo => {
      if (newVideo.id === video.id) {
        newVideo = video;
      }
    });
    helper.writeJSONFile(videosFile, videos);
    return res.json(video);
  } else {
    res.status(404).json({
      error: `Video ID${req.params.id} is not found`
    });
  }
});

module.exports = router;
