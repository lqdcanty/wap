'use strict'
	angular.module('app').controller('forgotpasswordCtrl',['userTracking','weixinsharehttp','weixinshare','$timeout','$location','$state','$interval','$rootScope','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$timeout,$location,$state,$interval,$rootScope,$http,$scope){
		var count=60;
        $rootScope.pageStyle='';
        $scope.isTipContent=false;
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
	    $scope.forgetValite=function(){
	    	if($("#forgetId").val()!=""){
				$scope.loading=true;
				$http({
					method:'Post',
					params:{phone:$scope.user.phone},
					url:$rootScope.rootScopeUrl+'/api/phone/validation'
				}).then(function successCallback(response){
					if(response.data.httpCode==400){
						$rootScope.loginBack=$location.url();
						$scope.isSendCode=true;
						$rootScope.loadingFunction($scope);
					}else if(response.data.httpCode==200){
						$rootScope.loadingFunction($scope);
						$scope.isTipContent=true;
						$scope.tipContent="手机号还未注册";
						$timeout(function(){
								$scope.isTipContent=!$scope.isTipContent;
						},1000);
					}else{
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.loadingFunction($scope);
					$rootScope.serveErr($scope,$timeout);
				})
			}
	    }
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'忘记密码页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);
		$scope.send=function(){
			if($scope.isSendCode){
				$http({
					method:'Post',
					params:{phone:$scope.user.phone},
					url:$rootScope.rootScopeUrl+'/api/send/authcode'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loginBack=$location.url();
						count=60;
						$scope.time='60s';
						var interval=$interval(function(){
							if(count<=0){
								$interval.cancel(interval);
								$scope.time='';
							}else{
								count--;
								$scope.time=count+'s';
							}
						},1000);
					}else{
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.serveErr($scope,$timeout);
				})
			}
		}
		$scope.submit=function(){
			$state.go("setnewpassword",{phone:$scope.user.phone,authCode:$scope.user.authCode})
		}
		//微信分享
		var objPara,objJson,linkUrl;
		 linkUrl=$location.absUrl().split("?userData")[1]?$location.absUrl().split("?userData")[0]:$location.absUrl();
		 objJson={
		 	url:$rootScope.rootScopeUrl+"/api/wechat/config",
		 	objCur:linkUrl
		 }
		weixinsharehttp.getConfig(objJson);
		objPara={
			title:"元气小说上线啦！",
			desc:"我们来终结你的书荒，脑洞大，欢乐多，元气小说最懂你！",
			link:linkUrl,
			imgUrl:"http://fdfs.oqxiaoshuo.com:80/group2/M00/00/03/CgoKDVomBQeATmIDAAAQT0r-Q_4568.png"
		}
		weixinshare.onMenuShareAppMessage(objPara);
		weixinshare.onMenuShareTimeline(objPara);
}])
