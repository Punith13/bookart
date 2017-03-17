bookApp.service('orderService' , ['$http','$rootScope' , function($http, $rootScope){
    
    var self = this; 
    
    self.recentOrder = {}; 
    
    self.addOrder = function(a , b , c){
    
        $http.post('/addOrder' , { userId : a , bookId : b , addressId : c})
              .success( function(response){
              
                  self.recentOrder = response;
            
                  console.log(self.recentOrder);
        
                  $rootScope.$broadcast('updateOrder'); 
                  
              })
              .catch( function(status , data){
                console.log(status); 
              });

    }

}]); 