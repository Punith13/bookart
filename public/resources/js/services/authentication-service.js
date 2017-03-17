bookApp.service('authorizeService' , ['$http' ,'$rootScope' ,  function($http , $rootScope){
    
    var self = this; 
    
    self.user = {};
    
    this.registerNewUser = function(email , password  ,mobile ){
    
         $http.post('/createUser', {email  : email , password : password , mobile : mobile })
             .success( function(response){
                 
                $rootScope.$broadcast('registerStatus' , 200 ); 
            
             })
             .error( function( data , status) {
             
                $rootScope.$broadcast('registerStatus' , status );
             
            });
    }
    
    this.login = function(email, password){

        $http.post('/checkUser' , { email : email , password : password})
              .success( function(response){
                
                 var respCode = 0; 
        
                   if(response.email == email){
                       respCode = 200;
                       
                       self.user = response;
                       
                       self.user.signedIn = true; 
                       
                       console.log(self.user);
                       
                   }else if(response == ''){
                       respCode = 204; 
                   }
            
                $rootScope.$broadcast('loginStatus' , respCode); 
            
               })
               .error( function( data , status){
                 $rootScope.$broadcast('loginStatus' , status);  
              });
    
    }
    
    
    this.getNewUser = function(){
        
        return self.user; 
        
    }
    
    

}]);