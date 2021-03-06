'use strict'
	angular.module('app').controller('setnewpasswordCtrl',['weixinsharehttp','weixinshare','$location','cache','md5','$timeout','$state','$rootScope','$http','$scope',function(weixinsharehttp,weixinshare,$location,cache,md5,$timeout,$state,$rootScope,$http,$scope){
		$scope.isTipContent=false;
        $rootScope.pageStyle='';
		var authCode=$state.params.authCode;
		var phone=$state.params.phone;
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
                }
            }
        }
        jmRegisterPage();
		
		$scope.submit=function(){
			$scope.loading=true;
			var pwdQ=$scope.user.newPwd;
			var cpwdQ=$scope.user.confirmPwd;
			var pwdZ= md5.createHash(pwdQ);
			var cpwdZ= md5.createHash(cpwdQ);
			$http({
					method:'Post',
					url:$rootScope.rootScopeUrl+'/api/pwd/new',
					params:{newPwd:pwdZ,confirmPwd:cpwdZ,authCode:authCode,phone:phone}
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loadingFunction($scope);
						$scope.tipContent=response.data.msg;
						$scope.isTipContent=!$scope.isTipContent;
						$timeout(function(){
							$scope.isTipContent=!$scope.isTipContent;
							$state.go("login");
						},1200)
					}else if(response.data.httpCode==100){
						$rootScope.loadingFunction($scope);
						$state.go("login")
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
