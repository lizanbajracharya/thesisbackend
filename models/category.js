const mongoose=require('mongoose');

const CategorySchema= new mongoose.Schema({
    CategoryName:{
        type:String,
        required:true,
        unique:true
    },
    Image:{
        type:String,
        required:true
    }
})
CategorySchema.path('CategoryName').index({type:true});
module.exports=mongoose.model('Category',CategorySchema);