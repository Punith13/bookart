bookApp.service('orderService' , ['$http', function($http){
    
    this.addOrder = function(a , b , c){
        
        console.log(b);

        $http.post('/addOrder' , { userId : a , bookId : b , addressId : c})
              .success( function(response){
                console.log(response); 
              })
              .catch( function(status , data){
                console.log(status); 
              });

    }

}]); 