const express = require('express');
const app = express(); 
const server = require('http').createServer(app); 
const fs = require('fs'); 
const port = 3001;
const bodyParser = require('body-parser'); 

server.listen(port); 

const routes = require('./routes/routes'); 
app.use(bodyParser.json());
routes(app); 

//connect to mongodb 
const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise; 

if(process.env.NODE_ENV !== 'test'){
mongoose.connect('mongodb://localhost/bookservice');    
}


//use static files in ROOT/public folder
app.use(express.static(__dirname + '/public')); 

app.get("/", function(req, res){ 
   res.writeHead(200,{"Context-Type":"text/html"});
	fs.createReadStream("index.html").pipe(res);
});

module.exports = app; 


