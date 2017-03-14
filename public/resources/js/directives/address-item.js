bookApp.directive('addressItem' , ['$location' , 'crudAddress' , function($location , crudAddress){
    
       return{
        restrict: 'E',
        replace : true,
        templateUrl : '/resources/directive/address-item.htm',
        scope: {
           obj : "=" 
          }, 
        link : function(scope , elem , attrs){
            
            var deliveryBtn = angular.element(elem[0].querySelector('.delivery-btn')); 
            
            deliveryBtn.on('click' , function(){
                
                 crudAddress.selectedAddress = scope.obj; 
                 $location.path('/order'); 
                 scope.$apply(); 
            
            });
            
            
        }
       }
    
}]);