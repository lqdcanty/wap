'use strict'
	angular.module('app').controller('ranklistsameCtrl',['weixinsharehttp','weixinshare','cache','$location','$timeout','$rootScope','$state','$http','$scope',function(weixinsharehttp,weixinshare,cache,$location,$timeout,$rootScope,$state,$http,$scope){
	$rootScope.bookstoreBack="";
	$rootScope.pageStyle=$location.url();
	$scope.textrank=$state.params.styleName;
	$scope.loading=true;
	$rootScope.title="元气小说";
	var total;

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
	
	$http({
		method:'Post',
		params:{rankingId:$state.params.rankingId},
		url:$rootScope.rootScopeUrl+'/api/ranking/list'
	}).then(function successCallback(response){
		//console.log(response.data,"12")
		if(response.data.httpCode==200){
			$scope.rankList=response.data.data;
			$rootScope.loadingFunction($scope);
			//console.log($scope.rankList);
			total=response.data.data.total;
		}else{
			$rootScope.loadingFunction($scope);
			$rootScope.httpSuccess($scope,response,$timeout);
		}
	},function errorCallback(response){
		$rootScope.loadingFunction($scope);
		$rootScope.serveErr($scope,$timeout);
	});
	
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