'use strict'
	angular.module('app').controller('authorCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$state','cache','$http','$scope','$rootScope',function(userTracking,weixinsharehttp,weixinshare,$location,$state,cache,$http,$scope,$rootScope){
		$rootScope.aboutLogin="";
		$rootScope.bookstoreBack="";
        $rootScope.pageStyle='';
		$scope.authorName=$state.params.author;
		$scope.pageNum=1;
		var total=0;
		$scope.authorNameList=[];
		$scope.loading=true;
		$rootScope.title="元气小说";
		//$rootScope.rootScopeUrl;
		
		//微信静默注册跟登录；
        var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
        var ua = navigator.userAgent.toLowerCase();
             
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


        $scope.gobackBtn=function(){
			if($rootScope.loginBack){
	            var url=$location.absUrl().split("!")[0];
	            window.location.href=url+'!'+$rootScope.loginBack;
			}else{
				$state.go("main");
			}
		}
		$http({
			method:'Post',
			url:$rootScope.rootScopeUrl+'/api/author/booklist',
			params:{author:$scope.authorName,pageNum:$scope.pageNum,pageSize:20}
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
					$rootScope.loadingFunction($scope);
					$scope.loading=false;
					$scope.authorNameList=response.data.data.list;
					total=response.data.data.total;
					var userTrackingJson={
		                channelId:cache.get("channelId")?cache.get("channelId"):-1,
		                extId:cache.get("extId")?cache.get("extId"):-1,
		                userId:cache.get("userId")?cache.get("userId"):-1,
		                page:'',
		                title:'作者作品页',
		                columnName:'',
		                columnIndex:-1,
		                bookId:-1,
		                activityId:-1,
		                chapterId:-1,
		                url:$location.absUrl()
		            }
		            userTracking.getTrackingConfig(userTrackingJson);
				}else{
					$rootScope.loadingFunction($scope);
					$rootScope.httpSuccess($scope,response,$timeout);
				}
			},function errorCallback(err){
				$rootScope.loadingFunction($scope);
				$rootScope.serveErr($scope,$timeout);
		})
		$scope.isScrollIf=true;
		$scope.loadingSmall=false;
		$(window).scroll(function() {
			var scrollTop = $(this).scrollTop();
			var scrollHeight = $(document).height();
			var windowHeight = $(this).height();

			if (scrollTop + windowHeight > scrollHeight-30) {
			// 此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
				if($scope.isScrollIf){
					$scope.isScrollIf=false;
					if($scope.pageNum<Math.ceil(total/20)){
						$scope.loadingSmall=!$scope.loadingSmall;
						$scope.pagenum++;
						$http({
							method:'Post',
							params:{author:$scope.authorName,pageNum:$scope.pageNum,pageSize:20},
							url:$rootScope.rootScopeUrl+'/api/author/booklist'
						}).then(function successCallback(response){
							if(response.data.httpCode==200){
								$rootScope.loginBack=$location.url();
								$scope.loadingSmall=!$scope.loadingSmall;
								for(var i=0;i<response.data.data.list.length;i++){
									$scope.authorNameList.push(response.data.data.list[i]);
								}
								$timeout(function() {
					                $scope.isScrollIf=true;
					            }, 1000);
							}else{
								$scope.loadingSmall=!$scope.loadingSmall;
								$rootScope.httpSuccess($scope,response,$timeout);
							}	
						},function errorCallback(response){
							$scope.loadingSmall=!$scope.loadingSmall;
							$rootScope.serveErr($scope,$timeout);
						});
					}
				}
			}
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