var Obj = function(_id , author , awards , bookName , description , disabled , img , price , published){
    this._id = _id; 
    this.author = author ;
    this.awards = awards ;
    this.bookName = bookName ; 
    this.description = description ; 
    this.disabled = disabled ;
    this.img = img ;
    this.price = price ;
    this.published = published ;
    this.quant = 1; 
}

bookApp.controller("mainController", ['$scope','$location', 'getBookItemService' , 'kartService', function($scope ,  $location , getBookItemService , kartService ){ 
     
//asynchronous call 
if(getBookItemService.allBooks.length == 0){
  getBookItemService.getBookData();  
}else{
   $scope.books = getBookItemService.allBooks;    
}
   
$scope.$on('bookDataReceived' , function(evnt, data){
    
    $scope.books = getBookItemService.allBooks; 
    
    for(var i =0; i < $scope.books.length ; i++){
        $scope.books[i].disabled = false;
        $scope.books[i].status = "Add to Kart"; 
    }
     
}); 
    
  
$scope.addToKart = function(obj){
        
    var passObj = new Obj(obj._id , obj.author , obj.awards , obj.bookName , obj.description , obj.disabled , obj.img , obj.price , obj.published); 
            
    kartService.addKart(passObj);

    for(var i=0 ; i < getBookItemService.allBooks.length ; i++){
        if(getBookItemService.allBooks[i]._id == obj._id){
            getBookItemService.allBooks[i].disabled = true; 
            getBookItemService.allBooks[i].status = "In Kart"; 
        }
    }

} 

                                                           
}]);