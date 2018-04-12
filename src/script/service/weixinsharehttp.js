'use strict'
angular.module('app')
.factory('weixinsharehttp',['$http','$window', function ($http,$window) { 
    var factoryhttp=new Object();
     factoryhttp.getConfig=function(objJson){
        var obj;
        if(objJson.objCur.split("?userData")[1]){
            obj= objJson.objCur.split("?userData")[0];
        }else if(!objJson.objCur.split("?userData")[1]){
            obj=objJson.objCur;
             $http({
                method:'Post',
                url:objJson.url,
                params:{url:obj}
            }).then(function successCallback(response){
                if(response.data.httpCode==200){
                    $window.wx.config({
                        debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId : response.data.data.appId, // 必填，公众号的唯一标识
                        timestamp : response.data.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr : response.data.data.nonceStr, // 必填，生成签名的随机串
                        signature : response.data.data.signature,// 必填，签名，见附录1
                        jsApiList : ['onMenuShareAppMessage','onMenuShareTimeline']
                        // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                }else{
                    //$rootScope.httpSuccess($scope,response,$timeout);
                }   
            },function errorCallback(response){
                //$rootScope.serveErr($scope,$timeout);
            });   
        } 
     }  
    return factoryhttp;
}]);
