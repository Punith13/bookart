function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

//MODULES
var bookApp = angular.module("bookApp" , ['ngRoute']); 






