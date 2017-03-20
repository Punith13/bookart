bookApp.controller('myOrderController',['$scope','$location', 'authorizeService' ,'getBookItemService','orderService' ,  'kartService', function($scope, $location , authorizeService , getBookItemService , orderService , kartService){
    
    if(!authorizeService.user.signedIn){
        alert('Please sign in to continue');
        $location.path('/book');
    }
       
    authorizeService.getUserById(authorizeService.user._id); 
    
    $scope.$on('updatedUser' , function(evnt , data){
        
        $scope.myOrders = authorizeService.user.orders; 
        
    })
    
    $scope.myOrder = {}; 
    
    $scope.showOrderDetails = function(obj){
        
        $scope.myOrder = obj; 
        
      var bookArray = []; 
        
        for(var i=0; i < obj.book.length; i++){
            bookArray.push(obj.book[i]._id); 
        }
        
        getBookItemService.getBookById(bookArray);
        
    }
    
    $scope.$on('orderedBooksReceived' , function(evnt , data ){
        
        for(var i=0; i < $scope.myOrder.book.length ; i++){
            
            for(var j=0; j < getBookItemService.orderedBooks.length ; j++ ){
                
                if($scope.myOrder.book[i]._id == getBookItemService.orderedBooks[j]._id){    
                    $scope.myOrder.book[i].bookName =  getBookItemService.orderedBooks[j].bookName; 
                    $scope.myOrder.book[i].price =  getBookItemService.orderedBooks[j].price; 
                }
                
            }
            
        }
        
        kartService.fromKart = false; 
        
        orderService.selectedOrder._id = $scope.myOrder._id; 
        orderService.selectedOrder.book = $scope.myOrder.book; 
        orderService.selectedOrder.address = $scope.myOrder.address;
        orderService.selectedOrder.totalPrice = $scope.myOrder.price; 
        
        $location.path('/order');
        
    });
    
}]); 