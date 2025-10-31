const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Post = require('../models/post');

router.get('/allpost',(req,res,next)=>{
    Post.find().populate("postedBy", "-password").then(posts=>{
        res.json({posts})
    }).catch((e)=>{
        console.log(e);
    })
})


router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body} = req.body
    if(!title || !body){
        res.status(422).json({error:"requires all fields"});
    }
    console.log(req.user);
    // res.send("ok");
    const post = new Post({
        title,body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    }).catch((e)=>{
        console.log(e);
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router