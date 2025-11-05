const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    image:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Post',postSchema);