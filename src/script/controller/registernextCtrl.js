'use strict'
	angular.module('app').controller('registernextCtrl',['userTracking','weixinsharehttp','weixinshare','$location','md5','$timeout','cache','$rootScope','$state','$http','$interval','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,md5,$timeout,cache,$rootScope,$state,$http,$interval,$scope){
	//console.log($state.params.phone,"登录的电话");
	$rootScope.bookstoreBack="";
	$rootScope.title="元气小说";
	var channel,extid;
	if(cache.get("channelId")){
		channel=cache.get("channelId");
	}else{
		channel=-1;
	}
	if(cache.get("extId")){
		extid=cache.get("extId");
	}else{
		extid=-1;
	}
	var userTrackingJson={
            channelId:cache.get("channelId")?cache.get("channelId"):-1,
            extId:cache.get("extId")?cache.get("extId"):-1,
            userId:cache.get("userId")?cache.get("userId"):-1,
            page:'',
            title:'注册设置密码页',
            columnName:'',
            columnIndex:-1,
            bookId:-1,
            activityId:-1,
            chapterId:-1,
            url:$location.absUrl()
        }
        userTracking.getTrackingConfig(userTrackingJson);
	var count=60;
		$scope.send=function(){
			$http({
				method:'Post',
				params:{phone:$state.params.phone},
				url:$rootScope.rootScopeUrl+'/api/send/authcode'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						//console.log($state.params.phone,"验证码");
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
	$scope.submit=function(){	
		$scope.loading=true;
		$scope.user.phone=$state.params.phone;
		$scope.user.channelId=channel;
		$scope.user.extId=extid;
		var pwdZQ=$scope.user.pwd;
		var pwdZ = md5.createHash(pwdZQ);
		$http({
				method:'Post',
				url:$rootScope.rootScopeUrl+'/api/register',
				params:{phone:$state.params.phone,channelId:channel,extId:extid,pwd:pwdZ,authCode:$scope.user.authCode}
			}).then(function successCallback(response){
				if(response.data.httpCode==200){
					$rootScope.loadingFunction($scope);
                    if(isWeiXin()){
                        window.location.href="http://topt.yqread.net/web/wechat/auth/redirect?phone="+$state.params.phone;
                    }else{
                       $state.go("login");
                    }
				}else{
					$rootScope.loadingFunction($scope);
					$rootScope.httpSuccess($scope,response,$timeout);
				}
			},function errorCallback(err){
				$rootScope.loadingFunction($scope);
				$rootScope.serveErr($scope,$timeout);
		})
	}
	//判断是不是微信；
	function isWeiXin(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
		}
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
