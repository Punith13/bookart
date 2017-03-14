bookApp.controller('orderController' , ['$scope','$location', 'kartService' ,'crudAddress' ,'authorizeService' ,'orderService' ,  function($scope , $location,  kartService, crudAddress , authorizeService , orderService){
    
    $scope.orderedBooks = kartService.kartBooks; 
    
    $scope.selectedAddress = crudAddress.selectedAddress; 
    
    $scope.changeAddress = function(){
        
        $location.path('/address');
        
    }
    
    $scope.totalPrice = kartService.totalPrice ; 
    
    $scope.addOrder = function(){
        
        var userId = authorizeService.user._id; 
        
        var bookId = []; 
        
        for(var i=0; i< kartService.kartBooks.length; i++){
            bookId.push({ _id : kartService.kartBooks[i]._id , quantity : kartService.kartBooks[i].quant }); 
        }
        
        var addressId = crudAddress.selectedAddress._id; 
            
        orderService.addOrder( userId , bookId , addressId); 
        
        
    }
    
}]); 