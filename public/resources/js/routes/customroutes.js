//ROUTES
bookApp.config(['$routeProvider', function($routeProvider){
      
     $routeProvider 
     
     .when('/book', {
          templateUrl : '/resources/pages/book.htm' , 
          controller : 'mainController'
      })
          
      .when('/kart', {
          templateUrl : '/resources/pages/kart.htm', 
          controller : 'kartController'
      })
     
     .when('/address', {
         templateUrl : '/resources/pages/address.htm',
         controller : 'addressController'
     })     
         
     .when('/order', {
         templateUrl : '/resources/pages/order.htm',
         controller : 'orderController'
     })

 }]);