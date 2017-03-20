bookApp.service('orderService' , ['$http','$rootScope' , function($http, $rootScope){
    
    var self = this; 
    
    self.recentOrder = {}; 
    
    self.selectedOrder = {}; 
    
    self.addOrder = function(a , b , c, d){
    
        $http.post('/addOrder' , { userId : a , bookId : b , addressId : c , totalPrice : d})
              .success( function(response){
              
                  self.recentOrder = response;
            
                  console.log(self.recentOrder);
                    
                  $rootScope.$broadcast('updateOrder'); 
                  
              })
              .catch( function(status , data){
                console.log(status); 
              });

    }
    
    self.getOrderDetails = function(_id){
        
        $http.post('/getOrderDetails' , {_id : _id})
              .success( function(response){
            
            console.log(respone); 
        })
        .catch( function(status , data){
            console.log(status);
        });
    
    }
    
    

}]); 