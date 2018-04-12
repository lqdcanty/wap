'use strict'
	angular.module('app').controller('serachCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$location','$timeout','$rootScope','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$location,$timeout,$rootScope,$state,$http,$scope){
		//精彩推荐
        $rootScope.pageStyle=$location.url();
        $rootScope.title="元气小说";
        $rootScope.bookstoreBack="";
		$scope.loading=true;
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

		var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'搜索页',
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

		//精彩推荐
		$http({
			method:'Post',
			params:'',
			url:$rootScope.rootScopeUrl+'/api/recommend/booklist'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
					var text="为了便于您的阅读，请添加本链接到书签";
       				$rootScope.collectTip($scope,$timeout,text);
				}
				$scope.recommendList=response.data.data;
				$scope.loading=false;
			}else{
				$$scope.loading=false;
				$rootScope.httpSuccess($scope,response,$timeout);
			}
		},function errorCallback(response){
			$scope.loading=false;
			$rootScope.serveErr($scope,$timeout);
		});
		//关键字
		$http({
			method:'Post',
			params:'',
			url:$rootScope.rootScopeUrl+'/api/popsearch/list'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				//$rootScope.loadingFunction($scope);
				$scope.hotserachList=response.data.data;
			}else{
				$rootScope.httpSuccess($scope,response,$timeout);
			}
				
		},function errorCallback(response){
			$rootScope.serveErr($scope,$timeout);
		});
		//搜索
		$scope.pageNum=1;
		$scope.hideDiv=true;
		var total;
		$scope.serachsubmit=function(word){
			for(var i=0;i<$scope.hotserachList.length;i++){
				if(word===$scope.hotserachList[i].wd){
					$scope.loading=true;
					$scope.searchVal=word;
				}
			}
			if($scope.searchVal&&$scope.searchVal!=''){
				$scope.loading=true;
				var channelIdA=cache.get("channelId")?cache.get("channelId"):-1;
				var extIdA=cache.get("extId")?cache.get("extId"):-1
				$http({
					method:'Post',
					params:{wd:$scope.searchVal,pageNum:$scope.pageNum,pageSize:10,channelId:channelIdA,extId:extIdA},
					url:$rootScope.rootScopeUrl+'/api/search'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$scope.loading=false;
						$scope.hideDiv=false;
						$scope.serachList=response.data.data;
						total=response.data.data.total;
					}else{
						$scope.loading=false;
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(response){
					$scope.loading=false;
					$rootScope.serveErr($scope,$timeout);
				});
				$scope.isScrollIf=true;
				$scope.loadingSmall=false;
				$(window).scroll(function() {
					var channelIdA=cache.get("channelId")?cache.get("channelId"):-1;
				   var extIdA=cache.get("extId")?cache.get("extId"):-1
					var scrollTop = $(this).scrollTop();
					var scrollHeight = $(document).height();
					var windowHeight = $(this).height();
					if (scrollTop + windowHeight > scrollHeight-40) {
					// 此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
						if($scope.isScrollIf){
							$scope.isScrollIf=false;
							$scope.loadingSmall=!$scope.loadingSmall;
							if($scope.pagenum<Math.ceil(total/10)){
								$scope.pagenum++;
								$http({
									method:'Post',
									params:{wd:$scope.searchVal,pageNum:$scope.pageNum,pageSize:10,channelId:channelIdA,extId:extIdA},
									url:$rootScope.rootScopeUrl+'/api/search'
								}).then(function successCallback(response){
									if(response.data.httpCode==200){
										$scope.isScrollIf=true;
										$scope.loadingSmall=!$scope.loadingSmall;
										for(var i=0;i<response.data.data.list.length;i++){
											$scope.serachList.list.push(response.data.data.list[i]);
										}
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
			
		}
		//好书推荐
		var channelIdN=cache.get("channelId")?cache.get("channelId"):-1;
		var extIdN=cache.get("extId")?cache.get("extId"):-1;
		$http({
			method:'Post',
			params:{channelId:channelIdN,extId:extIdN},
			url:$rootScope.rootScopeUrl+'/api/recommend/book'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				//$rootScope.loadingFunction($scope);
				$scope.goodBookList=response.data.data.bookList;
			}else{
				$rootScope.httpSuccess($scope,response,$timeout);
			}
				
		},function errorCallback(response){
			$rootScope.serveErr($scope,$timeout);
		});
		//搜索词条删除
		$scope.cancelSearchVal=function(){
			$scope.searchVal="";
			$scope.hideDiv=true;
			$scope.loadingSmall=false;
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
