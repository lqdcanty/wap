'use strict';
angular.module('app').directive('appSign',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/sign.html'
	}
}])