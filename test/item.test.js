// use the path of your model
const Product = require('../models/item');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/testDatabase'; 
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Product Add', () => {
// the code below is for insert testing
    it('Add product testing', () => {
        const product = {
            'ItemName': 'Nokia',
            'Rate': '21',
            'Quantity':'1',
            'Category':'asd',
            'ItemDescription':'ad',
        };
        
        return Product.create(product)
            .then((pro_ret) => {
                expect(pro_ret.ItemName).toEqual('Nokia');
            });
    });

    // it('to test the update', async () => {

    //     return Product.findOneAndUpdate({_id :Object('5e48ef6b9d54152fa89ca7e4')}, {$set : {ItemName:'Nokia'}})
    //     .then((pp)=>{
    //         expect(pp.ItemName).toEqual('ram')
    //     })
      
    // });

    
// // // the code below is for delete testing
//     it('to test the delete product is working or not', async () => {
//         const status = await Product.deleteMany();
//         expect(status.ok).toBe(1);
// });








    
})
