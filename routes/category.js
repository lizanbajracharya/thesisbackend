const express = require('express');
const Category = require('../models/category');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const storage = multer.diskStorage({
    destination: "./category/categorylist",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
//check file types
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only pdf files!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

router.post('/',upload.single('Image'),async (req,res)=>{
    const post = new Category({
        Image:req.file.filename,
        CategoryName:req.body.CategoryName
    })
    post.save().then((productDoc)=>{
        res.send(productDoc)
    })
});

router.patch('/:categoryId',upload.single('Image'),(req, res) => {
    Category.findOne({
        _id: req.params.categoryId
    }).then((category) => {
        if (category) {
            return true;
        }
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            Category.findOneAndUpdate({
                    _id: req.params.categoryId
                }, {
                    $set: req.body,
                    Image:req.file.filename
                }
            ).then(() => {
                res.send({ message: 'Category updated successfully' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

router.get('/', async(req, res) => {
    Category.find({}).then((productList)=>{
        res.send(productList);
    }).catch((e)=>{
        res.send(e);
    })
})

router.delete('/:id', function(req, res){
    Category.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){ 
        res.send(e)
    })
    })

module.exports=router;