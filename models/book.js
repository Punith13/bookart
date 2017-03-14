const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const BookSchema = new Schema({

    bookName : String, 
    img : String, 
    price : Number , 
    description : String , 
    author : String , 
    published : Date , 
    awards : String
    
}); 

const Book = mongoose.model('book' , BookSchema ); 

module.exports = Book; 