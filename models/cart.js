const mongoose=require('mongoose');

const CartSchema=new mongoose.Schema({
    Userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    }
})

CartSchema.path('Productid').index({type:true});
module.exports=mongoose.model('Cart',CartSchema);