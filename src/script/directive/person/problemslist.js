'use strict';
angular.module('app').directive('appProblemslist',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/problemslist.html'
	}
}])