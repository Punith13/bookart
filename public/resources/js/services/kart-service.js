bookApp.service('kartService' , function(){
    
    this.fromKart = true; 
    
    this.kartBooks = []; 
    this.addKart = function(book){
      this.kartBooks.push(book) ; 
    }
    
    this.updateTotalPrice = function(){
    
     this.totalPrice = 0; 
    
       for(var i=0; i < this.kartBooks.length ;i++ ){
           this.totalPrice+= this.kartBooks[i].price * this.kartBooks[i].quantity; 
       }
    
        return this.totalPrice; 
    }
    
}); 