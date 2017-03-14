const Book = require('../models/book'); 
const User = require('../models/user'); 
const Address = require('../models/address'); 
const Order = require('../models/order');

module.exports = {
    
    postBookData( req , res){
        
        const props = req.body; 
        
        Book.create(props)
             .then( books => res.send(books)); 
    }, 
    getBookData( req , res){
        
        const {skip} = req.body ; 
        const {offset} = req.body ; 
        
        Book.find({})
              .skip(skip)
               .limit(offset)
                .then( books => res.send(books));
    }, 
    createUser(req, res){
        
        const props = req.body;
        
        User.findOne({
            email : props.email
        })
        .then( (user) => {
            
            if( user !== null){
                res.status(409).send(user);
            }else{
                
              User.create(props)
             .then( user => res.status(200).send(user));
                
            }
        })
         
    },
    checkUser(req, res) {

       const props = req.body;
    
       User.findOne({
               email: props.email
           })
           .then((user) => {
                   if (user === null) {
                       res.status(204).send(user);
                   } else if (user.password === props.password) {
                       
                        User.findById(user._id)
                                    .populate('addresses') // to view the addresses sub 
                                    .then ( (user) => res.status(200).send(user)); 
                       
                   } else {
                       res.status(412).send(user);
                   }
              }); 
   },
    addAddress(req, res){
 
        const {_id}  = req.body ; 
            
        const {address} = req.body ;
                              
   // User.findByIdAndUpdate(_id , { $push : { "address" : address } })
    //     .then ( user => res.send(user));
     
        User.findById(_id)
            .then ( (user) => {
            
                  Address.create(address)
                           .then( (address) => {
                              user.addresses.push(address); 
                              return user.save();
                           })
                          .then( user => {
                                
                                User.findById(user._id)
                                    .populate('addresses') // to view the addresses sub 
                                    .then ( (user) => res.send(user)); 
                           });
              }); 
    }, 
    getAddress( req, res){
        
        const {_id} = req.body; 
        
        User.findById(_id)
             .populate('addresses')
               .then( user => res.send(user)); 
        
    }, 
    addOrder( req , res){
                  
        const {userId} = req.body; 
        const {bookId} = req.body; 
        const {addressId} = req.body; 
        
        Order.create({
             orderDate : new Date(), 
             book : bookId , 
             address : addressId
         })
         .then( (order) => {
                User.findById(userId)
                     .then( user => {
                      user.orders.push(order);
                     return user.save();
                })
                .then(user => res.send(user));
            
        }); 
       
       
    }
}