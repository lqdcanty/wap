'use strict'
angular.module('app').controller('paybalanceCtrl', ['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$state', 'cache', '$rootScope', '$http', '$scope', function (userTracking,weixinsharehttp,weixinshare,$location,$timeout,$state, cache, $rootScope, $http, $scope) {
    var search = $location.search();
    $rootScope.aboutLogin=$location.url();
    var urlR=$location.absUrl().split("!")[0];
    var productId,isH5;
    $rootScope.title="元气小说";
    $scope.payBalance=$state.params.needYQ;
    var channelIdR=cache.get("channelId")?cache.get("channelId"):-1;
    var extIdR=cache.get("extId")?cache.get("extId"):-1;
    var linkIdR=cache.get("linkId")?cache.get("linkId"):-1;
    productId = $("#defaultId").val();
    $rootScope.bookstoreBack="";
    var productIdMony=30,sum=0;
    var ua = navigator.userAgent.toLowerCase();
    $("#payClass li").click(function () {
        $(this).addClass("cur").siblings().removeClass("cur");
        productId = $(this).find(".productId").val();
        if(productId==1){
            productIdMony=19.9;
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
            url: $rootScope.rootScopeUrl + '/api/yuanqi/recharge',
            params: {productId: productId, spbillCreateIp:-1, isH5: isH5, userId: cache.get("userId"),channelId:channelIdR,extId:extIdR,linkId:linkIdR}
        }).then(function successCallback(response) {
            if (response.data.httpCode == 200) {
                $scope.wechatPayParams = response.data.data;
                if (isH5) {
                    //统计订阅人数；
                    $scope.H5Pay();
                } else {
                   //统计订阅人数；
                    $scope.pay();
                }
            } else if (response.data.httpCode == 100) {
                $state.go("login");
            } else {
                $rootScope.httpSuccess($scope, response, $timeout);
            }
        }, function errorCallback(err) {
            $rootScope.serveErr($scope, $timeout);
        })
    };

    //H5支付
    $scope.H5Pay = function () {
       //var redirect_url = "&redirect_url="+encodeURIComponent(urlR+"!"+$rootScope.pageStyleOne+"?czSuccess=1");
       var redirect_url = "&redirect_url="+encodeURIComponent(urlR+"!"+$rootScope.pageStyleOne);
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
    };

    //支付 - 微信内置浏览器调用

    $scope.pay = function () {
        WeixinJSBridge.invoke(  
            'getBrandWCPayRequest', $scope.wechatPayParams,
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    //TODO:支付成功
                    //window.location.href=urlR+'!'+$rootScope.pageStyleOne+"?czSuccess=1";
                    
                    window.location.href=urlR+'!'+$rootScope.pageStyleOne;
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
                }
            }
        );
    };
    $scope.loading=true;
    $scope.isTipContent=false;
    var chapterIdR;
    var bookIdR;
    //返回按钮
    $scope.backPay = function () {
        if ($rootScope.payBackPage) {
            window.location.href=urlR+'!'+ $rootScope.payBackPage;
        } else {
            window.history.back();
        }
    }
    $http({
        method: 'Post',
        url: $rootScope.rootScopeUrl + '/api/my/yuanqi',
        params: {userId: cache.get("userId")}
    }).then(function successCallback(response) {
        if (response.data.httpCode == 200) {
            $rootScope.loginBack=$location.url();
            $rootScope.loadingFunction($scope);
            $scope.balanceNub = response.data.data.balance;
        } else if (response.data.httpCode == 100) {
            $state.go("login");
        }else {
            $rootScope.httpSuccess($scope, response, $timeout);
        }
    }, function errorCallback(err) {
        $rootScope.serveErr($scope, $timeout);
    })
    $scope.submit = function () {
      if(productId==2){
            isH5=ua.match(/MicroMessenger/i)=="micromessenger"?false:true;
           // isH5 = (typeof WeixinJSBridge == "undefined");
            $scope.recharge(productId, isH5);
      }
    }
    //微信分享
     var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:"recharge",
                title:'余额不足页',
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