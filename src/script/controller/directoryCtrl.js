'use strict'
	angular.module('app').controller('directoryCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$rootScope','cache','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,$timeout,$rootScope,cache,$state,$http,$scope){
      	var search = $location.search();
    	$rootScope.payBackPage=$location.absUrl().split("!")[1];
    	//$rootScope.aboutLogin=''
    	$rootScope.aboutLogin=$location.url();
    	$rootScope.title="元气小说";
		$scope.pagenum=1;
		$rootScope.bookstoreBack="";
		var total;
		$scope.volumeList=[];
		$scope.bookIdG=$state.params.bookId;
		$scope.loading=true;
		var userId;
		if(cache.get("userId")){
			userId=cache.get("userId");
		}else{
			userId=-1;
		}

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
            $scope.loading=true;
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
		var chapterList;
		$http({
			method:'Post',
			params:{bookId:$state.params.bookId,pageNum:$scope.pagenum,pageSize:25,userId:userId},
			url:$rootScope.rootScopeUrl+'/api/book/contents'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				$rootScope.loginBack=$location.url();
				 chapterList=response.data.data.list;
				total=response.data.data.total;
				for(var i=0;i<chapterList.length;i++){
					var lastVolume=$scope.volumeList.length>0?$scope.volumeList[$scope.volumeList.length-1]:'';
					var chapter=chapterList[i];
					if(lastVolume==''){
						var volume=Object();
						volume.volumeName=chapter.volumeName;
						volume.chapterList=[];
						volume.chapterList.push(chapter);
						$scope.volumeList.push(volume);
					}else if(lastVolume!=''){
						if(lastVolume.volumeName==chapter.volumeName){
							lastVolume.chapterList.push(chapter);
							$scope.volumeList[$scope.volumeList.length-1]=lastVolume;
						}else{
							var volume=Object();
							volume.volumeName=chapter.volumeName;
							volume.chapterList=[];
							volume.chapterList.push(chapter);
							$scope.volumeList.push(volume);
						}
					}
				}
				$scope.loading=false;
				ScrollF();
				var userTrackingJson={
					channelId:cache.get("channelId")?cache.get("channelId"):-1,
				    extId:cache.get("extId")?cache.get("extId"):-1,
				    userId:cache.get("userId")?cache.get("userId"):-1,
				    page:"menu",
				    title:'目录页',
				    columnName:'',
				    columnIndex:-1,
				    bookId:$state.params.bookId,
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
		});
		
		function ScrollF(){
			$scope.isScrollIf=true;
			$scope.loadingSmall=false;
			$(window).scroll(function() {
				var scrollTop = $(this).scrollTop();
				var scrollHeight = $(document).height();
				var windowHeight = $(this).height();
				if (scrollTop + windowHeight > scrollHeight-30) {	
					if($scope.isScrollIf){
				// 此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
						$scope.isScrollIf=false;
						if($scope.pagenum<Math.ceil(total/25)){
							$scope.pagenum++;
							$scope.loadingSmall=!$scope.loadingSmall;
								$http({
									method:'Post',
									params:{bookId:$state.params.bookId,pageNum:$scope.pagenum,pageSize:25},
									url:$rootScope.rootScopeUrl+'/api/book/contents'
								}).then(function successCallback(response){
									if(response.data.httpCode==200){
										$scope.loadingSmall=!$scope.loadingSmall;
										chapterList=response.data.data.list;
										//var lastVolume=$scope.volumeList.length>0?$scope.volumeList[$scope.volumeList.length-1]:'';
										var lastVolume=$scope.volumeList[$scope.volumeList.length-1];
										for(var i=0;i<chapterList.length;i++){
											var chapter=chapterList[i];
											 
											if(lastVolume.volumeName==chapter.volumeName){
												lastVolume.chapterList.push(chapter);
												$scope.volumeList[$scope.volumeList.length-1]=lastVolume;
											}else{
												var volume=Object();
												volume.volumeName=chapter.volumeName;
												volume.chapterList=[];
												volume.chapterList.push(chapter);
												$scope.volumeList.push(volume);
											}
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
		
		$scope.content=function(dirc){
			if(userId==-1){
				if((dirc.readPermission=="all")){
					$state.go("bookcontent",{bookId:$state.params.bookId,chapterId:dirc.chapterId});
				}else{
					$state.go("login");
				}
			}else if(userId&&userId!=-1){
				$state.go("bookcontent",{bookId:$state.params.bookId,chapterId:dirc.chapterId});
			}
			
		}
		$scope.dirDetail=function(){
			$state.go("bookdetail",{bookId:$state.params.bookId});
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
