const mongoose= require('mongoose');
const ItemSchema=new mongoose.Schema({
    ItemName:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Rate:{
        type:String,
        required:true
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    ItemImage:{
        type:String
    },
    ItemDescription:{
        type:String
    }
})
ItemSchema.path('ItemName').index({text:true});
module.exports=mongoose.model('Item',ItemSchema);
