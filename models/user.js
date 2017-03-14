const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const UserSchema = Schema({ 

email : String , 
password : String , 
mobile : String ,
addresses : [{
        type : Schema.Types.ObjectId , 
        ref : 'address' // referencing to book
    }], 
orders : [{
        type : Schema.Types.ObjectId , 
        ref : 'order' // referencing to book
    }]
    
});

const User = mongoose.model('user' , UserSchema); 

module.exports = User; 