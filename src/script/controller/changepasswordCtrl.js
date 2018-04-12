'use strict'
	angular.module('app').controller('changepasswordCtrl',['userTracking','weixinsharehttp','weixinshare','$location','md5','$rootScope','$state','$timeout','cache','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,md5,$rootScope,$state,$timeout,cache,$http,$scope){
		$rootScope.aboutLogin=$location.url();
		$scope.isTipContent=false;
        $rootScope.pageStyle='';
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'修改密码',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
        userTracking.getTrackingConfig(userTrackingJson);

		var userId=cache.get("userId");
		$scope.submit=function(){
			$scope.loading=true;
			var pwdO=$scope.user.pwd
			var pwdQ=$scope.user.newPwd;
			var cpwdQ=$scope.user.confirmPwd;
			var pwdOZ=md5.createHash(pwdO)
			var pwdZ= md5.createHash(pwdQ);
			var cpwdZ= md5.createHash(cpwdQ);
			$http({
					method:'Post',
					url:$rootScope.rootScopeUrl+'/api/pwd/update',
					params:{pwd:pwdOZ,newPwd:pwdZ,confirmPwd:cpwdZ,userId:userId}
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loginBack=$location.url();
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
						$timeout(function(){
							$state.go("my");
						},1200);
					}else if(response.data.httpCode==100){
						
						$rootScope.loadingFunction($scope);
						$state.go("login");
					}else{
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.loadingFunction($scope);
					$rootScope.serveErr($scope,$timeout);	
			})
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
