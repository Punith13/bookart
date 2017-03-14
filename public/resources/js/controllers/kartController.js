bookApp.controller('kartController' , ['$scope','$location', 'kartService' ,'getBookItemService' ,'authorizeService' ,'crudAddress',   function($scope , $location, kartService , getBookItemService , authorizeService, crudAddress){

$scope.kartBooks = kartService.kartBooks; 
    
$scope.totalPrice = kartService.updateTotalPrice();
    
$scope.removeFromKart = function(obj){
    
    for(var i=0; i < kartService.kartBooks.length ;i++ ){
        if(kartService.kartBooks[i]._id == obj._id){
            kartService.kartBooks.splice(i, 1); 
        }           
    }
    
    $scope.totalPrice = kartService.updateTotalPrice(); 

    for (var i = 0; i < getBookItemService.allBooks.length; i++) {
        if (getBookItemService.allBooks[i]._id == obj._id) {
            getBookItemService.allBooks[i].disabled = false;
            getBookItemService.allBooks[i].status = "Add to Kart";
        }
    }
        
}

$scope.buyBooks = function(){
    
    if(authorizeService.user.signedIn){
        
        if(kartService.kartBooks.length == 0){
        
            alert('Add books to Kart'); 
            return; 
        }
        
        if( isEmpty(crudAddress.selectedAddress)){
            $location.path('/address')
        }else{
          $location.path('/order');  
        }
        
    } else
    {
        alert('Please sign-in to continue'); 
        return; 
    }
    
}
  
    
}]); 