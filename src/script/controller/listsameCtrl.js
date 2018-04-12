'use strict'
	angular.module('app').controller('listsameCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$timeout','$location','$rootScope','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$timeout,$location,$rootScope,$state,$http,$scope){
	//$state.params.id
	$scope.loading=true;
	$scope.textstylename=$state.params.bookClass;
	$rootScope.pageStyle=$location.url();
   /* var total=0;*/
    $scope.pagenum=1;
    $rootScope.bookstoreBack="";
    $rootScope.title="元气小说";

    //微信静默注册
		var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
	    var ua = navigator.userAgent.toLowerCase();
	         //微信登录
	     function jmRegisterPage(){
	     	$scope.loading=true;
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
        jmRegisterPage();
        
	$http({
		method:'Post',
		url:$rootScope.rootScopeUrl+'/api/class/list',
		cache:false,
		params:{classCode:$state.params.classCode,pageNum:$scope.pagenum,pageSize:10}
	}).then(function successCallback(response){
		if(response.data.httpCode==200){
				 $scope.loading=false;
				$scope.listsameList=response.data.data.list;
				$scope.total=response.data.data.total;
				Scroll();
				var userTrackingJson={
	                channelId:cache.get("channelId")?cache.get("channelId"):-1,
	                extId:cache.get("extId")?cache.get("extId"):-1,
	                userId:cache.get("userId")?cache.get("userId"):-1,
	                page:'',
	                title:'分类列表页',
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
				$rootScope.httpSuccess($scope,response,$timeout)
			}
			async:false  
		},function errorCallback(err){
			 $scope.loading=false;
			$rootScope.serveErr($scope,$timeout);
	})

	function Scroll(){
		$scope.isScrollIf=true;
		$scope.loadingSmall=false;
		$(window).bind("scroll",function() {
			var scrollTop = $(this).scrollTop();
			var scrollHeight = $(document).height();
			var windowHeight = $(this).height();
			if (scrollTop + windowHeight > scrollHeight-30) {
				if($scope.isScrollIf){
					$scope.isScrollIf=false;
					if($scope.total>10){
						if($scope.pagenum<Math.ceil($scope.total/10)){
							$scope.loadingSmall=true;
							$scope.pagenum++;
							$http({
								method:'Post',
								cache:false,
								params:{classCode:$state.params.classCode,pageNum:$scope.pagenum,pageSize:10},
								url:$rootScope.rootScopeUrl+'/api/class/list'
							}).then(function successCallback(response){
								if(response.data.httpCode==200){
									$scope.loadingSmall=false;
									//$scope.bookBase=response.data.data;
									for(var i=0;i<response.data.data.list.length;i++){
										$scope.listsameList.push(response.data.data.list[i]);
									}
									$timeout(function() {
						                $scope.isScrollIf=true;
						            }, 1000);
								}else if(response.data){
									$rootScope.loadingFunction($scope);
									$rootScope.httpSuccess($scope,response,$timeout);
								}
								async:false  	
							},function errorCallback(response){
								$rootScope.loadingFunction($scope);
								$rootScope.serveErr($scope,$timeout);
							});
						}
					}
				}
			}
		});
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