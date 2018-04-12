'use strict'
angular.module('app').controller('mainCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$rootScope','cache','$state','$timeout','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,$rootScope,cache,$state,$timeout,$http,$scope){
		var jmRegisterUrl=encodeURIComponent($location.absUrl());
		$rootScope.payBackPage=$location.absUrl();
		$scope.isTipContent=false;
		$rootScope.bookstoreBack="";
		$rootScope.pageStyle="";
		$scope.closeOqShow=false;
		$scope.oqValue;
		$rootScope.title="元气小说";
		$rootScope.aboutLogin=$location.url();
		$rootScope.loginBack=$location.url();
		$rootScope.isSharePay=$location.url();//微信分享支付页解决返回问题


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
        var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
	    var ua = navigator.userAgent.toLowerCase();
	   
		
	         //微信登录
	     function jmRegisterPage(){
            var extIdW=cache.get("extId")!=undefined?cache.get("extId"):'';
            var channelIdW=cache.get("channelId")!=undefined?cache.get("channelId"):'';
            var jmCode;
            var search1=cache.get("userId")==undefined&&(!jmCode)?undefined:jmCode;
            var postUrl;
            flage=decodeURIComponent($location.absUrl()).split("userData=")[1];
            if(flage!=undefined){
            	flage=JSON.parse(flage.split("#")[0]);
            	if(flage.f=="1"){
                	$scope.closeOqShow=true;
                	$scope.oqValue=flage.y+"元气";
                	$scope.flageShow=true;
                	var userTrackingJson={
						channelId:cache.get("channelId")?cache.get("channelId"):-1,
					    extId:cache.get("extId")?cache.get("extId"):-1,
					    userId:cache.get("userId")?cache.get("userId"):-1,
					    page:"activity",
					    title:'',
					    columnName:'',
					    columnIndex:-1,
					    bookId:-1,
					    activityId:flage.aid,
					    chapterId:-1,
					    url:''
					}
					userTracking.getTrackingConfig(userTrackingJson);
                }else if(flage.f==-1){
                	var userTrackingJson={
						channelId:cache.get("channelId")?cache.get("channelId"):-1,
					    extId:cache.get("extId")?cache.get("extId"):-1,
					    userId:cache.get("userId")?cache.get("userId"):-1,
					    page:"activity",
					    title:'',
					    columnName:'',
					    columnIndex:-1,
					    bookId:-1,
					    activityId:flage.aid,
					    chapterId:-1,
					    url:''
					}
					userTracking.getTrackingConfig(userTrackingJson);
					$scope.closeOqShow=true;
                	$scope.flageShow=false;
                	$scope.oqValue="您已领取过元气值！"

                }
            }
            if(cache.get("userId")==undefined&&(ua.match(/MicroMessenger/i)=="micromessenger")){
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
                    $rootScope.loadingFunction($scope);
                    cache.put("userId",flage.userId,1);
                    cache.put("userName",flage.userName,1);
                    cache.put("token",flage.token,1);
                    if(flage.imgUrl!=""){
                    	cache.put("imgUrl",flage.imgUrl,1);
                    }
                    cache.put("binding",flage.binding,1);
                    loginSuccess=true;//f=1&y=500
                }
                
            }
        }
        //关闭领取元气的弹出层；
		$scope.sure=function(){
    		$scope.closeOqShow=false;
    		window.location.href="http://www.oqxiaoshuo.com";
    		//$state.go("main");
    	}	
        jmRegisterPage();
		
		$scope.isAds=true;
		$scope.isTipContent=false;
		$scope.loading=true;
		if($rootScope.homeAjax){
			$http({
				method:'Post',
				params:'',
				url:$rootScope.rootScopeUrl+'/api/index'
			}).then(function successCallback(response){
				if(response.data.httpCode==200){
					if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
						var text="为了便于您的阅读，请添加本链接到书签";
           				$rootScope.collectTip($scope,$timeout,text);
					}
					$rootScope.loginBack=$location.url();
					$rootScope.homeAjax=false;
					$rootScope.loadingFunction($scope);
					$scope.list=response.data.data.banners;
					$scope.columns=response.data.data.columns;
					$scope.adsList=response.data.data.ads;
					$rootScope.indexlist=response.data.data.banners;
					$rootScope.indexcolumns=response.data.data.columns;
					$rootScope.indexadsList=response.data.data.ads;
					if($scope.adsList.length==0){
						$scope.isAds=!$scope.isAds;
					}

					var userTrackingJson={
						channelId:cache.get("channelId")?cache.get("channelId"):-1,
					    extId:cache.get("extId")?cache.get("extId"):-1,
					    userId:cache.get("userId")?cache.get("userId"):-1,
					    page:"home",
					    title:'首页',
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
			},function errorCallback(response){
				$rootScope.loadingFunction($scope);
				$rootScope.serveErr($scope,$timeout);
			});
		}else{
			$scope.loading=false;
			$scope.list=$rootScope.indexlist;
			$scope.columns=$rootScope.indexcolumns;
			$scope.adsList=$rootScope.indexadsList;
		}
		$scope.closeToupshow=true;
		$scope.closeToup=function(){
    		$scope.closeToupshow=!$scope.closeToupshow;
    	}
    	$scope.isScrollIf=true;
    	
		$scope.change=function(item,i){
			if($scope.isScrollIf){
				$scope.loading=true;
				$scope.changeI=i;
				$scope.changeC=true;
				$scope.isScrollIf=false;
				$http({
					method:'Post',
					params:{columnId:item.columnId},
					url:$rootScope.rootScopeUrl+'/api/column/book'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loadingFunction($scope);
						$scope.changeC=false;
						for(var i=0;i<$scope.columns.length;i++){
							if($scope.columns[i].columnId==item.columnId){
								$scope.columns[i].bookList=response.data.data;
							}
						}
						$timeout(function() {
			                $scope.isScrollIf=true;
			            }, 1000);
					}else{
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
					}	
				},function errorCallback(response){
					$rootScope.loadingFunction($scope);
					$rootScope.serveErr($scope,$timeout);
				});
			}
		}
		$scope.isrecentread=function(){
			$state.go("recentlyread");
		}
		$scope.ispay=function(){
			if(cache.get("userId")){
				$state.go("pay");
			}else{
				$state.go("login");
			}
		}
		$scope.column=function(colunm,name,index){
			var userTrackingJson={
				channelId:cache.get("channelId")?cache.get("channelId"):-1,
			    extId:cache.get("extId")?cache.get("extId"):-1,
			    userId:cache.get("userId")?cache.get("userId"):-1,
			    page:"column",
			    title:colunm.bookName,
			    columnName:'首页'+name,
			    columnIndex:index+1,
			    bookId:-1,
			    activityId:-1,
			    chapterId:-1,
			    url:$location.absUrl().split("#")[0]+'#!/bookdetail?bookId='+colunm.bookId
			}
			userTracking.getTrackingConfig(userTrackingJson);

		}
		$scope.bottonAds=function(item,i){
			var userTrackingJson={
				channelId:cache.get("channelId")?cache.get("channelId"):-1,
			    extId:cache.get("extId")?cache.get("extId"):-1,
			    userId:cache.get("userId")?cache.get("userId"):-1,
			    page:"column",
			    title:item.adName,
			    columnName:'首页底部广告',
			    columnIndex:i+1,
			    bookId:-1,
			    activityId:-1,
			    chapterId:-1,
			    url:item.adUrl
			}
			userTracking.getTrackingConfig(userTrackingJson);
			//window.location.href=banner.bannerUrl;
		}
		$scope.columnMore=function(item,i){
			var userTrackingJson={
				channelId:cache.get("channelId")?cache.get("channelId"):-1,
			    extId:cache.get("extId")?cache.get("extId"):-1,
			    userId:cache.get("userId")?cache.get("userId"):-1,
			    page:"column",
			    title:'栏目列表页',
			    columnName:item.columnName,
			    columnIndex:-1,
			    bookId:-1,
			    activityId:-1,
			    chapterId:-1,
			    url:$location.absUrl().split("#")[0]+'#!/columnsamelist?columnName='+item.columnName+"&columnId="+item.columnId
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
