
'use strict'
angular.module('app').controller('paydetailCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$state','$rootScope','cache','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,$timeout,$state,$rootScope,cache,$http,$scope){
	var userId;
    $rootScope.pageStyle='';
    $rootScope.aboutLogin=$location.url();
	$scope.loading=true;
	$rootScope.bookstoreBack="";
	$rootScope.title="元气小说";

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

	 	$scope.ispayDetail=false;
		$http({
			method:'Post',
			url:$rootScope.rootScopeUrl+'/api/recharge/logs',
			params:{userId:cache.get("userId")?cache.get("userId"):-1}
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				$scope.loading=false;
				$rootScope.loginBack=$location.url();
				$scope.payDetailList=response.data.data;
				if($scope.payDetailList.length==0){
					$scope.ispayDetail=!$scope.ispayDetail;
				}
				var userTrackingJson={
	                channelId:cache.get("channelId")?cache.get("channelId"):-1,
	                extId:cache.get("extId")?cache.get("extId"):-1,
	                userId:cache.get("userId")?cache.get("userId"):-1,
	                page:'',
	                title:'消费详情页',
	                columnName:'',
	                columnIndex:-1,
	                bookId:-1,
	                activityId:-1,
	                chapterId:-1,
	                url:$location.absUrl()
	            }
	            userTracking.getTrackingConfig(userTrackingJson);
				//console.log($scope.payDetailList,"记录")
			}else if(response.data.httpCode==100){
				cache.remove('userId');
                cache.remove('userName');
                cache.remove('imgUrl');
                cache.remove('gender');
                cache.remove('sign');
                cache.remove('binding');
                $rootScope.loadingFunction($scope);
                if(ua.match(/MicroMessenger/i)=="micromessenger"){
                  jmRegisterPage();
                }else{
                    $state.go("login");
                }
				
			}else{
				$scope.loading=false;
				$rootScope.httpSuccess($scope,response,$timeout);
			}
		},function errorCallback(err){
			$scope.loading=false;
			$rootScope.serveErr($scope,$timeout);	
		})
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