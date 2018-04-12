'use strict'
	angular.module('app').controller('classCtrl',['userTracking','weixinsharehttp','weixinshare','$location','cache','$state','$rootScope','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,cache,$state,$rootScope,$http,$scope){
		$scope.isBoyGril=true;
        $rootScope.pageStyle='';
        $scope.loading=false;
        $rootScope.bookstoreBack="";
        $rootScope.payBackPage=$location.absUrl();
        $rootScope.loginBack=$location.url();
        $rootScope.aboutLogin=$location.url();
        $rootScope.title="元气小说";
		$scope.grilbookstyle=[
			{
                "classCode":"DSYQ",
                "bookClass":"都市言情",
                "imageUrl":"image/ttu2.png"
            },{
                "classCode":"CYJK",
                "bookClass":"穿越架空",
                "imageUrl":"image/ttu1.png"
            },{
				"classCode":"GDYQ",
				"bookClass":"古代言情",
				"imageUrl":"image/ttu4.png"
			},{
				"classCode":"LMQC",
				"bookClass":"浪漫青春",
				"imageUrl":"image/ttu5.png"
			},{
				"classCode":"XYLYF",
				"bookClass":"悬疑灵异",
				"imageUrl":"image/ttu11.png"
			},{
				"classCode":"QTFLF",
				"bookClass":"其他",
				"imageUrl":"image/ttu8.png"
			}
		];
        $scope.boybookstyle=[
            {
                "classCode":"DSXS",
                "bookClass":"都市现实",
                "imageUrl":"image/ttu3.png"
            },{
                "classCode":"XHXZ",
                "bookClass":"玄幻修真",
                "imageUrl":"image/ttu9.png"
            },{
                "classCode":"LSJK",
                "bookClass":"历史架空",
                "imageUrl":"image/ttu6.png"
            },{
                "classCode":"YSCN",
                "bookClass":"异术超能",
                "imageUrl":"image/ttu12.png"
            },{
                "classCode":"XYLYM",
                "bookClass":"悬疑灵异",
                "imageUrl":"image/ttu10.png"
            },{
                "classCode":"QTFLM",
                "bookClass":"其他",
                "imageUrl":"image/ttu7.png"
            }
        ];
        $("#apptouch").on("touchend",function(){
        	$state.go("main");
		})
		$scope.grilStyle=function () {
			$scope.isBoyGril=true;
        }
        $scope.boyStyle=function () {
            $scope.isBoyGril=false;
        }
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'分类页',
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
                $scope.loading=true;
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
                             $scope.loading=false;
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
                    cache.put("imgUrl",flage.imgUrl,1);
                    if(flage.imgUrl!=""){
                        cache.put("imgUrl",flage.imgUrl,1);
                    }
                    cache.put("binding",flage.binding,1);
                    var abc=decodeURIComponent($location.url().split("?userData")[0]);
                    $location.url(abc);
                    $scope.loading=false;
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
