const dotenv= require('dotenv');
const cors = require('cors')
dotenv.config();
const express= require('express');
const app=express();
const mongoose = require('mongoose');

const User = require('./models/user.js') ;
const router = require('./routes/auth.js');
const postrouter = require('./routes/post.js');
app.use(cors());
app.use(express.json()); // JSON body parse karega

dotenv.config();
mongoose.connect(process.env.MONGODB_URI).
then(()=>{
    console.log("mongodb connected successfully");
})
.catch(()=>{
    console.log("error connceting mongodb");
})
const middleware=(req,res,next)=>{
    console.log(`request came from ${req.method} and url=${req.url}`);
    next();
}

// app.use(middleware);
app.get('/',middleware,(req,res,next)=>{
    res.send("HI");
});
app.get('/about',(req,res)=>{
    res.send("this is about page")
});

app.use('/api',router);
app.use('/',postrouter);
const PORT = process.env.PORT;
app.listen(PORT , ()=>{
    console.log(`server running at port ${PORT}`);
})