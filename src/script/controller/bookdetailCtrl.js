'use strict'
	angular.module('app').controller('bookdetailCtrl',['userTracking','weixinsharehttp','weixinshare','$q','$location','$timeout','$rootScope','cache','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$q,$location,$timeout,$rootScope,cache,$state,$http,$scope){
		$scope.isTipContent=false;
		$rootScope.aboutLogin=$location.url();//登录换回的地址
		$rootScope.loginBack=$location.url();//不登录换回的地址
		$scope.loading=true;
		$rootScope.title="元气小说";
		var userId=-1;
		if(cache.get('userId')&&cache.get('userId')!=undefined){
			userId=cache.get('userId');
		}else{
			userId=-1;
		}
		$(window).unbind("scroll");

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
                    cache.put("imgUrl",flage.imgUrl,1);
                    cache.put("binding",flage.binding,1);
                    var abc=decodeURIComponent($location.url()).split("?userData")[0];
                    $location.url(abc);
                    loginSuccess=true;
                }
            }
        }
        jmRegisterPage();
        
		//详情加载
		$http({
			method:'Post',
			params:{bookId:$state.params.bookId,userId:userId},
			cache:false,
			url:$rootScope.rootScopeUrl+'/api/book/detail'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
					var text="为了便于您的阅读，请添加本链接到书签";
       				$rootScope.collectTip($scope,$timeout,text);
				}
				$rootScope.loginBack=$location.url();
				$rootScope.loadingFunction($scope);
				$scope.bookDetail=response.data.data;
				_hmt.push(['_trackEvent', "浏览作品", 'browse', $scope.bookDetail.bookId+"+"+$scope.bookDetail.bookName+"+"+$scope.bookDetail.bookStatus]);
				var userTrackingJson={
					channelId:cache.get("channelId")?cache.get("channelId"):-1,
				    extId:cache.get("extId")?cache.get("extId"):-1,
				    userId:cache.get("userId")?cache.get("userId"):-1,
				    page:"details",
				    title:'详情页',
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
			async:false  
		},function errorCallback(response){
			$rootScope.loadingFunction($scope);
			$rootScope.serveErr($scope,$timeout);
		});
		//评论分页
		$scope.pagenum=1;
		var total=0;
		$scope.commentList={};
		//var pageTotal=Math.ceil(total/3);
		function GetComment(){
			var def=$q.defer();
			$http({
				method:'Post',
				params:{bookId:$state.params.bookId,pageNum:$scope.pagenum,pageSize:3},
				url:$rootScope.rootScopeUrl+'/api/book/comment/list'
			}).then(function successCallback(response){
				if(response.data.httpCode==200){
					$scope.commentList=response.data.data;
					total=response.data.data.total;
					def.resolve(total);
				}else if(response.data){
					$rootScope.httpSuccess($scope,response,$timeout);
				}
			},function errorCallback(err){
				$rootScope.serveErr($scope,$timeout);
			});
			 return def.promise;
		}

		GetComment().then(function(number){
			MoreComment(number);
		})
		//点击获得更多评论；
		function MoreComment(total){
			$scope.isScrollIf=true;
			$scope.seeMoreComment=(total>3)?true:false;
			$scope.loadMoreRecomment=function(){
				if($scope.isScrollIf){
					$scope.isScrollIf=false;
					if($scope.pagenum<Math.ceil(total/3)){
						$scope.loading=true;
						$scope.pagenum++;
						$http({
							method:'Post',
							params:{bookId:$state.params.bookId,pageNum:$scope.pagenum,pageSize:3},
							url:$rootScope.rootScopeUrl+'/api/book/comment/list'
						}).then(function successCallback(response){
							if(response.data.httpCode==200){
								$rootScope.loadingFunction($scope);
								for(var i=0;i<response.data.data.list.length;i++){
									$scope.commentList.list.push(response.data.data.list[i]);
								}
								$timeout(function() {
					                $scope.isScrollIf=true;
					            }, 500);
					            if($scope.pagenum==Math.ceil(total/3)){
									$scope.seeMoreComment=false;
									$scope.CommentOver=true;
								}
							}else if(response.data){
								$rootScope.loadingFunction($scope);
								$rootScope.httpSuccess($scope,response,$timeout);
							}	
						},function errorCallback(response){
							$rootScope.loadingFunction($scope);
							$rootScope.serveErr($scope,$timeout);
						});
					}
				}
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
				$scope.goodBookList=response.data.data.bookList;
			}else{
				$rootScope.httpSuccess($scope,response,$timeout);
			}
				
		},function errorCallback(response){
			$rootScope.serveErr($scope,$timeout);
		});

		//点赞
		$scope.zan=function(item,i){
			if(userId&&userId!=-1){
				$scope.isIndex=i;
				if(item.likeFlag){
					var text="你已经点赞了";
					$rootScope.serveTip($scope,$timeout,text);
				}else{
					$scope.loading=true;
					$http({
						method:'Post',
						params:{commentId:item.commentId,userId:userId},
						url:$rootScope.rootScopeUrl+'/api/like'
					}).then(function successCallback(response){
						if(response.data.httpCode==200){
							$rootScope.loadingFunction($scope);
							item.likeNum++;
							//$scope.zanlikeNum=item.likeNum;
							$scope.commentList.list[i].likeNum=item.likeNum;
							$scope.commentList.list[i].likeFlag=true;

						}else if(response.data.httpCode==100){
							$rootScope.loadingFunction($scope);
							//$state.go("login");
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
							$rootScope.loadingFunction($scope);
							$rootScope.httpSuccess($scope,response,$timeout);
						}
					},function errorCallback(response){
						$rootScope.loadingFunction($scope);
						$rootScope.serveErr($scope,$timeout);
					})
				}
			}else{
				$state.go("login");
			}
				
		}
		//搜藏
		$scope.cancel=false;
		$scope.cancelCollection=function(item){
			if(userId&&userId!=-1){
				if(item.concernFlag=='1'){
					$scope.cancel=!$scope.cancel;
				}else if(item.concernFlag=='2'){
					_hmt.push(['_trackEvent', '收藏作品', 'collection', $state.params.bookId+$scope.bookDetail.bookName]);//统计订阅人数；
					$scope.loading=true;
					var channelIdA=cache.get("channelId")?cache.get("channelId"):-1;
				   var extIdA=cache.get("extId")?cache.get("extId"):-1;
					$http({
							method:'Post',
							params:{bookId:$state.params.bookId,userId:userId,channelId:channelIdA,extId:extIdA},
							url:$rootScope.rootScopeUrl+'/api/bookshelf/add'
						}).then(function successCallback(response){
							if(response.data.httpCode==200){
								$rootScope.loadingFunction($scope);
								$scope.bookDetail.concernFlag='1';
								$scope.bookDetail.concernNum++;
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
	                              jmRegisterPage()
	                            }else{
	                                $state.go("login");
	                            }
							}else{
								$rootScope.loadingFunction($scope);
								$rootScope.httpSuccess($scope,response,$timeout);
							}
						},function errorCallback(err){
							$rootScope.loadingFunction($scope);
							$rootScope.serveErr($scope,$timeout);
					});
				}
			}else{
				$state.go("login");
			}
		}

		$scope.cancelN=function(){
			$scope.cancel=!$scope.cancel;
		}
		//取消搜藏
		$scope.cancelY=function(){
			$scope.cancel=!$scope.cancel;
			$scope.loading=true;
			if(userId&&userId!=-1){
				$http({
					method:'Post',
					params:{bookId:$state.params.bookId,userId:userId},
					url:$rootScope.rootScopeUrl+'/api/bookshelf/remove'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loadingFunction($scope);
						$scope.bookDetail.concernFlag='2';
						$scope.bookDetail.concernNum--;
					}else if(response.data.httpCode==100){
						$rootScope.loadingFunction($scope);
						$state.go("login");
					}else{
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.loadingFunction($scope);
					$rootScope.serveErr($scope,$timeout);
				});
			}
		}
		//写评论
		$scope.iscomment=function(){
			if(userId&&userId!=-1){
				$state.go("comment",{bookId:$scope.bookDetail.bookId});
			}else{
				$state.go("login");
			}
		}
		//开始阅读
		$scope.isread=function(){
			if(userId){
				/*if(bookDetail)*/
				$state.go("bookcontent",{bookId:$scope.bookDetail.bookId,chapterId:-1,userId:userId});
			}
		}
		$scope.detailBack=function () {
			if($rootScope.pageStyle){
                var url=$location.absUrl().split("!")[0];
                window.location.href=url+'!'+$rootScope.pageStyle;
			}else if($rootScope.bookstoreBack){
				 window.location.href=$rootScope.bookstoreBack;
			}else{
				$state.go("main");
			}
        }
        var linkUrl=$location.absUrl().split("?userData")[1]?$location.absUrl().split("?userData")[0]:$location.absUrl();
		var objJson={
		 	url:$rootScope.rootScopeUrl+"/api/wechat/config",
		 	objCur:linkUrl
		 }
		weixinsharehttp.getConfig(objJson);
        var objPara={
			title:"元气小说上线啦！",
			desc:"我们来终结你的书荒，脑洞大，欢乐多，元气小说最懂你！",
			link:linkUrl,
			imgUrl:"http://fdfs.oqxiaoshuo.com:80/group2/M00/00/03/CgoKDVomBQeATmIDAAAQT0r-Q_4568.png"
		}
		weixinshare.onMenuShareAppMessage(objPara);
		weixinshare.onMenuShareTimeline(objPara);
}])
