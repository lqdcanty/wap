'use strict'
angular.module('app').controller('bookcontentCtrl',['userTracking','weixinsharehttp','weixinshare','$q','$location','$rootScope','cache','$state','$timeout','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$q,$location,$rootScope,cache,$state,$timeout,$http,$scope){
    //主要解决支付之后返回的页面链接
    //微信静默注册跟登录；
        var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
        var ua = navigator.userAgent.toLowerCase();
        var bookIdR,chapterIdR,extIdW,channelIdW,czSuccess;
        $(window).scrollTop(0);
             
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
        if(ua.match(/MicroMessenger/i)=="micromessenger"){
            jmRegisterPage();
            if(loginSuccess||(cache.get("userId")!=undefined&&cache.get("userId")!=-1)){
               ABC();
            }
        }else{
            ABC();
        }
        function ABC(){
            $rootScope.pageStyleOne=$location.url();
            /*$rootScope.pageStyle='';*/
            $rootScope.aboutLogin=$location.url();
            var search = $location.search();
            var urlR=$location.absUrl().split("!")[0];
            $scope.QRIsShow=false;
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
            if(search.linkId){
                if(search.linkId.split('?')[1]){
                    cache.put("linkId",search.linkId.split('?')[0]);
                }else{
                    cache.put("linkId",search.linkId);
                }
            }
            if($state.params.bookId&&$state.params.bookId!=-1){
                bookIdR=$state.params.bookId;
            }else if(search.bookId){
                if(search.bookId.split("?")[1]){
                    bookIdR=search.bookId.split("?")[0];
                }else{
                    bookIdR=search.bookId;
                }
            }else{
                bookIdR=-1;
            }
            
            if($state.params.chapterId&&$state.params.chapterId!=-1){
                chapterIdR=$state.params.chapterId;
            }else if(search.chapterId){
                if(search.chapterId.split("?")[1]){
                    chapterIdR=search.chapterId.split("?")[0];
                }else{
                    chapterIdR=search.chapterId;
                }
            }else{
                chapterIdR=-1;
            }
            if($state.params.czSuccess=="1"){
                czSuccess=1;
            }else{
                czSuccess="";
            }
            
            extIdW=cache.get("extId")?cache.get("extId"):-1;
            channelIdW=cache.get("channelId")?cache.get("channelId"):-1;
            $scope.loading=true;
            var userId;
            if(cache.get('userId')&&cache.get('userId')!=undefined){
                userId=cache.get('userId');
            }else{
                userId=-1;
            }
            //从这里开始
            var temp=false;
            $scope.isChapterAutoPurchase=false;
            if(cache.get("userId")!=undefined&&(ua.match(/MicroMessenger/i)=="micromessenger")){
                Content();
            }else if(cache.get("userId")==undefined&&loginSuccess){
                Content();
            }else if(ua.match(/MicroMessenger/i)!="micromessenger"){
                Content();
            }
                
            
            $scope.goDetail=function(){
                if(bookIdR!=-1){
                    $state.go("bookdetail",{bookId:bookIdR})
                }else if($scope.bookContent){
                    $state.go("bookdetail",{bookId:$scope.bookContent.bookId})
                }
            }
            $scope.goDirectory=function(){
                if(bookIdR!=-1){
                    $state.go("directory",{bookId:bookIdR})
                }else if($scope.bookContent){
                    $state.go("directory",{bookId:$scope.bookContent.bookId})
                }
            }
            function Content(){
                if(chapterIdR==-1||chapterIdR.split("?")[1]==undefined){
                    $http({
                        method:'Post',
                        params:{bookId:bookIdR,userId:userId,chapterId:chapterIdR},
                        url:$rootScope.rootScopeUrl+'/api/book/content'
                    }).then(function successCallback(response){
                        if(response.data.httpCode==200){
                            if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
                                var text="为了便于您的阅读，请添加本链接到书签";
                                $rootScope.collectTip($scope,$timeout,text);
                            }
                            $rootScope.loginBack=$location.url();
                            $rootScope.loadingFunction($scope);
                            $scope.bookContent=response.data.data;
                            $rootScope.title=response.data.data.bookName;
                            //$rootScope.title="书名";
                            $rootScope.payBackPage=$location.url();
                            $scope.QRIsShow=true;
                            _hmt.push(['_trackEvent', '阅读者', 'reader', userId+':'+cache.get("userId")!=undefined?cache.get("userId"):-1]);
                            $scope.wordRecommendShow=true;
                            if($scope.qrImgUrl==-1){
                                $scope.QRIsShow=false;
                            }
                            $timeout(function() {
                                temp=true;
                            }, 1000);
                            if($scope.bookContent.readPermission=='all'){
                                var userTrackingJson={
                                    channelId:cache.get("channelId")?cache.get("channelId"):-1,
                                    extId:cache.get("extId")?cache.get("extId"):-1,
                                    userId:cache.get("userId")?cache.get("userId"):-1,
                                    page:"content",
                                    title:'内容页_all',
                                    columnName:'',
                                    columnIndex:-1,
                                    bookId:$state.params.bookId,
                                    activityId:-1,
                                    chapterId:$scope.bookContent.chapterId,
                                    url:$location.absUrl()
                                }
                                userTracking.getTrackingConfig(userTrackingJson);
                            }else if($scope.bookContent.readPermission=='vip'){
                                var userTrackingJson={
                                    channelId:cache.get("channelId")?cache.get("channelId"):-1,
                                    extId:cache.get("extId")?cache.get("extId"):-1,
                                    userId:cache.get("userId")?cache.get("userId"):-1,
                                    page:"content_vip",
                                    title:'内容页_vip',
                                    columnName:'',
                                    columnIndex:-1,
                                    bookId:$state.params.bookId,
                                    activityId:-1,
                                    chapterId:$scope.bookContent.chapterId,
                                    url:$location.absUrl()
                                }
                                userTracking.getTrackingConfig(userTrackingJson);
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
                        }else if(response.data.httpCode==101){//指的是还没有购买
                            $rootScope.loadingFunction($scope);
                            $scope.chapterMoney=parseInt(response.data.msg.split("-")[1]);//获取章节价格;
                                $scope.isChapterAutoPurchase=true;//充值成功不需要弹
                        }else if(response.data.httpCode==102){
                            $rootScope.loadingFunction($scope);
                            $state.go("main");
                            $timeout(function(){
                                $state.go("pay");
                            },1000);
                        }else if(response.data.httpCode == 103){
                            $rootScope.loadingFunction($scope);
                            var chapterMoneyYQ=parseInt(response.data.msg.split("-")[1]);//获取章节价格;
                            $state.go("paybalance",{needYQ:chapterMoneyYQ})//这里是余额不足的情况；
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
            /*if(ua.match(/MicroMessenger/i)!="micromessenger"){
                 Content();
            }*/
            //点击取消自动购买
            $scope.AutoCircle=true;
            $scope.AutoCircleFun=function(){
                $scope.AutoCircle=!$scope.AutoCircle;
            }
            //点击确认自动购买
            $scope.yesAutoPurchase=function(){
                /* var autoPurchaseNum=1;*/
                var autoPurchaseNum;
                 $scope.isChapterAutoPurchase=false;
                 if($scope.AutoCircle){
                    autoPurchaseNum=1;
                     purchaseAjx(autoPurchaseNum); 
                 }else{
                    autoPurchaseNum=-1;
                     purchaseAjx(autoPurchaseNum); 
                 }
            }
           

            $scope.closeAutoPurchase=function(){
                $scope.isChapterAutoPurchase=!$scope.isChapterAutoPurchase;
                if ($rootScope.payBackPage) {
                    window.location.href=urlR+'!'+ $rootScope.payBackPage;
                }
            }

              //封装的购买函数;
            function purchaseAjx(number){
                $scope.bookContent='';
                $http({
                    method:'Post',
                    params:{userId:userId,chapterId:chapterIdR,autoPurchase:number},
                    url:$rootScope.rootScopeUrl+'/api/book/purchase'
                }).then(function successCallback(response){
                    if(response.data.httpCode==200){
                        $rootScope.loadingFunction($scope);
                        _hmt.push(['_trackEvent', '作品购买', 'buy', bookIdR+'+'+$scope.bookContent.bookName]);
                        Content();
                        $timeout(function() {
                            temp=true;
                        }, 1000);
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
                    }else if(response.data.httpCode == 103){
                        $rootScope.loadingFunction($scope);
                        var chapterMoneyYQ=parseInt(response.data.msg.split("-")[1]);//获取章节价格;
                        $state.go("paybalance",{needYQ:chapterMoneyYQ})//这里是余额不足的情况；
                    }else{
                        $rootScope.loadingFunction($scope);
                        $rootScope.httpSuccess($scope,response,$timeout);
                    }
                },function errorCallback(response){
                    $rootScope.loadingFunction($scope);
                })
            }


            //二维码的获取与显示
            $http({
                method:'Post',
                params:{chapterId:chapterIdR},
                url:$rootScope.rootScopeUrl+'/api/tuiguang/qrcode'
            }).then(function successCallback(response){
                if(response.data.httpCode==200){
                    $scope.qrImgUrl=response.data.data.url;
                    if($scope.qrImgUrl==-1){
                        $scope.QRIsShow=false;
                    }
                }else{
                    $rootScope.httpSuccess($scope,response,$timeout);
                }
            },function errorCallback(response){
                
            })

            //文字推荐
            $http({
                method:'Post',
                params:{channelId:channelIdW,extId:extIdW},
                url:$rootScope.rootScopeUrl+'/api/recommend/text'
            }).then(function successCallback(response){
                if(response.data.httpCode==200){
                    $scope.wordRecommedList=response.data.data.bookList;
                }else{
                    $rootScope.httpSuccess($scope,response,$timeout);
                }
            },function errorCallback(response){
                
            })


            $scope.bookdetailX=function(item,bookId){
                $scope.QRIsShow=false;
                if(temp){
                    $scope.bookContent='';
                    if(item!=-1){
                        $state.go("bookcontent",{bookId:bookId,chapterId:item})
                    }else{
                        var text="到底了";
                        $scope.wordRecommendShow=false;
                        $rootScope.serveTip($scope,$timeout,text);
                        $timeout(function(){
                            $state.go("bookdetail",{bookId:bookId});
                        },1000);
                    }
                }

            }
            $scope.bookdetailS=function(item,bookId){
                $scope.QRIsShow=false;
                if(temp){
                    $scope.bookContent = '';
                    if (item != -1) {
                        $state.go("bookcontent", {bookId: bookId, chapterId: item});
                    } else {
                        var text = "到顶了";
                        $scope.wordRecommendShow=false;
                        $rootScope.serveTip($scope, $timeout, text);
                        $timeout(function () {
                            $state.go("bookdetail", {bookId: bookId});
                        }, 1000);
                    }
                }
            }

            $scope.colorArr=[{
                "id":0,
                "name":"白色",
            },{
                "id":1,
                "name":"橙色",
            },{
                "id":2,
                "name":"粉红色",
            },{
                "id":3,
                "name":"浅绿色",
            },{
                "id":4,
                "name":"夜间",
            }]
            $scope.isColor1=false;
            $scope.isColor2=false;
            $scope.isColor3=false;
            $scope.isColor4=false;
            $scope.isColor5=false;

            $scope.colorClick=function(col){
                if(col.id===0){
                    $scope.isColor1=true;
                    $scope.isColor2=false;
                    $scope.isColor3=false;
                    $scope.isColor4=false;
                    $scope.isColor5=false;
                    $scope.ii=0;
                    $('#changeBg a').eq(0).removeClass("changeBg1");
                    $('#changeBg a').eq(1).removeClass("changeBg2");
                }else if(col.id===1){
                    $scope.isColor1=false;
                    $scope.isColor2=true;
                    $scope.isColor3=false;
                    $scope.isColor4=false;
                    $scope.isColor5=false;
                    $scope.ii=1;
                    $('#changeBg a').eq(0).removeClass("changeBg1");
                    $('#changeBg a').eq(1).removeClass("changeBg2");
                }else if(col.id===2){
                    $scope.isColor1=false;
                    $scope.isColor2=false;
                    $scope.isColor3=true;
                    $scope.isColor4=false;
                    $scope.isColor5=false;
                    $scope.ii=2;
                    $('#changeBg a').eq(0).removeClass("changeBg1");
                    $('#changeBg a').eq(1).removeClass("changeBg2");
                }else if(col.id===3){
                    $scope.isColor1=false;
                    $scope.isColor2=false;
                    $scope.isColor3=false;
                    $scope.isColor4=true;
                    $scope.isColor5=false;
                    $scope.ii=3;
                    $('#changeBg a').eq(0).removeClass("changeBg1");
                    $('#changeBg a').eq(1).removeClass("changeBg2");
                }else if(col.id===4){
                    $scope.isColor1=false;
                    $scope.isColor2=false;
                    $scope.isColor3=false;
                    $scope.isColor4=false;
                    $scope.isColor5=true;
                    $scope.ii=4;
                    $('#changeBg a').eq(0).addClass("changeBg1");
                    $('#changeBg a').eq(1).addClass("changeBg2");
                }
            }
            var fs=18;
            $scope.litter=function(){
                if(fs<12||fs==14){
                    var text="已经是最小号了";
                    $rootScope.serveTip($scope,$timeout,text);
                }else{
                    fs=fs-2;
                    $("#J-chapterContent").attr("style","font-size:"+fs+"px");
                }
            }
            $scope.big=function(){
                if(fs>24||fs==24){
                    var text="已经是最大号了";
                    $rootScope.serveTip($scope,$timeout,text);
                }else{
                    fs=fs+2;
                    $("#J-chapterContent").attr("style","font-size:"+fs+"px");
                }
            }
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