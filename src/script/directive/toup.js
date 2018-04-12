'use strict'
angular.module('app').directive('appToup',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/toup.html',
        controller:['$scope',function($scope){
			$scope.closeToupshow=true;
			$scope.closeToup=function(){
        		$scope.closeToupshow=!$scope.closeToupshow;
        	}
        }]
    };
}]);