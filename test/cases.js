const mongoose = require('mongoose'); 
const assert = require('assert'); 
const request = require('supertest'); 
const app = require('../app'); 
const User = mongoose.model('user'); 
const Book =  mongoose.model('book'); 
const Address = mongoose.model('address'); 

describe('Database interactions' , () => {

    it('Post to /createUser to add a new user to database ' , (done) => {
        
        request(app)
            .post('/createUser')
             .send({ email : "puneethu@gmail.com" , password : "test@123" , mobile : "9845214069"})
              .end( () => {
            
                        User.findOne({ mobile : "9845214069"})
                             .then( user => {
                            
                            assert( user.email === "puneethu@gmail.com" ); 
                            done(); 
                             
                        });
        
               }); 
    }); 
    
    it('Authenticates a user in database' , (done) => {
        
        let punith = new User({ email : "puneethu@gmail.com" , password : "bookart@123" , mobile : "9845214069"});
        
        punith.save()
        .then ( () => {
            
            request(app)
              .post('/checkUser')
                .send({email : "puneethu@gmail.com" , password : "bookart@123"})
                  .end( (err, response) => {
                
                   assert( response.statusCode === 200);
                
                   done();
            });
             
        });
        
    }); 
    
    it('get address from a user' , (done) => {
        
        let punith = new User({ email : "puneethu@gmail.com" , password : "test@123" , mobile : "9845214069"});
        
        let address = new Address({ address1 : "No 231, 1st cross , 1st Main Road , B Block" , address2: "Byrathi , Bengaluru" , pincode : "560077" , mobile : "9845214069" }); 
       
        punith.addresses.push(address); 
       
        Promise.all( [punith.save() , address.save()] ) 
              .then ( () => {
            
                  request(app)
                    .post('/getAddress')
                        .send({_id : punith._id})
                          .end((err , response) => {
                      
                             const textObj = JSON.parse(response.text);   
                             assert(textObj.addresses[0].pincode === 560077)
                             done();
                         });

        }); 
        
    });
    

    it('Post to /addAddress to add address for user' , (done) => {
        
        
          request(app)
            .post('/createUser')
             .send({ email : "puneethu@gmail.com" , password : "test@123" , mobile : "9845214069"})
              .end( (err , response ) => {
            
                  const textObj = JSON.parse(response.text);
              
                  request(app)
                    .post("/addAddress")
                    .send( { _id : textObj._id , address : 

                        { address1 : "No 231, 1st cross , 1st Main Road , B Block" , address2: "Byrathi , Bengaluru" , pincode : "560077" , mobile : "9845214069" }

                        })
                        .end( ()=> {
                      
                                    User.findOne( { mobile : '9845214069'})
                                    .populate('addresses') // to view the addresses sub 
                                    .then ( (user) => {    
                                    assert(user.addresses[0].address1 === 'No 231, 1st cross , 1st Main Road , B Block'); 
                                    done();
                                    }); 
                            
                              });
                         
                        });
            }); 
    

   it.only('Post to /addOrder to add a book and delivery address to user order array' , (done) => {
       
       let punith = new User({ email : "puneethu@gmail.com" , password : "test@123" , mobile : "9845214069"});
       let newBook = new Book({
         bookName : "A Day on Skates",
         img : "resources/img/books/adayonskates.jpeg",
         price : 39,
         description : "When winter finally brings snow and ice to their Friesland village, nine-year-old twins Evert and Afke and their classmates are delighted when their teacher announces that the class is going on an all-day ice skating picnic",
         author : "A",
         published : new Date() , 
         awards : "No"
        });
       let address = new Address({ address1 : "No 231, 1st cross , 1st Main Road , B Block" , address2: "Byrathi , Bengaluru" , pincode : "560077" , mobile : "9845214069" }); 
       
       punith.addresses.push(address); 
       
       Promise.all( [punith.save() , newBook.save() , address.save()] ) 
              .then ( () => {
       
                     User.findOne({mobile: "9845214069"})
                         .then( (user) => {
                         
                         Book.findOne({ bookName : "A Day on Skates"})
                            .then( (book) => {
                             
                             Address.findOne({pincode: "560077"})
                                  .then( (address) => {
                                 
                                 request(app)
                                  .post("/addOrder")
                                    .send({userId : user._id , bookId : [{_id: book._id ,quantity : 1}], addressId : address._id})
                                     .end( () => {
                                     
                                       User.findById(punith._id)
                                            .populate('addresses')
                                              .populate({
                                                    path:'orders', 
                                                    populate : {
                                                        path : 'address', 
                                                        model : 'address'
                                                    }
                                               })
                                               .then( user => {
                                        
                                                  user.orders.forEach( (item , index) => {
            
                                                      item.book.forEach( (innerItem , innerIndex) => {
                                                          
                                                          const quantity = innerItem.quantity; 
                                                          
                                                          Book.findById(innerItem._id)
                                                               .then (book => {
                                                              
                                                                book.quantity = quantity;
                                                                item.book[innerIndex] = book; 
                                                                assert( user.orders[0].book[0].quantity === 1 );
                                                                done();
                                                              });     
                                                         });
                                                      
                                                   }); 
                                           
                                                  //console.log(user.orders[0].book[0].bookName);     
                                           
                                              });                               
                                          });                           
                                     });
                                });
                           });
                      });
                 }); 
});
