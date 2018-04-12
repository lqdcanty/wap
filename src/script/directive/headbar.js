'use strict'
angular.module('app').directive('appHeadbar',[function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			text:"@",
		},
		templateUrl:'view/template/headbar.html',
		link:function($scope){
			$scope.back=function(){
				window.history.back();
			}
		}
	};
}]);