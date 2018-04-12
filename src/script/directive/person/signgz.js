'use strict';
angular.module('app').directive('appSigngz',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/signgz.html'
	}
}])