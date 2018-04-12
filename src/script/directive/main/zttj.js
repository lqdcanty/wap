'use strict';
angular.module('app').directive('appZttj',[function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			booklist:'='
		},
		templateUrl:'view/template/main/zttj.html'
	}
}])