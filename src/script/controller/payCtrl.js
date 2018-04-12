'use strict'
angular.module('app').controller('payCtrl', ['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$state', 'cache', '$rootScope', '$http', '$scope', function (userTracking,weixinsharehttp,weixinshare,$location,$timeout,$state, cache, $rootScope, $http, $scope) {
    var search = $location.search();
    $rootScope.aboutLogin=$location.url();
    var urlR=$location.absUrl().split("!")[0];
    $rootScope.bookstoreBack="";
    var productId,isH5;
    $rootScope.pageStyle='';
    $rootScope.title="元气小说";
    var channelIdR=cache.get("channelId")?cache.get("channelId"):-1;
    var extIdR=cache.get("extId")?cache.get("extId"):-1;
    var linkIdR=cache.get("linkId")?cache.get("linkId"):-1;
    if(search.channelId){
        cache.put("channelId",search.channelId);
    }
    if(search.extId){
        cache.put("extId",search.extId);
    }
    productId = $("#defaultId").val();
    //console.log(productId);
    //静默注册
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
    var productIdMony=30;
    $("#payClass li").click(function () {
        $(this).addClass("cur").siblings().removeClass("cur");
        productId = $(this).find(".productId").val();
        if(productId==1){
            productIdMony=19.99;
        }else if(productId==2){
            productIdMony=30;
        }else if(productId==3){
            productIdMony=50;
        }else if(productId==4){
            productIdMony=80;
        }else if(productId==5){
            productIdMony=100;
        }else if(productId==6){
            productIdMony=150;
        }
        isH5=ua.match(/MicroMessenger/i)=="micromessenger"?false:true;
        //isH5 = (typeof WeixinJSBridge == "undefined");
        $scope.recharge(productId, isH5);
    });
    //微信支付发起支付请求参数
    $scope.wechatPayParams = {
        "appId": "",
        "timeStamp": "",
        "nonceStr": "",
        "package": "",
        "signType": "MD5",
        "paySign": ""
    };

    //获取本机ip
    var getLocalIPAddress = function () {
        //TODO:
        return "127.0.0.1";
    };

    

    //充值接口
    
    $scope.recharge = function (productId, isH5) {
        $http({
            method: 'Post',
            params: {productId:productId,spbillCreateIp:-1,isH5:isH5,userId:cache.get("userId"),channelId:channelIdR,extId:extIdR,linkId:linkIdR},
            url:$rootScope.rootScopeUrl + '/api/yuanqi/recharge'
        }).then(function successCallback(response) {
            if(response.data.httpCode == 200) {
                $scope.wechatPayParams = response.data.data;
                if (isH5) {
                    $scope.H5Pay();
                } else {
                    $scope.pay();
                }
            } else if (response.data.httpCode == 100) {
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
            } else {
                $rootScope.httpSuccess($scope, response, $timeout);
            }
        }, function errorCallback(err){
            $rootScope.serveErr($scope, $timeout);
        })
    };

    //H5支付
    $scope.H5Pay = function () {
        //在正式环境下要改成正式环境的地址；
        var redirect_url = "&redirect_url="+encodeURIComponent("http://www.oqxiaoshuo.com/#!/pay");
        var url = $scope.wechatPayParams.mweb_url + redirect_url;
        window.location.href = url;
        _hmt.push(['_trackEvent', 'H5支付', 'recharge', cache.get("userId")+cache.get("userName")+"支付"+productIdMony]);
        _hmt.push(['_trackOrder', {
           "orderId":productId,
            "orderTotal": productIdMony,
            "item": [
                {
                    "skuId": "Id="+productId,
                    "skuName": "金额="+productIdMony,
                    "category": "充值>H5支付",
                    "Price": productIdMony,
                    "Quantity": 1
                }
            ]}
        ]);
        //window.location.reload();
    };

    //支付 - 微信内置浏览器调用
    $scope.pay = function () {
        WeixinJSBridge.invoke(  
            'getBrandWCPayRequest', $scope.wechatPayParams,
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    //TODO:支付成功
                    _hmt.push(['_trackEvent', '微信支付', 'recharge', cache.get("userId")+cache.get("userName")+"支付"+productIdMony]);
                    _hmt.push(['_trackOrder', {
                        "orderId":productId,
                        "orderTotal": productIdMony,
                        "item": [
                            {
                                "skuId": "Id="+productId,
                                "skuName": "金额="+productIdMony,
                                "category": "充值>微信内支付",
                                "Price": productIdMony,
                                "Quantity": 1
                            }
                        ]}
                    ]);
                    window.location.reload();
                }
            }
        );
    };
    $scope.loading=true;
    $scope.isTipContent=false;
    var chapterIdR;
    var bookIdR;
    if($state.params.bookId&&$state.params.bookId!=-1){
        bookIdR=$state.params.bookId;
    }else if(search.bookId){
        bookIdR=search.bookId;
    };
    if($state.params.chapterId&&$state.params.chapterId!=-1){
        chapterIdR=$state.params.chapterId;
    }else if(search.chapterId){
        chapterIdR=search.chapterId;
    };
    //返回按钮
    $scope.backPay = function () {
        //window.history.back();
        if($rootScope.payBackPage){
            window.location.href=$rootScope.payBackPage;
        }else{
            $state.go("main");
        }
    }
    //获取剩余的元气值
    $http({
        method: 'Post',
        url: $rootScope.rootScopeUrl + '/api/my/yuanqi',
        params: {userId: cache.get("userId"), chapterId: chapterIdR}
    }).then(function successCallback(response) {
        if (response.data.httpCode == 200) {
            $rootScope.loginBack=$location.url();
            $rootScope.loadingFunction($scope);
            $scope.balanceNub = response.data.data.balance;
        } else if (response.data.httpCode == 100) {
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
        }else {
            $rootScope.httpSuccess($scope, response, $timeout);
        }
    }, function errorCallback(err) {
        $rootScope.serveErr($scope, $timeout);
    })

    $scope.submit = function () {
      if(productId==2){ 
            isH5=ua.match(/MicroMessenger/i)=="micromessenger"?false:true;
            //isH5 = (typeof WeixinJSBridge == "undefined");
            $scope.recharge(productId, isH5);
      }
    }

    //微信分享
         var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:"recharge",
                title:'支付页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);
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