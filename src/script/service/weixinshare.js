'use strict'
angular.module('app')
.factory('weixinshare',['$window', function ($window) { 
        var service=new Object();
        service.onMenuShareTimeline=function(obj){  
            $window.wx.ready(function(){      
                $window.wx.onMenuShareTimeline({
                    desc: obj.desc,
                    title: obj.title,
                    link: obj.link,
                    imgUrl: obj.imgUrl,
                    imgWidth: 300,
                    imgHeight: 300,
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        //alert('分享到朋友圈成功');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        //alert('你没有分享到朋友圈');
                    }
                })
            })
        }
        service.onMenuShareAppMessage=function(obj){
            $window.wx.ready(function(){ 
               $window.wx.onMenuShareAppMessage({
                    desc: obj.desc,
                    title: obj.title,
                    link: obj.link,
                    imgUrl: obj.imgUrl,
                    imgWidth: 300,
                    imgHeight: 300,
                    trigger: function (res) {
                        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    },
                    success: function (res){
                        //alert('分享给朋友成功');
                    },
                    cancel: function (res) {
                        //alert('你没有分享给朋友');
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                }); 
            })
        }
    return service;
}]);
