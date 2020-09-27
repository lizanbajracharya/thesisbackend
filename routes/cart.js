const express = require('express');
const Cart = require('../models/cart');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const User=require('../models/user');
const Item=require('../models/item');
const auth=require('../auth.js');

router.post('/',auth.verifyUser ,async (req,res)=>{
    const post = new Cart({
        Userid:req.user._id,
        Productid:req.body.Productid
    })
    // console.log(post)
    post.save().then((productDoc)=>{
        res.send(productDoc)
    })
});

router.get('/',  auth.verifyUser,async(req, res) => {
    Cart.find({Userid: req.user._id})
    .populate("Productid")
    .exec()
    .then((productList)=>{
        res.json(productList);
    }).catch((e)=>{
        res.send(e);
})
})

router.get('/all', auth.verifyUser, async (req, res) => {
    Cart.findOne({
        userid: req.user._id
    }).then((product) => {
        if (product) {
            return true;
        }
        return false;
    }).
    then((canUploadImage) => {
        if (canUploadImage) {
            Item.find({}).then((productList)=>{
                res.send(productList);
            }).catch((e)=>{
                res.send(e);
            })
        } else {
            res.sendStatus(404);
        }
    })
});

router.delete('/:id', function(req, res){
    Cart.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){ 
        res.send(e)
    })
    })

    
module.exports=router

