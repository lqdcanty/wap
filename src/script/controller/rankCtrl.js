'use strict'
	angular.module('app').controller('rankCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$timeout','$location','$rootScope','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$timeout,$location,$rootScope,$http,$scope){
        $rootScope.pageStyle=$location.url();
        $rootScope.payBackPage=$location.absUrl();
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
        $rootScope.loginBack=$location.url();//如果点击需要登录的页面换回之后应该跳转的地址；
		$scope.loading=true;
        $rootScope.aboutLogin=$location.url();
        function GetParams(){
            var search = $location.search();
            if(search.channelId){
                if(search.channelId.split('?')[1]){
                    cache.put("channelId",search.channelId.split('?')[0]);
                }else{
                    cache.put("channelId",search.channelId);
                }
            }
            if(search.extId){
                if(search.extId.split('?')[1]){
                    cache.put("extId",search.extId.split('?')[0]);
                }else{
                    cache.put("extId",search.extId);
                }
            }
        }
        GetParams();
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
            	$scope.loading=true;
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
			method:'POST',
			//url:'data/rank.json'
			url:$rootScope.rootScopeUrl+'/api/ranking'
		}).then(function successCallback(response){
			//console.log(response.data,"aa");
			if(response.data.httpCode==200){
				$scope.rankClass=response.data.data;
                if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
                        var text="为了便于您的阅读，请添加本链接到书签";
                        $rootScope.collectTip($scope,$timeout,text);
                    }
				$scope.loading=false;
                var userTrackingJson={
                    channelId:cache.get("channelId")?cache.get("channelId"):-1,
                    extId:cache.get("extId")?cache.get("extId"):-1,
                    userId:cache.get("userId")?cache.get("userId"):-1,
                    page:"rank",
                    title:'排行榜页',
                    columnName:'',
                    columnIndex:-1,
                    bookId:-1,
                    activityId:-1,
                    chapterId:-1,
                    url:$location.absUrl()
                }
                userTracking.getTrackingConfig(userTrackingJson);
			}else{
				$scope.loading=false;
				$rootScope.httpSuccess($scope,response,$timeout);
			}
		},function errorCallback(response){
			$scope.loading=false;
			$rootScope.serveErr($scope,$timeout);
		});

        $scope.rankFunction=function(item,name,i){
            var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:"column",
                title:item.bookName,
                columnName:name,
                columnIndex:(i+1),
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl().split("#")[0]+'#!/bookdetail?bookId='+item.bookId
            }
            userTracking.getTrackingConfig(userTrackingJson);
        }
        $scope.rankMore=function(item){
            var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:"column",
                title:'排行列表页',
                columnName:item.rankingName,
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl().split("#")[0]+'#!/bookdetail?styleName='+item.rankingName+"&rankingId="+item.rankingId
            }
            userTracking.getTrackingConfig(userTrackingJson);
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