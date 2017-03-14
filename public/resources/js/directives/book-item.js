// DIRECTIVES

bookApp.directive('bookItem' , function(){
    
    return{
        restrict: 'E',
        replace : true,
        templateUrl : '/resources/directive/book-item.htm',
        scope: {
           obj : "=" , 
           addToKart : "&"
        }
    }
 
});





