'use strict'
	angular.module('app').controller('havabuyCtrl',['userTracking','weixinsharehttp','weixinshare','$location','cache','$rootScope','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,cache,$rootScope,$state,$http,$scope){
		$scope.isbookstore=false;
		$scope.loading=true;
		$scope.buyreadList=[];
        $rootScope.pageStyle='';
		$rootScope.aboutLogin=$location.url();
		$rootScope.bookstoreBack=$location.absUrl();
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
            	//$scope.loading=true;
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
                            //$scope.loading=false;
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
                    //$scope.loading=false;
                }
            }
        }
        jmRegisterPage();

		$http({
			method:'Post',
			params:{userId:cache.get("userId")},
			url:$rootScope.rootScopeUrl+'/api/my/purchased'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				$rootScope.loginBack=$location.url();
				$scope.loading=false;
				$scope.buyList=response.data.data;
				if($scope.buyList.length>0){
					$scope.isbookstore=false;	
				}else{
					$scope.isbookstore=!$scope.isbookstore;
				}
                var userTrackingJson={
                    channelId:cache.get("channelId")?cache.get("channelId"):-1,
                    extId:cache.get("extId")?cache.get("extId"):-1,
                    userId:cache.get("userId")?cache.get("userId"):-1,
                    page:'',
                    title:'已经购买',
                    columnName:'',
                    columnIndex:-1,
                    bookId:-1,
                    activityId:-1,
                    chapterId:-1,
                    url:$location.absUrl()
                }
                userTracking.getTrackingConfig(userTrackingJson);
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
			}
		},function errorCallback(response){
			$scope.loading=false;
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

		$scope.detailBack=function () {
			if($rootScope.pageStyle){
                var url=$location.absUrl().split("!")[0];
                window.location.href=url+'!'+$rootScope.pageStyle;
			}else{
				$state.go("main");
			}
        }
}])