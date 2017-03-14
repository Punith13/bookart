bookApp.service('getBookItemService' , ['$rootScope', '$http',  function($rootScope, $http){

    var self = this; 

    self.allBooks = []; 
    
    self.getBookData = function(){

        $http.get('/getBookData?skip=0&offset=10')
             .success( function(res) {
                
                self.allBooks = res; 
                $rootScope.$broadcast('bookDataReceived');
            
            })
            .error( function( data , status) {
             console.log(status); 
            });

    }
    
}]); 