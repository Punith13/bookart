bookApp.service('crudAddress' , ['$http' ,'$rootScope' , function($http , $rootScope){
    
    var self = this; 
    
    self.userAddress = {}; 
    
    this.selectedAddress = {}; 
    
    this.addAddress = function(a , b){
        
        $http.post('/addAddress' , {_id: a , address : b})
            .success( function(response){
            
            self.userAddress = response.addresses; 
            
            $rootScope.$broadcast('updateAddress'); 
             
        })
           .error( function( err , status){
             console.log(status);
        })
        
    }
    
    
}]); 