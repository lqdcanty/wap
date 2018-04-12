'use strict'
angular.module('app').controller('personalinformationCtrl',['userTracking','weixinsharehttp','weixinshare','$location','Upload','$state','$rootScope','$timeout','cache','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,Upload,$state,$rootScope,$timeout,cache,$http,$scope){
			$scope.isTipContent=false;
			$scope.isName=false;
			$scope.isSex=false;
			$scope.isSign=false;
			$scope.loading=true;
    		$rootScope.pageStyle='';
    		$rootScope.bookstoreBack="";
    		$rootScope.title="元气小说";
    		$rootScope.aboutLogin=$location.url();
			if(cache.get("userId")){
				$scope.userName=cache.get('userName');
				$scope.imgUrl=cache.get('imgUrl');
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
        
			$http({
					method:'Post',
					url:$rootScope.rootScopeUrl+'/api/my/info',
					params:{userId:cache.get('userId')}
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loginBack=$location.url();
						$scope.info=response.data.data;
						$scope.userNameS=$scope.info.userName;
						$scope.sexWord=$scope.info.gender;
						$scope.signText=$scope.info.signature;
						$scope.loading=false;
						var userTrackingJson={
			                channelId:cache.get("channelId")?cache.get("channelId"):-1,
			                extId:cache.get("extId")?cache.get("extId"):-1,
			                userId:cache.get("userId")?cache.get("userId"):-1,
			                page:'',
			                title:'个人信息页',
			                columnName:'',
			                columnIndex:-1,
			                bookId:-1,
			                activityId:-1,
			                chapterId:-1,
			                url:$location.absUrl()
			            }
			            userTracking.getTrackingConfig(userTrackingJson);
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
					}else{
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.serveErr($scope,$timeout);
			})
			$scope.form=function(par){
				$http({
					method:'Post',
					url:$rootScope.rootScopeUrl+'/api/info/update',
					params:par,
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
							$scope.tipContent=response.data.msg;
							var text="修改成功";
                        	$rootScope.serveTip($scope,$timeout,text);
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
						}else{
							$rootScope.httpSuccess($scope,response,$timeout);
						}
					},function errorCallback(err){
						$rootScope.serveErr($scope,$timeout);
				})
			}
			$scope.userName=function(){
				$scope.isName=!$scope.isName;
			}
			$scope.clickCloss=function(){
				$scope.isName=$scope.isSex=$scope.isSign=false;
			}
			
			$scope.userNamedetermine=function(){
				$scope.isName=$scope.isSex=$scope.isSign=false;
				var params={
					"userId":cache.get("userId"),
					"userName":$scope.userNameS,
					"gender":$scope.sexWord,
					"signature":$scope.signText
				};
				$scope.form(params);
                cache.put("userName",$scope.userNameS);
			}
			$scope.genderClick=function(){
				$scope.isSex=!$scope.isSex;
			}
			$scope.nan=function(){
				$scope.sexWord="男";
				$scope.isName=$scope.isSex=$scope.isSign=false;
				var params={
					"userId":cache.get("userId"),
					"userName":$scope.userNameS,
					"gender":1,
					"signature":$scope.signText
				};
				$scope.form(params);
				//$(".gender_list gender_one.nan").addClass("cur").siblings().removeClass("cur");
			}

			$scope.nv=function(){
				$scope.sexWord="女";
				$scope.isName=$scope.isSex=$scope.isSign=false;
				var params={
					"userId":cache.get("userId"),
					"userName":$scope.userNameS,
					"gender":2,
					"signature":$scope.signText
				};
				$scope.form(params);
				//$(".gender_list gender_one.nan").addClass("cur").siblings().removeClass("cur");
			};
			$scope.signClick=function(){
				$scope.isSign=!$scope.isSign;
			}
			$scope.signdetermine=function(){
				$scope.isName=$scope.isSex=$scope.isSign=false;
				var params={
					"userId":cache.get("userId"),
					"userName":$scope.userNameS,
					"gender":$scope.sexWord,
					"signature":$scope.signText
				};
				$scope.form(params);
			}
//图片上上传
	var imgUrl;
    $scope.upload = function (file) {
    	$scope.loading=true;
        Upload.upload({
            //服务端接收
			method:'Post',
            url: $rootScope.rootScopeUrl +"/api/user/upload/img",  //url服务器接收的路径 imgurl为一个地址
            //上传的同时带的参数
            data: {imgFile:file,userId:cache.get("userId")}
        }).then(function successCallback(response){
            if(response.data.httpCode==200){
                $scope.loading=false;
            	$scope.imgUrl=response.data.data.imgUrl;
            	cache.put("imgUrl",response.data.data.imgUrl);
            }else if(response.data.httpCode==100){
                $rootScope.loadingFunction($scope);
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
            }else{
                 $scope.loading=false;
                $rootScope.httpSuccess($scope,response,$timeout);
            }
        },function errorCallback(err){
             $scope.loading=false;
            $rootScope.serveErr($scope,$timeout);
        })
    };

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

