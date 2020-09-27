const express = require('express');
const Order = require('../models/order');
const multer=require('multer')
const path=require("path");
const auth=require ('../auth');
const router = express.Router();
const User=require('../models/user');

router.post('/',auth.verifyUser, async (req,res)=>{
    const post = new Order({
        User:req.user._id,
        Product:req.body.Product,
        Rate:req.body.Rate,
        Location:req.body.Location,
        Contactinfo:req.body.Contactinfo
    })
    console.log(post)
    post.save().then((order)=>{
        res.send(order)
    })
});

router.get('/', auth.verifyUser,async (req,res)=>{
    Order.find({User:req.user._id}).then((order)=>{
        res.send(order);
    }).catch((e)=>{
        res.send(e);
    })
});

module.exports=router;