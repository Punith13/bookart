bookApp.directive('orderItem' , function(){
    
    return{
        
        restrict:'E', 
        replace:true, 
        templateUrl:'/resources/directive/order-item.htm',
        scope: {
            obj:"=",
            showOrderDet:"&"
        }
        
    }
    
}); 