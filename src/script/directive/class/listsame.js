'use strict';
angular.module('app').directive('appListsame',[function(){
    return{
        restrict:'A',
        replace:true,
        scope:{
            com:'='
        },
        templateUrl:'view/template/class/listsame.html'
    }
}])