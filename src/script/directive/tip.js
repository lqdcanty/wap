'use strict';
angular.module('app').directive('appTop',[function(){
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/tip.html',
        controller:['$rootScope','$scope',function($rootScope,$scope){
        	$rootScope.isTipContent=false;
        	/*$timeout(function(){
				$rootScope.isTipContent=!$rootScope.isTipContent;
			},1000)*/
        }]
    }
}]);