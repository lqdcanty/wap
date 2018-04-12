'use strict';
angular.module('app').directive('appFoot',['$rootScope','cache','$state',function($rootScope,cache,$state){
	return{
		restrict:'A',
		replace:true,
		scope:{
			myLogin:"&",
			//bookstoreLogin:"&"
		},
		templateUrl:'view/template/foot.html',
		controller:function($scope,$state){
			$scope.state=$state;
		},
		link:function($scope){
			$rootScope.userId=cache.get('userId');
			console.log($rootScope.userId);
			$scope.myLogin=function(){
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i)=="micromessenger"){
					$state.go("my");
				}else{
					
					if($rootScope.userId!=undefined){
						$state.go("my");
					}else{
						$state.go("login");
					}
				}
				
			}
			$scope.bookstoreLogin=function(){
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i)=="micromessenger"){
					$state.go("bookstore");
				}else{
					$state.go("bookstore");
					/*if($rootScope.userId!=undefined){
						$state.go("bookstore");
					}else{
						$state.go("login");
					}*/
				}
			}
		}
	}
}])