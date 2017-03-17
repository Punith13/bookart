bookApp.controller('headerController' , ['$scope', '$location', '$timeout', 'authorizeService' , function($scope , $location ,$timeout , authorizeService){
     
    $scope.alreadySignIn = false;  
    
    $scope.isActive = function(path){
        
        if(path == $location.path()){
            return true; 
        }else{
            return false; 
        }
        
    }
    
    $scope.userAuthenticated = true; 
    
    $location.path('/book');
    
    $scope.showLoginForm = function(){
        
         $scope.headerMsg = "Login";
         $scope.modalVisible = true;
         $scope.setLoginView(true, false , false);
            
    }
    
    $scope.closeModal = function(){
        
      $scope.modalVisible = false;
        
    }
    

    $scope.showRegisterForm = function(){
        
         $scope.headerMsg = "Register"; 
         $scope.setLoginView(false, true , false); 
        
    }
                                         
    $scope.registerNewUser = function(){
                                         
       authorizeService.registerNewUser($scope.regEmail , $scope.regPassword , $scope.regTel);
                                          
    }
    
    $scope.login = function(){

        authorizeService.login($scope.logEmail , $scope.logPassword); 
        
    }
    
    $scope.$on('loginStatus' , function(evnt , data){
        
        console.log(data);
        
     $scope.setLoginView(false, false , true); 
    
        switch(data){
                
            case 200: 
                $scope.loginRegisterStatusMessage = "Login Successful"; 
                
                $timeout(function(){
                    $scope.modalVisible = false;
                    
                    $scope.user = authorizeService.user.email.split('\@') ;  
                    
                    $scope.user = $scope.user[0]; 
                               
                    console.log($scope.user);
                    
                    $scope.alreadySignIn = true;
                    
                 }, 1500);
                
                 break; 
            case 204:
                 $scope.loginRegisterStatusMessage = "Email not found, Please try again";
                
                 $timeout(function(){
                     
                     $scope.setLoginView(true, false , false);
                     
                      
                     
                 }, 1500); 
                 break;
            case 412 : 
                $scope.loginRegisterStatusMessage = "Invalid password, Please try again";
                
                 $timeout(function(){
                     $scope.setLoginView(true, false , false);
                 }, 1500); 
                 break;
        }
        
     
        
    }); 
    
    $scope.$on('registerStatus' , function(evnt , data){
        
       $scope.setLoginView(false, false , true); 
        
        switch(data){
                
            case 200 : 
               $scope.loginRegisterStatusMessage = "Successfully registered, please login in"; 
                
               $timeout(function(){
                     $scope.setLoginView(true, false , false);
                 }, 1500); 
                 break;
            case 409 :
                $scope.loginRegisterStatusMessage = "User Already exists!";
                
                 $timeout(function(){
                     $scope.setLoginView(false, true , false);
                 }, 1500); 
                 break;
        }
        
        
    }); 
    
    
    $scope.setLoginView = function(a, b, c){
        $scope.alreadyLogin = a; 
        $scope.registerHere = b; 
        $scope.loginRegisterStatus = c;   
    }
    

}]); 