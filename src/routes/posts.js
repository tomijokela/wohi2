const express = require("express");
const router = express.Router();

const posts = require("../data/posts");

// GET /posts
// List all posts
router.get("/", (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.json(posts);
    }

  const filteredPosts = posts.filter(p => p.keywords.includes(keyword.toLowerCase())
  );

  res.json(filteredPosts);
}); 

// GET /api/posts/:postId
router.get("/:postId", (req, res) => {
    const postId = Number(req.params.postId);
    const post = posts.find(p=>p.id === postId);
    if (!post){
        return res.status(404).json({msg: "Post not found"})
    }
    res.json(post);
});

// POST /api/posts
router.post("/", (req, res) =>{
    const {title, date, content, keywords} = req.body;
    if (!title || !date || !content) {
        return res.status(400).json({msg: "title, content and date are required"})
    }
    const existingId = posts.map(p=>p.id)
    const maxId = Math.max(...existingId)
    const newPost = {
        id: posts.length ? maxId + 1 : 1,
        title, date, content,
        keywords: Array.isArray(keywords) ? keywords : []
    }
    posts.push(newPost);
    res.status(201).json(newPost);
});

//PUT /api/posts/:postId
router.put("/:postId", (req, res) => {
    const postId = Number(req.params.postId);
    const post = posts.find(p=>p.id === postId);
    if (!post){
        return res.status(404).json({msg: "Post not found"})
    }

    const {title, date, content, keywords} = req.body;
    if (!title || !date || !content) {
        return res.status(400).json({msg: "title, content and date are required"})
    }
    post.title = title;
    post.date = date;
    post.content = content;
    post.keywords = Array.isArray(keywords) ? keywords : [];

    res.json(post);

})

// DELETE /api/posts/:postId
router.delete("/:postId", (req, res) => {
    const postId = Number(req.params.postId);
    const postIndex = posts.findIndex(p=>p.id === postId);
    
    
    
    if(postIndex === -1){
        return res.status(404).json({msg: "Post not found"})
    }

    const deletedPost = posts.splice(postIndex, 1);
    res.json({
        msg: "Post deleted successfully",
        post: deletedPost
    })
});

module.exports = router;
