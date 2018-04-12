'use strict';
angular.module('app',['ui.router','ngCookies','validation','angular-md5','ngFileUpload']).run(['$window','$http','$rootScope','$location',function($window,$http,$rootScope,$location){
	$rootScope.userName="";
	$rootScope.rootScopeUrl="http://aj53e7.natappfree.cc/web";
	/*$rootScope.rootScopeUrl="http://www.oqxiaoshuo.com";*/
	/*$rootScope.rootScopeUrl="http://localhost:8082";*/
	$rootScope.isBookclass=false;
	$rootScope.bookstoreBack=false;//从书架的详情页换回去的值
	$rootScope.isSharePay;//解决微信分享出去之后返回的问题
	$rootScope.homeAjax=true;
	$rootScope.pageStyle='';//详情页换回的地址
    $rootScope.pageStyleOne='';//支付之后换回的页面
    $rootScope.payBackPage='';// 不充值返回的页面
    $rootScope.isLoadContent=true;
    $rootScope.aboutLogin='';//登录成功换回的地址；
    $rootScope.loginBack='';//不登录换回的地址
	//确保首页再次加载；
	$rootScope.indexlist;
	$rootScope.indexcolumns;
	$rootScope.indexadsList;
	$rootScope.rechargeSuccess=false;//是否购买成功
	$rootScope.wxShare=$location.absUrl();//关于微信分享当前页链接；
	$rootScope.title="元气小说";
	$rootScope.isTipContentHome=true;

	//ajax请求不成功的提示
	$rootScope.serveErr=function(abc,$timeout){
		abc.tipContent="网络错误";
		abc.isTipContent=!abc.isTipContent;
		$timeout(function(){
			abc.isTipContent=!abc.isTipContent;
		},1000);
	}
	$rootScope.httpSuccess=function(abc,res,$timeout){
		//点击太快出现的问题；
		if(res.status==207){
			abc.tipContent="网络问题,请等待或者请刷新";
			abc.isTipContent=!abc.isTipContent;
			$timeout(function(){
				abc.isTipContent=!abc.isTipContent;
			},1000);
		}else{
			if(res.data.httpCode){
				abc.tipContent=res.data.msg;
				abc.isTipContent=!abc.isTipContent;
			}
			$timeout(function(){
				abc.isTipContent=!abc.isTipContent;
			},1000);
		}
	}

	

	//加载提示图片
	$rootScope.loadingFunction=function(abc){
		abc.loading=!abc.loading
	}
	//灵活配置提示信息；
	$rootScope.serveTip=function(abc,$timeout,text){
		abc.tipContent=text;
		abc.isTipContent=!abc.isTipContent;
		$timeout(function(){
			abc.isTipContent=!abc.isTipContent;
		},1000);
	}
	$rootScope.collectTip=function(abc,$timeout,text){
		abc.tipContent=text;
		abc.isTipContent=!abc.isTipContent;
		$timeout(function(){
			abc.isTipContent=!abc.isTipContent;
			$rootScope.isTipContentHome=!$rootScope.isTipContentHome;
		},3000);
	}
	//百度统计地址跟踪的函数
	$rootScope.$on('$locationChangeStart', function (){
		var baiduTJUrl=$location.url().split("?userData")[1]?$location.url().split("?userData")[0]:$location.url()
        BaiduTongJi.visitPage(baiduTJUrl);
    })
    var BaiduTongJi = {
	    visitPage : function (path){
	        _hmt.push(['_trackPageview', '/#!'+path]);
	    }
	};
}]);


        

