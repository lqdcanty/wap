'use strict';
angular.module('app').directive('appProblemdetail',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/problemdetail.html'
	}
}])