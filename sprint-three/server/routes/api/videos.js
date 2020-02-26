const express = require("express");
const router = express.Router();
const helper = require("../../helper/helper");

const videosFile = __dirname + "/../../models/videos.json";
const videos = require(videosFile);

router.get("/", (req, res) => {
  // gets and array of videos with 4 key:value pairs
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
    return res.send(
      200,
      (video = {
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image,
        description: video.description,
        views: video.views,
        likes: video.likes,
        duration: video.duration,
        video: video.video,
        timestamp: video.timestamp,
        comments: video.comments
      })
    );
  } else {
    res.status(404).json({
      error: "Video ID is invalid"
    });
  }
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
      comment: req.body.comment
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
      error: "Video ID is invalid"
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
        error: "Comment ID is invalid"
      });
    }
  } else {
    res.status(404).json({
      error: "Video ID is invalid"
    });
  }
});

// router.put("/", (req, res) => {
//   res.send(`Updated comment`);
// });

module.exports = router;
