const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise;

before( (done) =>{
    mongoose.connect('mongodb://localhost/bookservice_test') 
    mongoose.connection
            .once('open' , () => done())
            .on('error' , (err) => {
                console.log('Warning', error); 
            });
});

beforeEach( done => {
    
    const {users , books , addresses , orders} = mongoose.connection.collections; 
    users.drop()
       books.drop()
        addresses.drop()
             orders.drop()
                    .then( () => done())
                     .catch( () => done()); // First time run drop
    
})