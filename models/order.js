const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const OrderSchema = new Schema({
    orderDate : Date,  
        book : [{
            bookObj : {
            type : Schema.Types.ObjectId , 
            ref : 'book' // referencing to book,
            }, 
            quantity : Number
        }], 
    address : {
        type : Schema.Types.ObjectId , 
        ref : 'address' // referencing to address
    }, 
    price : Number
}); 

const Order = mongoose.model('order' , OrderSchema )

module.exports = Order;