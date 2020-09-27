const express = require('express');
const Product = require('../models/item');
const Category=require('../models/category');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const uploadRouter = express.Router();
const mongoose=require('mongoose');
const { Console } = require('console');
const item = require('../models/item');
const auth='../auth.js';

router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Product.findById(req.params.id).exec().then(doc=>{
            res.send(doc.toJSON());
        }).catch((e)=>{
            res.send(e);
        })
})

//get all the products or items list
router.get('/', async(req, res) => {
    Product.find({}).then((productList)=>{
        res.send(productList);
    }).catch((e)=>{
        res.send(e);
    })
})


//path to store image
const storage = multer.diskStorage({
    destination: "./upload/productlist",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
//check file types
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

// uploadRouter.route('/upload')
//     .post(upload.single('imageFile'), (req, res) => {
//         res.json(req.file);
//     });


//post products or items
router.post('/',upload.single('ItemImage'),(req,res)=>{
   console.log(req.body)
    let newProduct = new Product({
        ItemName:req.body.ItemName,
        Rate:req.body.Rate,
        ItemImage:req.file.filename,
        Quantity:req.body.Quantity,
        ItemDescription:req.body.ItemDescription,
        Category:req.body.Category
    });
    console.log(newProduct)
    newProduct.save().then((productDoc)=>{
        console.log(productDoc)
        res.send(productDoc)
    })
});

//get single products or items by id
router.patch('/:productId',upload.single('ItemImage'),(req, res) => {
    Product.findOne({
        _id: req.params.productId
    }).then((product) => {
        if (product) {
            return true;
        }
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            Product.findOneAndUpdate({
                    _id: req.params.productId
                }, {
                    $set: req.body,
                    ItemImage:req.file.filename
                }
            ).then(() => {
                res.send({ message: 'product updated successfully' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});



router.delete('/:id', function(req, res){
    Product.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){ 
        res.send(e)
    })
    })

    router.get('/getByCategory/:id', async(req,res)=>{
        try{
            console.log("here")
            const id = req.params.id
            const data = await item.find({Category:id})
            res.json(data);
        }
        catch(err){
            res.status(404).send(err);
        }
    })

router.get('/search/:ItemName', async (req, res) => {
    const searchName = req.params.ItemName;
    console.log(searchName);
    try {
    const search = await Product.find({$text:{$search:searchName}})
    console.log(search)
    res.send(search);
    } catch (error) {
        res.status(400).send(error)
    }
});
module.exports=router;
// module.exports=uploadRouter;