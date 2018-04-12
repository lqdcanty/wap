'use strict';
angular.module('app').directive('appTouprecord',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/touprecord.html'
	}
}])