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


// middleware : functions that are run pre and post of events - init , validate , save , remove 
UserSchema.pre('remove' , function(next){
    const Address = mongoose.model('address');  
    
    Address.remove({ _id : { $in : this.addresses }})  
    .then( () => next());
    
    const Order = mongoose.model('order'); 
    
    Order.remove({ _id : { $in : this.orders }})
      .then ( () => next());
    
});

const User = mongoose.model('user' , UserSchema); 

module.exports = User; 