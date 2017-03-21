bookApp.controller('orderController' , ['$scope','$location', 'kartService' ,'crudAddress' ,'authorizeService' ,'orderService' ,  function($scope , $location,  kartService, crudAddress , authorizeService , orderService){
    
    $scope.displayOrdSumm = true;
    
    if(kartService.fromKart){
      
        $scope.orderedBooks = kartService.kartBooks; 
        $scope.selectedAddress = crudAddress.selectedAddress;
        $scope.totalPrice = kartService.totalPrice ;     
        $scope.createOrder = true; 
        
    }else{
        
        $scope.orderId = 'ORD' + orderService.selectedOrder._id;        
        $scope.orderedBooks = orderService.selectedOrder.book; 
        $scope.selectedAddress = orderService.selectedOrder.address; 
        $scope.totalPrice = orderService.selectedOrder.totalPrice ;   
        $scope.createOrder = false;
        $scope.status = orderService.selectedOrder.status ; 
        
        if($scope.status == "Cancelled" || $scope.status == "Delivered"){
            $scope.valid = false; 
        }else {
            $scope.valid = true; 
        }
        
        
    }
    

    
    $scope.changeAddress = function(){
        
        $location.path('/address');
        
    }
    

    $scope.addOrder = function(){
        
        var userId = authorizeService.user._id; 
        
        var bookId = []; 
        
        for(var i=0; i< kartService.kartBooks.length; i++){
            bookId.push({ _id : kartService.kartBooks[i]._id , quantity : kartService.kartBooks[i].quantity }); 
        }
        
        var addressId = crudAddress.selectedAddress._id; 
            
        orderService.addOrder( userId , bookId , addressId , kartService.totalPrice , "Received"); 
        
    }
    
    $scope.cancelOrder = function(){
        
        orderService.cancelOrder(orderService.selectedOrder._id); 
        
    }
    
    $scope.$on('updateOrder' , function(evnt, data){
        
        $scope.displayOrdSumm = false; 
        $scope.orderSummaryId = "ORD" + orderService.recentOrder._id;
        
        
    }); 
    
    $scope.$on('cancelledOrder' , function(evnt , data){
        
        $scope.status = "Cancelled"; 
        $scope.valid = false; 
        
    })
    
    
    
    
    
    
    
}]); 