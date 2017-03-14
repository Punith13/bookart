const controller = require('../controllers/controller');

module.exports = (app) => {
    
    app.post('/postBookData' , controller.postBookData );
    app.get('/getBookData' , controller.getBookData );
    app.post('/createUser' , controller.createUser); 
    app.post('/addAddress' , controller.addAddress);
    app.post('/addOrder' , controller.addOrder);
    app.post('/checkUser' , controller.checkUser); 
    app.post('/getAddress' , controller.getAddress); 
}