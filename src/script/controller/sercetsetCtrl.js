'use strict'
	angular.module('app').controller('sercetsetCtrl',['userTracking','$location','weixinsharehttp','weixinshare','$state','$rootScope','cache','$http','$scope',function(userTracking,$location,weixinsharehttp,weixinshare,$state,$rootScope,cache,$http,$scope){
        $rootScope.pageStyle='';
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
        if(cache.get("binding")==undefined){
        	$scope.isJMShow=false;
        }else if(cache.get("binding")=="true"){
        	$scope.isJMShow=true;
        }else if(cache.get("binding")=="false"){
        	$scope.isJMShow=false;
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
			cache.remove('binding');
			$state.go('main');
		}
		$scope.loginoutN=function(){
			$scope.isloginout=!$scope.isloginout;
		}
		var userTrackingJson={
            channelId:cache.get("channelId")?cache.get("channelId"):-1,
            extId:cache.get("extId")?cache.get("extId"):-1,
            userId:cache.get("userId")?cache.get("userId"):-1,
            page:'',
            title:'安全设置页',
            columnName:'',
            columnIndex:-1,
            bookId:-1,
            activityId:-1,
            chapterId:-1,
            url:$location.absUrl()
        }
        userTracking.getTrackingConfig(userTrackingJson);

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
