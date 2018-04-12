'use strict'
angular.module('app').directive('appNav',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/nav.html',
        controller:['cache','$scope','$state',function(cache,$scope,$state){
        	$scope.ispay=function(){
				if(cache.get("userId")){
					$state.go("pay");
				}else{
                    var ua = navigator.userAgent.toLowerCase();
                    $state.go("pay");
                   // $state.go("login");
                    /*if(ua.match(/MicroMessenger/i)=="micromessenger"){
                        $state.go("pay");
                    }else{
                        $state.go("pay");
                        //$state.go("login");
                    }*/
				}
			}
        }]
    };
}]);