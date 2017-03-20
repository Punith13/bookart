bookApp.directive('kartItem' , ['kartService' , function(kartService){
    
    return{
        restrict: 'E',
        replace : true,
        templateUrl : '/resources/directive/kart-item.htm',
        scope: {
           obj : "=" , 
           removeFromKart : "&"
        }, 
        transclude : true, 
        link : function(scope, elem , attrs){
    
            
           for(var i=0; i < kartService.kartBooks.length ; i++){
               if(kartService.kartBooks[i]._id == scope.obj._id){
                       var quantity = kartService.kartBooks[i].quantity;
                   }
             }
            
        
           var dec = angular.element(elem[0].querySelector('.decrement')); 
           var inc = angular.element(elem[0].querySelector('.increment')); 
            
           dec.on('click', function(){
               
               if(quantity > 1){
                   quantity--; 
               }
               
                 for(var i=0; i < kartService.kartBooks.length ; i++){
                       if(kartService.kartBooks[i]._id == scope.obj._id){
                               kartService.kartBooks[i].quantity = quantity;
                               scope.$apply();
                           }
                   }
            
                $('#totalPrice').html('\u20B9' + parseFloat(kartService.updateTotalPrice()).toFixed(2) );  
                
           }); 
            
            inc.on('click' , function(){
                quantity++; 
                
                for(var i=0; i < kartService.kartBooks.length ; i++){
                       if(kartService.kartBooks[i]._id == scope.obj._id){
                               kartService.kartBooks[i].quantity = quantity;
                               scope.$apply();
                           }
                   } 
                $('#totalPrice').html('\u20B9' + parseFloat(kartService.updateTotalPrice()).toFixed(2) ); 
                
            }); 
                
        }
    }
 
}]);
