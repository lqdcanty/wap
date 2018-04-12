'use strict'
angular.module('app').controller('bookstoreCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$rootScope','cache','$interval','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,$timeout,$rootScope,cache,$interval,$state,$http,$scope){
    $rootScope.aboutLogin=$location.url();
    $scope.isbookstore=true;
    $rootScope.pageStyle='';
    $scope.bookcover=false;
    $scope.progressList=[];
    $scope.loading=true;
    $scope.falseS=false;
    $rootScope.title="元气小说";
    $rootScope.aboutLogin=$location.url();
    $rootScope.bookstoreBack=$location.absUrl();
    if($state.params.router){
        $scope.falseS=true;
    }
    var jmRegisterUrl,flage,postUrl,newUrl,endRout;
    var ua = navigator.userAgent.toLowerCase();
    var imgCover=false;

   

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
                }
            }
        }
        jmRegisterPage();

    $http({
        method:'Post',
        params:{userId:cache.get("userId")},
        url:$rootScope.rootScopeUrl+'/api/my/bookshelf'
    }).then(function successCallback(response){
        if(response.data.httpCode==200){
            $rootScope.loginBack=$location.url();
            $rootScope.loadingFunction($scope);
            $scope.collectList=response.data.data;
            if($scope.collectList.length>0){
                $scope.isbookstore=!$scope.isbookstore;
            }
             var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'书架页',
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
    },function errorCallback(response){
        $rootScope.serveErr($scope,$timeout);
    });

   $http({
        method:'Post',
        params:{userId:cache.get("userId")},
        url:$rootScope.rootScopeUrl+'/api/read/logs'
    }).then(function successCallback(response){
        if(response.data.httpCode==200){
            $rootScope.loginBack=$location.url();
            $scope.progressList=response.data.data;
            if($scope.progressList.length>0){
                $scope.bookcover=true;
                swiperCover();
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
              jmRegisterPage()
            }else{
                $state.go("login");
            }
        }else{
            //$rootScope.loadingFunction($scope);
            $rootScope.httpSuccess($scope,response,$timeout);
        }
    },function errorCallback(response){
        //$rootScope.loadingFunction($scope);
        $rootScope.serveErr($scope,$timeout);
    });
    $scope.goRead=function(item){
        $state.go("bookcontent",{userId:cache.get("userId"),bookId:item.bookId,chapterId:-1})
    }
    function swiperCover(){
        $timeout(function(){
            var coverSwiper=new Swiper("#coverSwiper", {
                slidesPerView: "auto",
                loopedSlides: 2.5,
                centeredSlides: true,
                watchSlidesProgress: true,
                paginationClickable: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                autoplayDisableOnInteraction:true,
                onInit: function(t) {
                    var a = $(".swiper-slide-active img").attr("src");
                    "undefined" !== a && $(".J-blurMask").css("background-image", "url(" + a + ")");
                },
                onTransitionEnd: function(t) {
                    var a = $(".swiper-slide-active img").attr("src");
                    "undefined" !== a && $(".J-blurMask").css("background-image", "url(" + a + ")")
                }
            })
        },50);
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
}]);
