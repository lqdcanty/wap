'use strict';
angular.module('app').directive('appFeedback',[function(){
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/person/feedback.html'
    }
}])