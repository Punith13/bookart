const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const AddressSchema = new Schema({
    
    address1 : String, 
    address2 : String, 
    pincode : Number , 
    mobile : String 
    
}); 

const Address = mongoose.model('address' , AddressSchema )

module.exports = Address; 