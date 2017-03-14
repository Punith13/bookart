bookApp.controller('addressController' , ['$scope' , 'authorizeService' ,'crudAddress' ,  function($scope, authorizeService, crudAddress){
    
    $scope.oldAddress = true; 
    
    $scope.userAddress = authorizeService.user.addresses; 
    
    $scope.address= {}; 
    
    $scope.toggleNewAddress = function(){
        
        if($scope.showNewAddress){
           $scope.showNewAddress = false;  
           $scope.oldAddress = true; 
        }else{
           $scope.showNewAddress = true; 
           $scope.oldAddress = false; 
        } 
        
    }
    
    $scope.addNewAddress = function(){
        
        crudAddress.addAddress(authorizeService.user._id , $scope.address);
        $scope.showNewAddress = false; 
        $scope.oldAddress = true; 
                                            
    }
    
    $scope.$on('updateAddress' , function(evnt , data){
        
        $scope.userAddress = crudAddress.userAddress; 
        authorizeService.user.addresses = $scope.userAddress;
    })
    
    
}]); 