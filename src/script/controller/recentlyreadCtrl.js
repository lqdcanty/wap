'use strict'
	angular.module('app').controller('recentlyreadCtrl',['userTracking','weixinsharehttp','weixinshare','$q','$location','$timeout','$rootScope','cache','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$q,$location,$timeout,$rootScope,cache,$state,$http,$scope){
	var userId=cache.get('userId');
	$rootScope.pageStyle=$location.url();
    $rootScope.bookstoreBack="";
	$rootScope.aboutLogin=$location.url();
	$scope.isbookstore=false;
    $rootScope.title="元气小说";
	$scope.loading=true;

	var search = $location.search();
    var urlR=$location.absUrl().split("!")[0];
    if(search.channelId){
        cache.put("channelId",search.channelId);
    }
    if(search.extId){
        cache.put("extId",search.extId);
    }
    /*var bookIdR,chapterIdR;
    if($state.params.bookId&&$state.params.bookId!=-1){
        bookIdR=$state.params.bookId;
    }else if(search.bookId){
        bookIdR=search.bookId;
    }else{
        bookIdR=-1;
    }
    if($state.params.chapterId&&$state.params.chapterId!=-1){
        chapterIdR=$state.params.chapterId;
    }else if(search.chapterId){
        chapterIdR=search.chapterId;
    }else{
    	chapterIdR=-1;
    }*/
    var userTrackingJson={
            channelId:cache.get("channelId")?cache.get("channelId"):-1,
            extId:cache.get("extId")?cache.get("extId"):-1,
            userId:cache.get("userId")?cache.get("userId"):-1,
            page:'',
            title:'最近阅读页',
            columnName:'',
            columnIndex:-1,
            bookId:-1,
            activityId:-1,
            chapterId:-1,
            url:$location.absUrl()
        }
        userTracking.getTrackingConfig(userTrackingJson);

    var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
    var ua = navigator.userAgent.toLowerCase();
         //微信登录
     function jmRegisterPage(){
     	var def=$q.defer();
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
                //$rootScope.loadingFunction($scope);
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
                def.resolve(flage.userId)
            }
        }
        return def.promise;
    }
    if(ua.match(/MicroMessenger/i)=="micromessenger"&&cache.get("userId")==undefined){
    	jmRegisterPage().then(function(userId){
    		app(userId);
    	})
    }else{
    	app(cache.get("userId"));
    }
	function app(userId){
   		$http({
			method:'Post',
			params:{userId:userId},
			url:$rootScope.rootScopeUrl+'/api/read/logs'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
                if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
                    var text="为了便于您的阅读，请添加本链接到书签";
                    $rootScope.collectTip($scope,$timeout,text);
                }
				$rootScope.loginBack=$location.url();
				$rootScope.loadingFunction($scope);
				$scope.recentRead=response.data.data;
				if($scope.recentRead.length==0){
					$scope.isbookstore=!$scope.isbookstore;
				}
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
			}else if(response.data.httpCode==102){
				$state.go("main");
			}else{
				$rootScope.loadingFunction($scope);
				$rootScope.httpSuccess($scope,response,$timeout);
			}
		},function errorCallback(response){
			$rootScope.loadingFunction($scope);
			$rootScope.serveErr($scope,$timeout);
		});
   	}
	$scope.goRead=function(item){
		$state.go("bookcontent",{userId:userId})
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
