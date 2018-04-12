'use strict'
	angular.module('app').controller('myCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$rootScope','cache','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,$timeout,$rootScope,cache,$state,$http,$scope){
		var search = $location.search();
		$rootScope.payBackPage=$location.absUrl();
		$rootScope.isSharePay=$location.url();
		$rootScope.loginBack=$location.url();
        $rootScope.pageStyle='';
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
		$rootScope.aboutLogin=$location.url();
		if(search.channelId){
			cache.put("channelId",search.channelId);
		}
		if(search.extId){
			cache.put("extId",search.extId);
		}
		if(cache.get('userId')){
			$scope.userName=cache.get('userName');
			$scope.imgUrl=cache.get('imgUrl');
		}
		$scope.isloginout=false;
		$scope.loginoutShow=function(){
			$scope.isloginout=!$scope.isloginout;
		}
		$scope.loginout=function(){
			cache.remove('userId');
			cache.remove('userName');
			cache.remove('imgUrl');
			cache.remove('gender');
			cache.remove('sign');
			cache.remove('token');
			$state.go('main');
		}
		$scope.loginoutN=function(){
			$scope.isloginout=!$scope.isloginout;
		}
		$scope.isTipContent=false;
		$scope.unopenTip=function(){
			var text="该功能未开放";
			$rootScope.serveTip($scope,$timeout,text);
		}
		var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'我的页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);

		//微信静默注册跟登录；
		var jmRegisterUrl,flage,postUrl,newUrl,endRout;
	    var ua = navigator.userAgent.toLowerCase();
	         
	    function jmRegisterPage(){
	        var extIdW=cache.get("extId")!=undefined?cache.get("extId"):'';
	        var channelIdW=cache.get("channelId")!=undefined?cache.get("channelId"):'';
	        var jmCode;
	        var search1=cache.get("userId")==undefined&&(!jmCode)?undefined:jmCode;
	        var postUrl;
	        if(cache.get("userId")==undefined&&(ua.match(/MicroMessenger/i)=="micromessenger")){
	            flage=$location.absUrl().split("userData=")[1];
	            endRout=$location.absUrl().split("userData=")[0];
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
	                flage=JSON.parse(decodeURIComponent(flage));
	                $rootScope.loadingFunction($scope);
	                cache.put("userId",flage.userId,1);
	                cache.put("userName",flage.userName,1);
	                cache.put("token",flage.token,1);
	               	if(flage.imgUrl!=""){
                    	cache.put("imgUrl",flage.imgUrl,1);
                    }
	               	cache.put("binding",flage.binding,1);
	                var abc=decodeURIComponent($location.url().split("?userData")[0]);
	                $location.url(abc);
	            }
	        }
	    }
	    jmRegisterPage();

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
