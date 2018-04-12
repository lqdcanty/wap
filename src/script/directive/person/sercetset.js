'use strict';
angular.module('app').directive('appSercetset',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/sercetset.html'
	}
}])