'use strict'
	angular.module('app').controller('bookbaseCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$location','$rootScope','$interval','$timeout','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$location,$rootScope,$interval,$timeout,$http,$scope){
        $rootScope.pageStyle=$location.url();
        $scope.loadingSmall=false;
        $rootScope.payBackPage=$location.absUrl();
        $rootScope.aboutLogin='';
        $rootScope.bookstoreBack="";
        $rootScope.loginBack=$location.url();
        $rootScope.aboutLogin=$location.url();
        $rootScope.title="元气小说";

		$scope.classB=[{
			"id":0,
			"name":"全部"
		},{
			"id":1,
			"name":"连载中"
		},{
			"id":2,
			"name":"已完结"
		}];
		$scope.sortB=[{
			"id":1,
			"name":"按人气"
		},{
			"id":3,
			"name":"按销量"
		},{
			"id":2,
			"name":"按更新"
		}];
		$scope.loading=true;
		$scope.isBookclass=false;
		$scope.scrollTopHeight="";	
		$scope.isA=true;
		$scope.isB=true;
		$interval(function(){
			$(window).bind('scroll',function(){
				$scope.scrollTopHeight = $(window).scrollTop();
		
				if($scope.scrollTopHeight>49){
					$scope.isBookclass=true;
					$scope.warpMore=!$scope.isBookclass;
				}else{
					$scope.isBookclass=false;
					$scope.warpMore=false;
				}
			});
		},100);
		var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'书库页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);


		//微信静默注册跟登录；
        var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
        var ua = navigator.userAgent.toLowerCase();
             
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


		$scope.warpMore=false;
		$scope.warpMoreClick=function(){
			$scope.warpMore=!$scope.warpMore;
			$scope.isBookclass=!$scope.isBookclass;
		}
		$scope.closeWarpMoreClick=function(){
			$scope.warpMore=!$scope.warpMore;
			$scope.isBookclass=!$scope.isBookclass;
		}
  		$scope.pagenum=1;
  		$scope.bookStatus=0;
  		$scope.sortBy=1;
  		$scope.classTop="全部";
  		$scope.sortTop="按人气";
  		var total;
		$scope.pageB=function(para){
			$scope.loading=true;
			$http({
				method:'Post',
				params:para,
				url:$rootScope.rootScopeUrl+'/api/book/list'
			}).then(function successCallback(response){
				if(response.data.httpCode==200){
					if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
						var text="为了便于您的阅读，请添加本链接到书签";
           				$rootScope.collectTip($scope,$timeout,text);
					}

					$rootScope.loginBack=$location.url();
					$scope.loading=false;
					$scope.bookBase=response.data.data;
					total=response.data.data.total;
				}else{
					$rootScope.loadingFunction($scope);
					$rootScope.httpSuccess($scope,response,$timeout);
				}	
			},function errorCallback(response){
				$rootScope.loadingFunction($scope);
				$rootScope.serveErr($scope,$timeout)
			});
				
		}

		if(cache.get("userId")!=undefined&&(ua.match(/MicroMessenger/i)=="micromessenger")){
	        $scope.pageB({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
	        scroll({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
	    }else if(cache.get("userId")==undefined&&loginSuccess){
	        $scope.pageB({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
	        scroll({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
	    }


		if(ua.match(/MicroMessenger/i)!="micromessenger"){
			$scope.pageB({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
			scroll({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
		}
		/*scroll({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:20});*/
		$scope.classBClick=function(item,i){
			$scope.isA=false;
			$scope.pagenum=1;
			$scope.loading=true;
			$scope.isClassB=i;
			$scope.bookStatus=item.id;
			$scope.classTop=item.name;
			var params={bookStatus:$scope.bookStatus,sortBy:$scope.sortBy,pageNum:$scope.pagenum,pageSize:10};
			$scope.pageB(params);
			scroll(params);
		}
		$scope.sortBClick=function(item,j){
			$scope.isB=false;
			$scope.pagenum=1;
			$scope.loading=true;
			$scope.issortB=j;
			$scope.sortBy=item.id;
			$scope.sortTop=item.name;
			var params={bookStatus:$scope.bookStatus,sortBy:$scope.sortBy,pageNum:$scope.pagenum,pageSize:10};
			$scope.pageB(params);
			scroll(params);
		}
		$scope.loadingSmall=false;
		function scroll(para){
			$scope.isScrollIf=true;
			$(window).scroll(function() {
				var scrollTop = $(this).scrollTop();
				var scrollHeight = $(document).height();
				var windowHeight = $(this).height();
				if (scrollTop + windowHeight > scrollHeight-30) {
				// 此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
					if($scope.isScrollIf){
						$scope.isScrollIf=false;

						if($scope.pagenum<Math.ceil(total/10)){
							$scope.loadingSmall=!$scope.loadingSmall;
							$scope.pagenum++;
							var paras={bookStatus:para.bookStatus,sortBy:para.sortBy,pageNum:$scope.pagenum,pageSize:10}
							$http({
								method:'Post',
								params:paras,
								url:$rootScope.rootScopeUrl+'/api/book/list'
							}).then(function successCallback(response){
								if(response.data.httpCode==200){
									$scope.loadingSmall=!$scope.loadingSmall;
									for(var i=0;i<response.data.data.list.length;i++){
										$scope.bookBase.list.push(response.data.data.list[i]);
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