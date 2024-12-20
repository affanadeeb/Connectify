const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Please login to continue' });
  }
};

// Create post
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({
      content,
      author: req.session.userId
    });

    await post.save();
    await post.populate('author', 'name email');
    
    res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

module.exports = router; 
