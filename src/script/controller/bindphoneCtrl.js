'use strict'
	angular.module('app').controller('bindphoneCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$location','$timeout','$state','$interval','$rootScope','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$location,$timeout,$state,$interval,$rootScope,$http,$scope){
		$rootScope.pageStyle='';
		$rootScope.aboutLogin='';
		$scope.loading=false;
		$rootScope.bookstoreBack="";
		$rootScope.title="元气小说";

		//微信静默注册
		var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
	    var ua = navigator.userAgent.toLowerCase();
	   
		
	         //微信登录
	     function jmRegisterPage(){
            var extIdW=cache.get("extId")!=undefined?cache.get("extId"):'';
            var channelIdW=cache.get("channelId")!=undefined?cache.get("channelId"):'';
            var jmCode;
            var search1=cache.get("userId")==undefined&&(!jmCode)?undefined:jmCode;
            var postUrl;
            if(cache.get("userId")==undefined&&(ua.match(/MicroMessenger/i)=="micromessenger")){
                flage=decodeURIComponent($location.absUrl()).split("userData=")[1];
                endRout=decodeURIComponent($location.absUrl()).split("?userData=")[0];
                if(flage==undefined){
                    jmRegisterUrl=encodeURIComponent($location.absUrl());
                    postUrl=$rootScope.rootScopeUrl+'/wechat/auto/redirect?extId='+extIdW+'&channelId='+channelIdW+'&url='+jmRegisterUrl;
                    $http({
                        method:'Get',
                        url:postUrl
                    }).then(function successCallback(response){
                        if(response.data.httpCode==200){
                            var urlTemp=response.data.data.url;
                            window.location.href=urlTemp;
                        }else{
                            $rootScope.httpSuccess($scope,response,$timeout);
                        }   
                    },function errorCallback(response){
                 
                        $rootScope.serveErr($scope,$timeout);
                    });
                }else{
                    flage=JSON.parse(flage);
                    $rootScope.loadingFunction($scope);
                    cache.put("userId",flage.userId,1);
                    cache.put("userName",flage.userName,1);
                    cache.put("token",flage.token,1);
                    if(flage.imgUrl!=""){
                    	cache.put("imgUrl",flage.imgUrl,1);
                    }
                    cache.put("binding",flage.binding,1);
                    var abc=decodeURIComponent($location.url()).split("?userData")[0];
                    $location.url(abc);
                    loginSuccess=true;
                    $scope.loading=false;
                }
            }
        }
        //jmRegisterPage();
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'手机号绑定页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);

		$scope.inputBlur=function(){
			if($("#csValue").val()!=""){
				$scope.loading=true;
				$http({
					method:'Post',
					params:{phone:$scope.user.phone},
					url:$rootScope.rootScopeUrl+'/api/phone/validation'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loginBack=$location.url();
						$scope.isSendCode=true;
						$rootScope.loadingFunction($scope);
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
		//发送短信请求
		var count=60;
		$scope.send=function(){
			if($scope.isSendCode){
				$http({
					method:'Post',
					params:{phone:$scope.user.phone},
					url:$rootScope.rootScopeUrl+'/api/send/authcode'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
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

			$state.go("bindphonepwd",{phone:$scope.user.phone,authCode:$scope.user.authCode})
		}

		$scope.gobackBtn=function(){
			if($rootScope.loginBack){
	            var url=$location.absUrl().split("!")[0];
	            //console.log($rootScope.pageStyle,"ceshi")
	            window.location.href=url+'!'+$rootScope.loginBack;
			}else{
				$state.go("main");
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
