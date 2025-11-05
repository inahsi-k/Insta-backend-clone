const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const requireLogin = require('../middleware/requireLogin');

// ✅ Get all posts
router.get('/allpost', (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")  
    .then(posts => res.json({ posts }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    });
});

// ✅ Create a new post (without login)
router.post('/create',requireLogin, (req, res) => {
  const { title, body, image } = req.body;

  // Removed `pic` since it's not used in your frontend
  if (!title || !body || !image) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  // Since `req.user` doesn't exist without requireLogin,
  // we’ll just use a dummy or null value for now.
  const post = new Post({
    title,
    body,
    image,
    postedBy: null // 🟡 temp value until you add authentication
  });

  post.save()
    .then(result => res.json({ post: result }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to create post" });
    });
});

// 🟡 You can keep this route protected later
router.get('/mypost', (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then(posts => res.json({ posts }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    });
});

module.exports = router;
