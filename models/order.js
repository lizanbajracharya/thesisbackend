const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Product:{
        type:String
    },
    Rate:{
        type:String
    },
    Location:{
        type:String,
        trim:true
    },
    ContactInfo:{
        type:String,
        trim:true
    }
})

module.exports=mongoose.model('Order',OrderSchema);