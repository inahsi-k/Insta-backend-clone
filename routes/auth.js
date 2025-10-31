const express=require('express');
const bcrypt=require('bcrypt');
const { body, validationResult } = require('express-validator');
const USER = require('../models/user');
const jwt= require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin')
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("Hello from route")
})


router.get('/protected',requireLogin,(req,res)=>{
    res.send("only for login user")
})


router.post('/signup',[
    body('name').isLength({min:3}).withMessage('Nmae >=3 chars'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('password >=6 chars')
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()});
    }
    const {name,email,password} = req.body;
    USER.findOne({email}).then((saveduser)=>{
        if(saveduser){
            return res.status(422).json({error:"user already exist with this email"});
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user = new USER({
                email,name,password:hashedpassword
            })
            user.save().then(()=>{
                res.status(200).json({message:"user saved succcessfully"});
            }).catch((e)=>{
                console.log(e);
            })
        })
        

    })
})

router.post('/login',(req,res)=>{
    const{email,password}=req.body;
    USER.findOne({email}).then(saveduser=>{
        if(!saveduser){
            return res.status(400).json({success:false,message:"User doesnt exist"});
        }
        bcrypt.compare(password,saveduser.password).then(match=>{
            if(match){
                const token = jwt.sign({_id:saveduser._id},process.env.JWT_SECRET)
                res.json({token})
            }
            else{
                res.status(422).json({error:"invalid email or password"})
            }
        }).catch((e)=>{
        console.log(e);
        }).catch((e)=>{
            console.log(e);
        })
    })
})

module.exports=router;