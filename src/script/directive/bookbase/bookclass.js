'use strict';
angular.module('app').directive('appBookclass',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/bookbase/bookclass.html',
		controller:function($scope,$interval){	
			$scope.isBookclass=false;
		 	$scope.scrollTopHeight="";	
			$interval(function(){
				$(window).bind('scroll',function(){
					$scope.scrollTopHeight = $(window).scrollTop();
			
					if($scope.scrollTopHeight>49){
						$scope.isBookclass=true;
						$scope.warpMore=!$scope.isBookclass;
					}else{
						$scope.isBookclass=false;
						$scope.warpMore=false;
					}
				});
			},100);
		}
	}
}])