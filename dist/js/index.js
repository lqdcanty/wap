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


        


!function(a,b){"function"==typeof define&&(define.amd||define.cmd)?define(function(){return b(a)}):b(a,!0)}(this,function(a,b){function c(b,c,d){a.WeixinJSBridge?WeixinJSBridge.invoke(b,e(c),function(a){g(b,a,d)}):j(b,d)}function d(b,c,d){a.WeixinJSBridge?WeixinJSBridge.on(b,function(a){d&&d.trigger&&d.trigger(a),g(b,a,c)}):d?j(b,d):j(b,c)}function e(a){return a=a||{},a.appId=z.appId,a.verifyAppId=z.appId,a.verifySignType="sha1",a.verifyTimestamp=z.timestamp+"",a.verifyNonceStr=z.nonceStr,a.verifySignature=z.signature,a}function f(a){return{timeStamp:a.timestamp+"",nonceStr:a.nonceStr,"package":a.package,paySign:a.paySign,signType:a.signType||"SHA1"}}function g(a,b,c){var d,e,f;switch(delete b.err_code,delete b.err_desc,delete b.err_detail,d=b.errMsg,d||(d=b.err_msg,delete b.err_msg,d=h(a,d,c),b.errMsg=d),c=c||{},c._complete&&(c._complete(b),delete c._complete),d=b.errMsg||"",z.debug&&!c.isInnerInvoke&&alert(JSON.stringify(b)),e=d.indexOf(":"),f=d.substring(e+1)){case"ok":c.success&&c.success(b);break;case"cancel":c.cancel&&c.cancel(b);break;default:c.fail&&c.fail(b)}c.complete&&c.complete(b)}function h(a,b){var d,e,f,g;if(b){switch(d=b.indexOf(":"),a){case o.config:e="config";break;case o.openProductSpecificView:e="openProductSpecificView";break;default:e=b.substring(0,d),e=e.replace(/_/g," "),e=e.replace(/\b\w+\b/g,function(a){return a.substring(0,1).toUpperCase()+a.substring(1)}),e=e.substring(0,1).toLowerCase()+e.substring(1),e=e.replace(/ /g,""),-1!=e.indexOf("Wcpay")&&(e=e.replace("Wcpay","WCPay")),f=p[e],f&&(e=f)}g=b.substring(d+1),"confirm"==g&&(g="ok"),"failed"==g&&(g="fail"),-1!=g.indexOf("failed_")&&(g=g.substring(7)),-1!=g.indexOf("fail_")&&(g=g.substring(5)),g=g.replace(/_/g," "),g=g.toLowerCase(),("access denied"==g||"no permission to execute"==g)&&(g="permission denied"),"config"==e&&"function not exist"==g&&(g="ok"),b=e+":"+g}return b}function i(a){var b,c,d,e;if(a){for(b=0,c=a.length;c>b;++b)d=a[b],e=o[d],e&&(a[b]=e);return a}}function j(a,b){if(z.debug&&!b.isInnerInvoke){var c=p[a];c&&(a=c),b&&b._complete&&delete b._complete,console.log('"'+a+'",',b||"")}}function k(){if(!("6.0.2">w||y.systemType<0)){var b=new Image;y.appId=z.appId,y.initTime=x.initEndTime-x.initStartTime,y.preVerifyTime=x.preVerifyEndTime-x.preVerifyStartTime,C.getNetworkType({isInnerInvoke:!0,success:function(a){y.networkType=a.networkType;var c="https://open.weixin.qq.com/sdk/report?v="+y.version+"&o="+y.isPreVerifyOk+"&s="+y.systemType+"&c="+y.clientVersion+"&a="+y.appId+"&n="+y.networkType+"&i="+y.initTime+"&p="+y.preVerifyTime+"&u="+y.url;b.src=c}})}}function l(){return(new Date).getTime()}function m(b){t&&(a.WeixinJSBridge?b():q.addEventListener&&q.addEventListener("WeixinJSBridgeReady",b,!1))}function n(){C.invoke||(C.invoke=function(b,c,d){a.WeixinJSBridge&&WeixinJSBridge.invoke(b,e(c),d)},C.on=function(b,c){a.WeixinJSBridge&&WeixinJSBridge.on(b,c)})}var o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;if(!a.jWeixin)return o={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest"},p=function(){var b,a={};for(b in o)a[o[b]]=b;return a}(),q=a.document,r=q.title,s=navigator.userAgent.toLowerCase(),t=-1!=s.indexOf("micromessenger"),u=-1!=s.indexOf("android"),v=-1!=s.indexOf("iphone")||-1!=s.indexOf("ipad"),w=function(){var a=s.match(/micromessenger\/(\d+\.\d+\.\d+)/)||s.match(/micromessenger\/(\d+\.\d+)/);return a?a[1]:""}(),x={initStartTime:l(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},y={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:v?1:u?2:-1,clientVersion:w,url:encodeURIComponent(location.href)},z={},A={_completes:[]},B={state:0,res:{}},m(function(){x.initEndTime=l()}),C={config:function(a){z=a,j("config",a);var b=z.check===!1?!1:!0;m(function(){var a,d,e;if(b)c(o.config,{verifyJsApiList:i(z.jsApiList)},function(){A._complete=function(a){x.preVerifyEndTime=l(),B.state=1,B.res=a},A.success=function(){y.isPreVerifyOk=0},A.fail=function(a){A._fail?A._fail(a):B.state=-1};var a=A._completes;return a.push(function(){z.debug||k()}),A.complete=function(){for(var c=0,d=a.length;d>c;++c)a[c]();A._completes=[]},A}()),x.preVerifyStartTime=l();else{for(B.state=1,a=A._completes,d=0,e=a.length;e>d;++d)a[d]();A._completes=[]}}),z.beta&&n()},ready:function(a){0!=B.state?a():(A._completes.push(a),!t&&z.debug&&a())},error:function(a){"6.0.2">w||(-1==B.state?a(B.res):A._fail=a)},checkJsApi:function(a){var b=function(a){var c,d,b=a.checkResult;for(c in b)d=p[c],d&&(b[d]=b[c],delete b[c]);return a};c("checkJsApi",{jsApiList:i(a.jsApiList)},function(){return a._complete=function(a){if(u){var c=a.checkResult;c&&(a.checkResult=JSON.parse(c))}a=b(a)},a}())},onMenuShareTimeline:function(a){d(o.onMenuShareTimeline,{complete:function(){c("shareTimeline",{title:a.title||r,desc:a.title||r,img_url:a.imgUrl,link:a.link||location.href},a)}},a)},onMenuShareAppMessage:function(a){d(o.onMenuShareAppMessage,{complete:function(){c("sendAppMessage",{title:a.title||r,desc:a.desc||"",link:a.link||location.href,img_url:a.imgUrl,type:a.type||"link",data_url:a.dataUrl||""},a)}},a)},onMenuShareQQ:function(a){d(o.onMenuShareQQ,{complete:function(){c("shareQQ",{title:a.title||r,desc:a.desc||"",img_url:a.imgUrl,link:a.link||location.href},a)}},a)},onMenuShareWeibo:function(a){d(o.onMenuShareWeibo,{complete:function(){c("shareWeiboApp",{title:a.title||r,desc:a.desc||"",img_url:a.imgUrl,link:a.link||location.href},a)}},a)},startRecord:function(a){c("startRecord",{},a)},stopRecord:function(a){c("stopRecord",{},a)},onVoiceRecordEnd:function(a){d("onVoiceRecordEnd",a)},playVoice:function(a){c("playVoice",{localId:a.localId},a)},pauseVoice:function(a){c("pauseVoice",{localId:a.localId},a)},stopVoice:function(a){c("stopVoice",{localId:a.localId},a)},onVoicePlayEnd:function(a){d("onVoicePlayEnd",a)},uploadVoice:function(a){c("uploadVoice",{localId:a.localId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},downloadVoice:function(a){c("downloadVoice",{serverId:a.serverId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},translateVoice:function(a){c("translateVoice",{localId:a.localId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},chooseImage:function(a){c("chooseImage",{scene:"1|2",count:a.count||9,sizeType:a.sizeType||["original","compressed"]},function(){return a._complete=function(a){if(u){var b=a.localIds;b&&(a.localIds=JSON.parse(b))}},a}())},previewImage:function(a){c(o.previewImage,{current:a.current,urls:a.urls},a)},uploadImage:function(a){c("uploadImage",{localId:a.localId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},downloadImage:function(a){c("downloadImage",{serverId:a.serverId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},getNetworkType:function(a){var b=function(a){var c,d,e,b=a.errMsg;if(a.errMsg="getNetworkType:ok",c=a.subtype,delete a.subtype,c)a.networkType=c;else switch(d=b.indexOf(":"),e=b.substring(d+1)){case"wifi":case"edge":case"wwan":a.networkType=e;break;default:a.errMsg="getNetworkType:fail"}return a};c("getNetworkType",{},function(){return a._complete=function(a){a=b(a)},a}())},openLocation:function(a){c("openLocation",{latitude:a.latitude,longitude:a.longitude,name:a.name||"",address:a.address||"",scale:a.scale||28,infoUrl:a.infoUrl||""},a)},getLocation:function(a){a=a||{},c(o.getLocation,{type:a.type||"wgs84"},function(){return a._complete=function(a){delete a.type},a}())},hideOptionMenu:function(a){c("hideOptionMenu",{},a)},showOptionMenu:function(a){c("showOptionMenu",{},a)},closeWindow:function(a){a=a||{},c("closeWindow",{immediate_close:a.immediateClose||0},a)},hideMenuItems:function(a){c("hideMenuItems",{menuList:a.menuList},a)},showMenuItems:function(a){c("showMenuItems",{menuList:a.menuList},a)},hideAllNonBaseMenuItem:function(a){c("hideAllNonBaseMenuItem",{},a)},showAllNonBaseMenuItem:function(a){c("showAllNonBaseMenuItem",{},a)},scanQRCode:function(a){a=a||{},c("scanQRCode",{needResult:a.needResult||0,scanType:a.scanType||["qrCode","barCode"]},function(){return a._complete=function(a){var b,c;v&&(b=a.resultStr,b&&(c=JSON.parse(b),a.resultStr=c&&c.scan_code&&c.scan_code.scan_result))},a}())},openProductSpecificView:function(a){c(o.openProductSpecificView,{pid:a.productId,view_type:a.viewType||0},a)},addCard:function(a){var e,f,g,h,b=a.cardList,d=[];for(e=0,f=b.length;f>e;++e)g=b[e],h={card_id:g.cardId,card_ext:g.cardExt},d.push(h);c(o.addCard,{card_list:d},function(){return a._complete=function(a){var c,d,e,b=a.card_list;if(b){for(b=JSON.parse(b),c=0,d=b.length;d>c;++c)e=b[c],e.cardId=e.card_id,e.cardExt=e.card_ext,e.isSuccess=e.is_succ?!0:!1,delete e.card_id,delete e.card_ext,delete e.is_succ;a.cardList=b,delete a.card_list}},a}())},chooseCard:function(a){c("chooseCard",{app_id:z.appId,location_id:a.shopId||"",sign_type:a.signType||"SHA1",card_id:a.cardId||"",card_type:a.cardType||"",card_sign:a.cardSign,time_stamp:a.timestamp+"",nonce_str:a.nonceStr},function(){return a._complete=function(a){a.cardList=a.choose_card_info,delete a.choose_card_info},a}())},openCard:function(a){var e,f,g,h,b=a.cardList,d=[];for(e=0,f=b.length;f>e;++e)g=b[e],h={card_id:g.cardId,code:g.code},d.push(h);c(o.openCard,{card_list:d},a)},chooseWXPay:function(a){c(o.chooseWXPay,f(a),a)}},b&&(a.wx=a.jWeixin=C),C});
/*
'use strict';
angular.module('app').config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
*/



  'use strict'
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){//config用来配置,用一个插件把他转换成显示声明的方式,provider就是对前面的函数（state，url）进行配置的入口；
    $stateProvider.state('main',{
        //state后面的main，是这页面的id
        url:'/main',//就是哈希值，也可以传参数、main/:id 
        templateUrl:'view/main.html',
        controller:'mainCtrl'
    }).state('bookbase',{
        url:'/bookbase',//就是哈希值，也可以传参数、main/:id 
        templateUrl:'view/bookbase.html',//对应的页面
        controller:'bookbaseCtrl'
    }).state('class',{
        url:'/class', 
        templateUrl:'view/class.html',
        controller:'classCtrl'
    }).state('serach',{
        url:'/serach', 
        templateUrl:'view/serach.html',
        controller:'serachCtrl'
    }).state('rank',{
        url:'/rank', 
        templateUrl:'view/rank.html',
        controller:'rankCtrl'
    }).state('my',{
        url:'/my', 
        templateUrl:'view/my.html',
        controller:'myCtrl'
    }).state('bookstore',{
        url:'/bookstore?router', 
        templateUrl:'view/bookstore.html',
        controller:'bookstoreCtrl'
    }).state('pay',{
        url:'/pay?bookId&chapterId',
        templateUrl:'view/pay.html',
        controller:'payCtrl'
    }).state('paydetail',{
        url:'/paydetail',
        templateUrl:'view/paydetail.html',
        controller:'paydetailCtrl'
     }).state('bookdetail',{
        url:'/bookdetail?bookId',
        templateUrl:'view/bookdetail.html',
        controller:'bookdetailCtrl'
     }).state('problems',{
        url:'/problems',
        templateUrl:'view/problems.html',
        controller:'problemsCtrl'
     }).state('login',{
        url:'/login?bookId&chapterId',
        templateUrl:'view/login.html',
        controller:'loginCtrl'
     }).state('register',{
        url:'/register',
        templateUrl:'view/register.html',
        controller:'registerCtrl'
     }).state('personalinformation',{
        url:'/personalinformation',
        templateUrl:'view/personalinformation.html',
        controller:'personalinformationCtrl'
     }).state('registernext',{
        url:'/registernext?phone',
        templateUrl:'view/registernext.html',
        controller:'registernextCtrl'
     }).state('feedback',{
        url:'/feedback',
        templateUrl:'view/feedback.html',
        controller:'feedbackCtrl'
     }).state('sercetset',{
        url:'/sercetset',
        templateUrl:'view/sercetset.html',
        controller:'sercetsetCtrl'
     }).state('changepassword',{
        url:'/changepassword',
        templateUrl:'view/changepassword.html',
        controller:'changepasswordCtrl'
     }).state('sign',{
        url:'/sign',
        templateUrl:'view/sign.html',
        controller:'signCtrl'
     }).state('signgz',{
        url:'/signgz',
        templateUrl:'view/signgz.html',
        controller:'signgzCtrl'
     }).state('directory',{
        url:'/directory/:bookId',
        templateUrl:'view/directory.html',
        controller:'directoryCtrl'
     }).state('comment',{
        url:'/comment/:bookId',
        templateUrl:'view/comment.html',
        controller:'commentCtrl'
     }).state('classlist',{
        url:'/classlist',
        templateUrl:'view/classlist.html',
        controller:'classlistCtrl'
     }).state('forgotpassword',{
        url:'/forgotpassword',
        templateUrl:'view/forgotpassword.html',
        controller:'forgotpasswordCtrl'
     }).state('setnewpassword',{
        url:'/setnewpassword?phone&authCode',
        templateUrl:'view/setnewpassword.html',
        controller:'setnewpasswordCtrl'
     }).state('listsame',{
        url:'/listsame?bookClass&classCode',
        templateUrl:'view/listsame.html',
        controller:'listsameCtrl'
     }).state('columnsamelist',{
        url:'/columnsamelist?columnName&columnId',
        templateUrl:'view/columnsamelist.html',
        controller:'columnsamelistCtrl'
     }).state('bookcontent',{
        url:'/bookcontent?bookId&chapterId',
        templateUrl:'view/bookcontent.html',
        controller:'bookcontentCtrl'
     }).state('recentlyread',{
        url:'/recentlyread',
        templateUrl:'view/recentlyread.html',
        controller:'recentlyreadCtrl'
     }).state('ranklistsame',{
        url:'/ranklistsame?styleName&rankingId',
        templateUrl:'view/ranklistsame.html',
        controller:'ranklistsameCtrl'
     }).state('havabuy',{
        url:'/havabuy',
        templateUrl:'view/havabuy.html',
        controller:'havabuyCtrl'
     }).state('author',{
        url:'/author/:author',
        templateUrl:'view/author.html',
        controller:'authorCtrl'
     }).state('bindphone',{
        url:'/bindphone',
        templateUrl:'view/bindphone.html',
        controller:'bindphoneCtrl'
     }).state('bindphonepwd',{
        url:'/bindphonepwd/?phone&authCode',
        templateUrl:'view/bindphonepwd.html',
        controller:'bindphonepwdCtrl'
     }).state('paybalance',{
        url:'/paybalance?needYQ',
        templateUrl:'view/paybalance.html',
        controller:'paybalanceCtrl'
     }).state('activeauthor',{
        url:'/activeauthor',
        templateUrl:'view/activeauthor.html',
        controller:'activeauthorCtrl'
     }).state('activecome',{
        url:'/activecome',
        templateUrl:'view/activecome.html',
        controller:'activecomeCtrl'
     }).state('activebook',{
        url:'/activebook',
        templateUrl:'view/activebook.html',
        controller:'activebookCtrl'
     });

    //$locationProvider.html5Mode(true);   
    $urlRouterProvider.otherwise('main');//默认跳转路由

}])


'use strict';
angular.module('app').config(['$validationProvider',function($validationProvider){
	var pawsame;
	//Provider的作用都是一样的，都是对模块或者服务进行配置；
	var expression={
		phone:/^1[\d]{10}$/,
		pwd:function(value){
			var str=value+'';
			return str.length>5&&str.length<21;
		},
		required:function(value){
			return !!value;
		},
		comment:function(value){
			var com=value+'';
			return com.length<200;
		},
		newPwd:function(value){
			var str=value+'';
			pawsame=value;
			return str.length>5;
		},
		confirmPwd:function(value){
			var conPwd=value+'';
			return pawsame===conPwd;
		}

	};
	var defaultMsg={
		phone:{
			success:"",
			error:'必须是11位手机号'
		},
		pwd:{
			success:'',
			error:'长度至少6位'
		},
		required:{
			success:'',
			error:'不能为空'
		},
		comment:{
			success:'',
			error:'文字不能超过200字'
		},
		newPwd:{
			success:'',
			error:'长度至少6位'
		},
		confirmPwd:{
			success:'',
			error:'确认密码与新密码不一致'
		}
	}
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
	//这里在进行配置，先配置校验规则在配置提示语；
}])
'use strict';
angular.module('app').directive('appFoot',['$rootScope','cache','$state',function($rootScope,cache,$state){
	return{
		restrict:'A',
		replace:true,
		scope:{
			myLogin:"&",
			//bookstoreLogin:"&"
		},
		templateUrl:'view/template/foot.html',
		controller:function($scope,$state){
			$scope.state=$state;
		},
		link:function($scope){
			$rootScope.userId=cache.get('userId');
			console.log($rootScope.userId);
			$scope.myLogin=function(){
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i)=="micromessenger"){
					$state.go("my");
				}else{
					
					if($rootScope.userId!=undefined){
						$state.go("my");
					}else{
						$state.go("login");
					}
				}
				
			}
			$scope.bookstoreLogin=function(){
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i)=="micromessenger"){
					$state.go("bookstore");
				}else{
					$state.go("bookstore");
					/*if($rootScope.userId!=undefined){
						$state.go("bookstore");
					}else{
						$state.go("login");
					}*/
				}
			}
		}
	}
}])
'use strict'
angular.module('app').directive('appHead',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/head.html'
	};
}]);
'use strict'
angular.module('app').directive('appHeadbar',[function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			text:"@",
		},
		templateUrl:'view/template/headbar.html',
		link:function($scope){
			$scope.back=function(){
				window.history.back();
			}
		}
	};
}]);
'use strict'
angular.module('app').directive('appNav',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/nav.html',
        controller:['cache','$scope','$state',function(cache,$scope,$state){
        	$scope.ispay=function(){
				if(cache.get("userId")){
					$state.go("pay");
				}else{
                    var ua = navigator.userAgent.toLowerCase();
                    $state.go("pay");
                   // $state.go("login");
                    /*if(ua.match(/MicroMessenger/i)=="micromessenger"){
                        $state.go("pay");
                    }else{
                        $state.go("pay");
                        //$state.go("login");
                    }*/
				}
			}
        }]
    };
}]);
'use strict';
angular.module('app').directive('appTop',[function(){
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/tip.html',
        controller:['$rootScope','$scope',function($rootScope,$scope){
        	$rootScope.isTipContent=false;
        	/*$timeout(function(){
				$rootScope.isTipContent=!$rootScope.isTipContent;
			},1000)*/
        }]
    }
}]);
'use strict'
angular.module('app').directive('appToup',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/toup.html',
        controller:['$scope',function($scope){
			$scope.closeToupshow=true;
			$scope.closeToup=function(){
        		$scope.closeToupshow=!$scope.closeToupshow;
        	}
        }]
    };
}]);
'use strict';
angular.module('app').filter('trust2Html',['$sce',function($sce){
	return function(val) {  
        return $sce.trustAsHtml(val);
    }; 
}])
'use strict'
	angular.module('app').controller('activeauthorCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$state','cache','$http','$scope','$rootScope',function(userTracking,weixinsharehttp,weixinshare,$location,$state,cache,$http,$scope,$rootScope){
		var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
	    var ua = navigator.userAgent.toLowerCase();
	   $rootScope.bookstoreBack="";
       $rootScope.title="元气小说";
		
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

		//微信分享
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'作家活动页',
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
}])
'use strict'
	angular.module('app').controller('activebookCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$state','cache','$http','$scope','$rootScope',function(userTracking,weixinsharehttp,weixinshare,$location,$state,cache,$http,$scope,$rootScope){
		//微信分享
		$rootScope.title="元气小说";
		var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'作品活动页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);
		$rootScope.bookstoreBack="";
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
'use strict'
	angular.module('app').controller('activecomeCtrl',['userTracking','weixinsharehttp','weixinshare','$timeout','$interval','$location','$state','cache','$http','$scope','$rootScope',function(userTracking,weixinsharehttp,weixinshare,$timeout,$interval,$location,$state,cache,$http,$scope,$rootScope){
		$rootScope.title="元气小说";
		function TopImgMove(){

		$timeout(function(){
	        $('#img1').show().addClass('animated bounceInDown');
	        $timeout(function(){
	        	$('#img2').show().addClass('animated bounceInDown');
	        	$timeout(function(){
		        	$('#img3').show().addClass('animated bounceInDown');
		        	$timeout(function(){
			        	$('#img4').show().addClass('animated bounceInDown');
			        	$timeout(function(){
				        	$('#img5').show().addClass('animated rollIn');
				        	$timeout(function(){
				        		$('#img5').removeClass('rollIn').addClass("pulse infinite");
					        	$('#img6').show().addClass('animated lightSpeedIn');
					        	$timeout(function(){
					        		$('#img6').removeClass('lightSpeedIn').addClass("pulse infinite");
						        },500);
					        },1000);
					        $(".tuozi").show().addClass("animated bounceInLeft");
					        $(".showText").show();
				        },300);
			        },300);
		        },300);
	        },300);
	    }, 100);
	}

	TopImgMove();
	$(".yanjing").addClass("animated flash");
	$interval(function(){
		$(".yanjing").removeClass("animated flash");
			$timeout(function(){
				$(".yanjing").addClass("animated flash");
			},1000)
	},2500);

	//微信分享
		var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'活动页我们来了',
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
}])
'use strict'
	angular.module('app').controller('authorCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$state','cache','$http','$scope','$rootScope',function(userTracking,weixinsharehttp,weixinshare,$location,$state,cache,$http,$scope,$rootScope){
		$rootScope.aboutLogin="";
		$rootScope.bookstoreBack="";
        $rootScope.pageStyle='';
		$scope.authorName=$state.params.author;
		$scope.pageNum=1;
		var total=0;
		$scope.authorNameList=[];
		$scope.loading=true;
		$rootScope.title="元气小说";
		//$rootScope.rootScopeUrl;
		
		//微信静默注册跟登录；
        var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
        var ua = navigator.userAgent.toLowerCase();
             
        function jmRegisterPage(){
        	$scope.loading=true;
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
                    $scope.loading=false;
                }
            }
        }
        jmRegisterPage();


        $scope.gobackBtn=function(){
			if($rootScope.loginBack){
	            var url=$location.absUrl().split("!")[0];
	            window.location.href=url+'!'+$rootScope.loginBack;
			}else{
				$state.go("main");
			}
		}
		$http({
			method:'Post',
			url:$rootScope.rootScopeUrl+'/api/author/booklist',
			params:{author:$scope.authorName,pageNum:$scope.pageNum,pageSize:20}
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
					$rootScope.loadingFunction($scope);
					$scope.loading=false;
					$scope.authorNameList=response.data.data.list;
					total=response.data.data.total;
					var userTrackingJson={
		                channelId:cache.get("channelId")?cache.get("channelId"):-1,
		                extId:cache.get("extId")?cache.get("extId"):-1,
		                userId:cache.get("userId")?cache.get("userId"):-1,
		                page:'',
		                title:'作者作品页',
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
			},function errorCallback(err){
				$rootScope.loadingFunction($scope);
				$rootScope.serveErr($scope,$timeout);
		})
		$scope.isScrollIf=true;
		$scope.loadingSmall=false;
		$(window).scroll(function() {
			var scrollTop = $(this).scrollTop();
			var scrollHeight = $(document).height();
			var windowHeight = $(this).height();

			if (scrollTop + windowHeight > scrollHeight-30) {
			// 此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
				if($scope.isScrollIf){
					$scope.isScrollIf=false;
					if($scope.pageNum<Math.ceil(total/20)){
						$scope.loadingSmall=!$scope.loadingSmall;
						$scope.pagenum++;
						$http({
							method:'Post',
							params:{author:$scope.authorName,pageNum:$scope.pageNum,pageSize:20},
							url:$rootScope.rootScopeUrl+'/api/author/booklist'
						}).then(function successCallback(response){
							if(response.data.httpCode==200){
								$rootScope.loginBack=$location.url();
								$scope.loadingSmall=!$scope.loadingSmall;
								for(var i=0;i<response.data.data.list.length;i++){
									$scope.authorNameList.push(response.data.data.list[i]);
								}
								$timeout(function() {
					                $scope.isScrollIf=true;
					            }, 1000);
							}else{
								$scope.loadingSmall=!$scope.loadingSmall;
								$rootScope.httpSuccess($scope,response,$timeout);
							}	
						},function errorCallback(response){
							$scope.loadingSmall=!$scope.loadingSmall;
							$rootScope.serveErr($scope,$timeout);
						});
					}
				}
			}
		});
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
'use strict'
	angular.module('app').controller('bindphoneCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$location','$timeout','$state','$interval','$rootScope','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$location,$timeout,$state,$interval,$rootScope,$http,$scope){
		$rootScope.pageStyle='';
		$rootScope.aboutLogin='';
		$scope.loading=false;
		$rootScope.bookstoreBack="";
		$rootScope.title="元气小说";

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
                    $scope.loading=false;
                }
            }
        }
        //jmRegisterPage();
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'手机号绑定页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);

		$scope.inputBlur=function(){
			if($("#csValue").val()!=""){
				$scope.loading=true;
				$http({
					method:'Post',
					params:{phone:$scope.user.phone},
					url:$rootScope.rootScopeUrl+'/api/phone/validation'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loginBack=$location.url();
						$scope.isSendCode=true;
						$rootScope.loadingFunction($scope);
					}else{
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.loadingFunction($scope);
					$rootScope.serveErr($scope,$timeout);
				})
			}
		}
		//发送短信请求
		var count=60;
		$scope.send=function(){
			if($scope.isSendCode){
				$http({
					method:'Post',
					params:{phone:$scope.user.phone},
					url:$rootScope.rootScopeUrl+'/api/send/authcode'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						count=60;
						$scope.time='60s';
						var interval=$interval(function(){
							if(count<=0){
								$interval.cancel(interval);
								$scope.time='';
							}else{
								count--;
								$scope.time=count+'s';
							}
						},1000);
					}else{
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.serveErr($scope,$timeout);
				})
			}
		}
		$scope.submit=function(){

			$state.go("bindphonepwd",{phone:$scope.user.phone,authCode:$scope.user.authCode})
		}

		$scope.gobackBtn=function(){
			if($rootScope.loginBack){
	            var url=$location.absUrl().split("!")[0];
	            //console.log($rootScope.pageStyle,"ceshi")
	            window.location.href=url+'!'+$rootScope.loginBack;
			}else{
				$state.go("main");
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

'use strict'
	angular.module('app').controller('bindphonepwdCtrl',['userTracking','weixinsharehttp','weixinshare','$location','cache','md5','$timeout','$state','$rootScope','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,cache,md5,$timeout,$state,$rootScope,$http,$scope){
		$scope.isTipContent=false;
        $rootScope.pageStyle='';
        $rootScope.aboutLogin='';
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'手机号绑定设置密码页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);
	    
		$scope.submit=function(){
			$scope.loading=true;
			var pwdQ=$scope.user.newPwd;
			var cpwdQ=$scope.user.confirmPwd;
			var pwdZ= md5.createHash(pwdQ);
			var cpwdZ= md5.createHash(cpwdQ);
			$http({
					method:'Post',
					url:$rootScope.rootScopeUrl+'/api/binding/phone',
					params:{newPwd:pwdZ,confirmPwd:cpwdZ,authCode:$state.params.authCode,phone:$state.params.phone,userId:cache.get("userId")}
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loginBack=$location.url();
						$rootScope.loadingFunction($scope);
						$scope.tipContent=response.data.msg;
						$scope.isTipContent=!$scope.isTipContent;
						$timeout(function(){
							$scope.isTipContent=!$scope.isTipContent;
							$state.go("my");
						},1200)
					}else if(response.data.httpCode==100){
						$rootScope.loadingFunction($scope);
						/*$state.go("login");*/
					}else{
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.loadingFunction($scope);
					$rootScope.serveErr($scope,$timeout);
			})
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
'use strict'
	angular.module('app').controller('bookbaseCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$location','$rootScope','$interval','$timeout','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$location,$rootScope,$interval,$timeout,$http,$scope){
        $rootScope.pageStyle=$location.url();
        $scope.loadingSmall=false;
        $rootScope.payBackPage=$location.absUrl();
        $rootScope.aboutLogin='';
        $rootScope.bookstoreBack="";
        $rootScope.loginBack=$location.url();
        $rootScope.aboutLogin=$location.url();
        $rootScope.title="元气小说";

		$scope.classB=[{
			"id":0,
			"name":"全部"
		},{
			"id":1,
			"name":"连载中"
		},{
			"id":2,
			"name":"已完结"
		}];
		$scope.sortB=[{
			"id":1,
			"name":"按人气"
		},{
			"id":3,
			"name":"按销量"
		},{
			"id":2,
			"name":"按更新"
		}];
		$scope.loading=true;
		$scope.isBookclass=false;
		$scope.scrollTopHeight="";	
		$scope.isA=true;
		$scope.isB=true;
		$interval(function(){
			$(window).bind('scroll',function(){
				$scope.scrollTopHeight = $(window).scrollTop();
		
				if($scope.scrollTopHeight>49){
					$scope.isBookclass=true;
					$scope.warpMore=!$scope.isBookclass;
				}else{
					$scope.isBookclass=false;
					$scope.warpMore=false;
				}
			});
		},100);
		var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'书库页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);


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


		$scope.warpMore=false;
		$scope.warpMoreClick=function(){
			$scope.warpMore=!$scope.warpMore;
			$scope.isBookclass=!$scope.isBookclass;
		}
		$scope.closeWarpMoreClick=function(){
			$scope.warpMore=!$scope.warpMore;
			$scope.isBookclass=!$scope.isBookclass;
		}
  		$scope.pagenum=1;
  		$scope.bookStatus=0;
  		$scope.sortBy=1;
  		$scope.classTop="全部";
  		$scope.sortTop="按人气";
  		var total;
		$scope.pageB=function(para){
			$scope.loading=true;
			$http({
				method:'Post',
				params:para,
				url:$rootScope.rootScopeUrl+'/api/book/list'
			}).then(function successCallback(response){
				if(response.data.httpCode==200){
					if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
						var text="为了便于您的阅读，请添加本链接到书签";
           				$rootScope.collectTip($scope,$timeout,text);
					}

					$rootScope.loginBack=$location.url();
					$scope.loading=false;
					$scope.bookBase=response.data.data;
					total=response.data.data.total;
				}else{
					$rootScope.loadingFunction($scope);
					$rootScope.httpSuccess($scope,response,$timeout);
				}	
			},function errorCallback(response){
				$rootScope.loadingFunction($scope);
				$rootScope.serveErr($scope,$timeout)
			});
				
		}

		if(cache.get("userId")!=undefined&&(ua.match(/MicroMessenger/i)=="micromessenger")){
	        $scope.pageB({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
	        scroll({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
	    }else if(cache.get("userId")==undefined&&loginSuccess){
	        $scope.pageB({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
	        scroll({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
	    }


		if(ua.match(/MicroMessenger/i)!="micromessenger"){
			$scope.pageB({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
			scroll({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:10});
		}
		/*scroll({bookStatus:0,sortBy:1,pageNum:$scope.pagenum,pageSize:20});*/
		$scope.classBClick=function(item,i){
			$scope.isA=false;
			$scope.pagenum=1;
			$scope.loading=true;
			$scope.isClassB=i;
			$scope.bookStatus=item.id;
			$scope.classTop=item.name;
			var params={bookStatus:$scope.bookStatus,sortBy:$scope.sortBy,pageNum:$scope.pagenum,pageSize:10};
			$scope.pageB(params);
			scroll(params);
		}
		$scope.sortBClick=function(item,j){
			$scope.isB=false;
			$scope.pagenum=1;
			$scope.loading=true;
			$scope.issortB=j;
			$scope.sortBy=item.id;
			$scope.sortTop=item.name;
			var params={bookStatus:$scope.bookStatus,sortBy:$scope.sortBy,pageNum:$scope.pagenum,pageSize:10};
			$scope.pageB(params);
			scroll(params);
		}
		$scope.loadingSmall=false;
		function scroll(para){
			$scope.isScrollIf=true;
			$(window).scroll(function() {
				var scrollTop = $(this).scrollTop();
				var scrollHeight = $(document).height();
				var windowHeight = $(this).height();
				if (scrollTop + windowHeight > scrollHeight-30) {
				// 此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
					if($scope.isScrollIf){
						$scope.isScrollIf=false;

						if($scope.pagenum<Math.ceil(total/10)){
							$scope.loadingSmall=!$scope.loadingSmall;
							$scope.pagenum++;
							var paras={bookStatus:para.bookStatus,sortBy:para.sortBy,pageNum:$scope.pagenum,pageSize:10}
							$http({
								method:'Post',
								params:paras,
								url:$rootScope.rootScopeUrl+'/api/book/list'
							}).then(function successCallback(response){
								if(response.data.httpCode==200){
									$scope.loadingSmall=!$scope.loadingSmall;
									for(var i=0;i<response.data.data.list.length;i++){
										$scope.bookBase.list.push(response.data.data.list[i]);
									}
									$timeout(function() {
						                $scope.isScrollIf=true;
						            }, 1000);
								}else{
									$scope.loadingSmall=!$scope.loadingSmall;
									$rootScope.httpSuccess($scope,response,$timeout);
								}	
							},function errorCallback(response){
								$scope.loadingSmall=!$scope.loadingSmall;
								$rootScope.serveErr($scope,$timeout);
							});
						}
					}
				}
		});
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

'use strict'
	angular.module('app').controller('changepasswordCtrl',['userTracking','weixinsharehttp','weixinshare','$location','md5','$rootScope','$state','$timeout','cache','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,md5,$rootScope,$state,$timeout,cache,$http,$scope){
		$rootScope.aboutLogin=$location.url();
		$scope.isTipContent=false;
        $rootScope.pageStyle='';
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'修改密码',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
        userTracking.getTrackingConfig(userTrackingJson);

		var userId=cache.get("userId");
		$scope.submit=function(){
			$scope.loading=true;
			var pwdO=$scope.user.pwd
			var pwdQ=$scope.user.newPwd;
			var cpwdQ=$scope.user.confirmPwd;
			var pwdOZ=md5.createHash(pwdO)
			var pwdZ= md5.createHash(pwdQ);
			var cpwdZ= md5.createHash(cpwdQ);
			$http({
					method:'Post',
					url:$rootScope.rootScopeUrl+'/api/pwd/update',
					params:{pwd:pwdOZ,newPwd:pwdZ,confirmPwd:cpwdZ,userId:userId}
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loginBack=$location.url();
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
						$timeout(function(){
							$state.go("my");
						},1200);
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
			})
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

'use strict'
	angular.module('app').controller('classCtrl',['userTracking','weixinsharehttp','weixinshare','$location','cache','$state','$rootScope','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,cache,$state,$rootScope,$http,$scope){
		$scope.isBoyGril=true;
        $rootScope.pageStyle='';
        $scope.loading=false;
        $rootScope.bookstoreBack="";
        $rootScope.payBackPage=$location.absUrl();
        $rootScope.loginBack=$location.url();
        $rootScope.aboutLogin=$location.url();
        $rootScope.title="元气小说";
		$scope.grilbookstyle=[
			{
                "classCode":"DSYQ",
                "bookClass":"都市言情",
                "imageUrl":"image/ttu2.png"
            },{
                "classCode":"CYJK",
                "bookClass":"穿越架空",
                "imageUrl":"image/ttu1.png"
            },{
				"classCode":"GDYQ",
				"bookClass":"古代言情",
				"imageUrl":"image/ttu4.png"
			},{
				"classCode":"LMQC",
				"bookClass":"浪漫青春",
				"imageUrl":"image/ttu5.png"
			},{
				"classCode":"XYLYF",
				"bookClass":"悬疑灵异",
				"imageUrl":"image/ttu11.png"
			},{
				"classCode":"QTFLF",
				"bookClass":"其他",
				"imageUrl":"image/ttu8.png"
			}
		];
        $scope.boybookstyle=[
            {
                "classCode":"DSXS",
                "bookClass":"都市现实",
                "imageUrl":"image/ttu3.png"
            },{
                "classCode":"XHXZ",
                "bookClass":"玄幻修真",
                "imageUrl":"image/ttu9.png"
            },{
                "classCode":"LSJK",
                "bookClass":"历史架空",
                "imageUrl":"image/ttu6.png"
            },{
                "classCode":"YSCN",
                "bookClass":"异术超能",
                "imageUrl":"image/ttu12.png"
            },{
                "classCode":"XYLYM",
                "bookClass":"悬疑灵异",
                "imageUrl":"image/ttu10.png"
            },{
                "classCode":"QTFLM",
                "bookClass":"其他",
                "imageUrl":"image/ttu7.png"
            }
        ];
        $("#apptouch").on("touchend",function(){
        	$state.go("main");
		})
		$scope.grilStyle=function () {
			$scope.isBoyGril=true;
        }
        $scope.boyStyle=function () {
            $scope.isBoyGril=false;
        }
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'分类页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);

        //微信静默注册跟登录；
        var jmRegisterUrl,flage,postUrl,newUrl,endRout;
        var ua = navigator.userAgent.toLowerCase();
             
        function jmRegisterPage(){
            var extIdW=cache.get("extId")!=undefined?cache.get("extId"):'';
            var channelIdW=cache.get("channelId")!=undefined?cache.get("channelId"):'';
            var jmCode;
            var search1=cache.get("userId")==undefined&&(!jmCode)?undefined:jmCode;
            var postUrl;

            if(cache.get("userId")==undefined&&(ua.match(/MicroMessenger/i)=="micromessenger")){
                $scope.loading=true;
                flage=$location.absUrl().split("userData=")[1];
                endRout=$location.absUrl().split("userData=")[0];
                if(flage==undefined){
                    jmRegisterUrl=encodeURIComponent($location.absUrl());
                    postUrl=$rootScope.rootScopeUrl+'/wechat/auto/redirect?extId='+extIdW+'&channelId='+channelIdW+'&url='+jmRegisterUrl;
                    $http({
                        method:'Get',
                        url:postUrl
                    }).then(function successCallback(response){
                        if(response.data.httpCode==200){
                             $scope.loading=false;
                            var urlTemp=response.data.data.url;
                            window.location.href=urlTemp;
                        }else{
                           
                            $rootScope.httpSuccess($scope,response,$timeout);
                        }   
                    },function errorCallback(response){
                 
                        $rootScope.serveErr($scope,$timeout);
                    });
                }else{
                    flage=JSON.parse(decodeURIComponent(flage));
                    $rootScope.loadingFunction($scope);
                    cache.put("userId",flage.userId,1);
                    cache.put("userName",flage.userName,1);
                    cache.put("token",flage.token,1);
                    cache.put("imgUrl",flage.imgUrl,1);
                    if(flage.imgUrl!=""){
                        cache.put("imgUrl",flage.imgUrl,1);
                    }
                    cache.put("binding",flage.binding,1);
                    var abc=decodeURIComponent($location.url().split("?userData")[0]);
                    $location.url(abc);
                    $scope.loading=false;
                }
            }
        }
        jmRegisterPage();

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

'use strict'
	angular.module('app').controller('classlistCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$location','$rootScope','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$location,$rootScope,$http,$scope){
        $rootScope.pageStyle='';
$rootScope.bookstoreBack="";
$rootScope.title="元气小说";
        //微信静默注册
        var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
        var ua = navigator.userAgent.toLowerCase();
       var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'分页列表页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);
        
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
'use strict'
	angular.module('app').controller('columnsamelistCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$location','$timeout','$rootScope','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$location,$timeout,$rootScope,$state,$http,$scope){
	//$state.params.id
    $rootScope.pageStyle=$location.url();
    $rootScope.aboutLogin='';
	$scope.textcolumnname=$state.params.columnName;
	$scope.loading=true;
    $rootScope.bookstoreBack="";
    $rootScope.title="元气小说";


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
		url:$rootScope.rootScopeUrl+'/api/column/more',
		params:{columnId:$state.params.columnId}
	}).then(function successCallback(response){
		if(response.data.httpCode==200){
				$scope.columnsameList=response.data.data;
				$rootScope.loadingFunction($scope);
			}else{
				$rootScope.loadingFunction($scope);
				$rootScope.httpSuccess($scope,response,$timeout);
			}
		},function errorCallback(err){
			$rootScope.loadingFunction($scope);
			$rootScope.serveErr($scope,$timeout);
	})

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
'use strict'
angular.module('app').controller('commentCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$rootScope','cache','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,$timeout,$rootScope,cache,$state,$http,$scope){
	$scope.text=0;
	$rootScope.aboutLogin=$location.url();
	$rootScope.bookstoreBack="";
    $rootScope.title="元气小说";

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

      var userTrackingJson={
            channelId:cache.get("channelId")?cache.get("channelId"):-1,
            extId:cache.get("extId")?cache.get("extId"):-1,
            userId:cache.get("userId")?cache.get("userId"):-1,
            page:'',
            title:'评论页',
            columnName:'',
            columnIndex:-1,
            bookId:-1,
            activityId:-1,
            chapterId:-1,
            url:$location.absUrl()
        }
        userTracking.getTrackingConfig(userTrackingJson);  
 	$scope.wordNub=function(){
 		$scope.text =$scope.commentContent.length;
 	}
	 var userId;
	 if(cache.get("userId")&&cache.get("userId")!=undefined){
	 	userId=cache.get("userId");
	 }
	$scope.gobackBtn=function(){
		if($rootScope.loginBack){
            var url=$location.absUrl().split("!")[0];
            window.location.href=url+'!'+$rootScope.loginBack;
		}else{
			$state.go("main");
		}
	}
	$scope.submit=function(){
		$http({
				method:'Post',
				url:$rootScope.rootScopeUrl+'/api/comment/add',
				params:{content:$scope.commentContent,bookId:$state.params.bookId,userId:userId}
			}).then(function successCallback(response){
				if(response.data.httpCode==200){
					$rootScope.loginBack=$location.url();
					$state.go("bookdetail",{bookId:$state.params.bookId,userId:userId})
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
			},function errorCallback(err){
				$rootScope.loadingFunction($scope);
				$rootScope.serveErr($scope,$timeout);
		})
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


'use strict'
	angular.module('app').controller('directoryCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$rootScope','cache','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,$timeout,$rootScope,cache,$state,$http,$scope){
      	var search = $location.search();
    	$rootScope.payBackPage=$location.absUrl().split("!")[1];
    	//$rootScope.aboutLogin=''
    	$rootScope.aboutLogin=$location.url();
    	$rootScope.title="元气小说";
		$scope.pagenum=1;
		$rootScope.bookstoreBack="";
		var total;
		$scope.volumeList=[];
		$scope.bookIdG=$state.params.bookId;
		$scope.loading=true;
		var userId;
		if(cache.get("userId")){
			userId=cache.get("userId");
		}else{
			userId=-1;
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
            $scope.loading=true;
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
                        	$scope.loading=false;
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
                    $scope.loading=false;
                }
            }
        }
        jmRegisterPage();
		var chapterList;
		$http({
			method:'Post',
			params:{bookId:$state.params.bookId,pageNum:$scope.pagenum,pageSize:25,userId:userId},
			url:$rootScope.rootScopeUrl+'/api/book/contents'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				$rootScope.loginBack=$location.url();
				 chapterList=response.data.data.list;
				total=response.data.data.total;
				for(var i=0;i<chapterList.length;i++){
					var lastVolume=$scope.volumeList.length>0?$scope.volumeList[$scope.volumeList.length-1]:'';
					var chapter=chapterList[i];
					if(lastVolume==''){
						var volume=Object();
						volume.volumeName=chapter.volumeName;
						volume.chapterList=[];
						volume.chapterList.push(chapter);
						$scope.volumeList.push(volume);
					}else if(lastVolume!=''){
						if(lastVolume.volumeName==chapter.volumeName){
							lastVolume.chapterList.push(chapter);
							$scope.volumeList[$scope.volumeList.length-1]=lastVolume;
						}else{
							var volume=Object();
							volume.volumeName=chapter.volumeName;
							volume.chapterList=[];
							volume.chapterList.push(chapter);
							$scope.volumeList.push(volume);
						}
					}
				}
				$scope.loading=false;
				ScrollF();
				var userTrackingJson={
					channelId:cache.get("channelId")?cache.get("channelId"):-1,
				    extId:cache.get("extId")?cache.get("extId"):-1,
				    userId:cache.get("userId")?cache.get("userId"):-1,
				    page:"menu",
				    title:'目录页',
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
		},function errorCallback(err){
			$rootScope.loadingFunction($scope);
			$rootScope.serveErr($scope,$timeout);
		});
		
		function ScrollF(){
			$scope.isScrollIf=true;
			$scope.loadingSmall=false;
			$(window).scroll(function() {
				var scrollTop = $(this).scrollTop();
				var scrollHeight = $(document).height();
				var windowHeight = $(this).height();
				if (scrollTop + windowHeight > scrollHeight-30) {	
					if($scope.isScrollIf){
				// 此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
						$scope.isScrollIf=false;
						if($scope.pagenum<Math.ceil(total/25)){
							$scope.pagenum++;
							$scope.loadingSmall=!$scope.loadingSmall;
								$http({
									method:'Post',
									params:{bookId:$state.params.bookId,pageNum:$scope.pagenum,pageSize:25},
									url:$rootScope.rootScopeUrl+'/api/book/contents'
								}).then(function successCallback(response){
									if(response.data.httpCode==200){
										$scope.loadingSmall=!$scope.loadingSmall;
										chapterList=response.data.data.list;
										//var lastVolume=$scope.volumeList.length>0?$scope.volumeList[$scope.volumeList.length-1]:'';
										var lastVolume=$scope.volumeList[$scope.volumeList.length-1];
										for(var i=0;i<chapterList.length;i++){
											var chapter=chapterList[i];
											 
											if(lastVolume.volumeName==chapter.volumeName){
												lastVolume.chapterList.push(chapter);
												$scope.volumeList[$scope.volumeList.length-1]=lastVolume;
											}else{
												var volume=Object();
												volume.volumeName=chapter.volumeName;
												volume.chapterList=[];
												volume.chapterList.push(chapter);
												$scope.volumeList.push(volume);
											}
										}
										$timeout(function() {
							                $scope.isScrollIf=true;
							            }, 1000);
									}else{
										$scope.loadingSmall=!$scope.loadingSmall;
										$rootScope.httpSuccess($scope,response,$timeout);
									}
								},function errorCallback(response){
									$scope.loadingSmall=!$scope.loadingSmall;
									$rootScope.serveErr($scope,$timeout);
								});
							}
					}
				}
			});
		}
		
		$scope.content=function(dirc){
			if(userId==-1){
				if((dirc.readPermission=="all")){
					$state.go("bookcontent",{bookId:$state.params.bookId,chapterId:dirc.chapterId});
				}else{
					$state.go("login");
				}
			}else if(userId&&userId!=-1){
				$state.go("bookcontent",{bookId:$state.params.bookId,chapterId:dirc.chapterId});
			}
			
		}
		$scope.dirDetail=function(){
			$state.go("bookdetail",{bookId:$state.params.bookId});
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

'use strict'
	angular.module('app').controller('feedbackCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$rootScope','$state','cache','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,$timeout,$rootScope,$state,cache,$http,$scope){
        $scope.sendSuccess=false;
        $rootScope.pageStyle='';
        //var userId=cache.get("userId");
        $rootScope.aboutLogin=$location.url();
        $scope.loading=false;
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";

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
                $scope.loading=true;
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
                            $scope.loading=false;
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
                    $scope.loading=false;
                }
            }
        }
        jmRegisterPage();
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'问题反馈页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);

        $scope.submit=function(){
            $scope.loading=true;
            $http({
                method:'Post',
                params:{userId:cache.get("userId"),title:$scope.title,content:$scope.content},
                url:$rootScope.rootScopeUrl+'/api/feeback'
            }).then(function successCallback(response){
                if(response.data.httpCode==200){
                    $rootScope.loginBack=$location.url();
                    $scope.loading=false;
                    $scope.sendSuccess=!$scope.sendSuccess;
                    $timeout(function(){
                         $scope.sendSuccess=!$scope.sendSuccess;
                         $state.go("my");
                     },2000);
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
                    $rootScope.loadingFunction($scope);
                    $rootScope.httpSuccess($scope,response,$timeout);
                }
            },function errorCallback(response){
                $rootScope.loadingFunction($scope);
                rootScope.serveErr($scope,$timeout);
            });
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

'use strict'
	angular.module('app').controller('forgotpasswordCtrl',['userTracking','weixinsharehttp','weixinshare','$timeout','$location','$state','$interval','$rootScope','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$timeout,$location,$state,$interval,$rootScope,$http,$scope){
		var count=60;
        $rootScope.pageStyle='';
        $scope.isTipContent=false;
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
	    $scope.forgetValite=function(){
	    	if($("#forgetId").val()!=""){
				$scope.loading=true;
				$http({
					method:'Post',
					params:{phone:$scope.user.phone},
					url:$rootScope.rootScopeUrl+'/api/phone/validation'
				}).then(function successCallback(response){
					if(response.data.httpCode==400){
						$rootScope.loginBack=$location.url();
						$scope.isSendCode=true;
						$rootScope.loadingFunction($scope);
					}else if(response.data.httpCode==200){
						$rootScope.loadingFunction($scope);
						$scope.isTipContent=true;
						$scope.tipContent="手机号还未注册";
						$timeout(function(){
								$scope.isTipContent=!$scope.isTipContent;
						},1000);
					}else{
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.loadingFunction($scope);
					$rootScope.serveErr($scope,$timeout);
				})
			}
	    }
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'忘记密码页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);
		$scope.send=function(){
			if($scope.isSendCode){
				$http({
					method:'Post',
					params:{phone:$scope.user.phone},
					url:$rootScope.rootScopeUrl+'/api/send/authcode'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loginBack=$location.url();
						count=60;
						$scope.time='60s';
						var interval=$interval(function(){
							if(count<=0){
								$interval.cancel(interval);
								$scope.time='';
							}else{
								count--;
								$scope.time=count+'s';
							}
						},1000);
					}else{
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.serveErr($scope,$timeout);
				})
			}
		}
		$scope.submit=function(){
			$state.go("setnewpassword",{phone:$scope.user.phone,authCode:$scope.user.authCode})
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

'use strict'
	angular.module('app').controller('havabuyCtrl',['userTracking','weixinsharehttp','weixinshare','$location','cache','$rootScope','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,cache,$rootScope,$state,$http,$scope){
		$scope.isbookstore=false;
		$scope.loading=true;
		$scope.buyreadList=[];
        $rootScope.pageStyle='';
		$rootScope.aboutLogin=$location.url();
		$rootScope.bookstoreBack=$location.absUrl();
        $rootScope.title="元气小说";
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
            	//$scope.loading=true;
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
                            //$scope.loading=false;
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
                    //$scope.loading=false;
                }
            }
        }
        jmRegisterPage();

		$http({
			method:'Post',
			params:{userId:cache.get("userId")},
			url:$rootScope.rootScopeUrl+'/api/my/purchased'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				$rootScope.loginBack=$location.url();
				$scope.loading=false;
				$scope.buyList=response.data.data;
				if($scope.buyList.length>0){
					$scope.isbookstore=false;	
				}else{
					$scope.isbookstore=!$scope.isbookstore;
				}
                var userTrackingJson={
                    channelId:cache.get("channelId")?cache.get("channelId"):-1,
                    extId:cache.get("extId")?cache.get("extId"):-1,
                    userId:cache.get("userId")?cache.get("userId"):-1,
                    page:'',
                    title:'已经购买',
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
			}
		},function errorCallback(response){
			$scope.loading=false;
			$rootScope.serveErr($scope,$timeout);
		});

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

		$scope.detailBack=function () {
			if($rootScope.pageStyle){
                var url=$location.absUrl().split("!")[0];
                window.location.href=url+'!'+$rootScope.pageStyle;
			}else{
				$state.go("main");
			}
        }
}])
'use strict'
	angular.module('app').controller('listsameCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$timeout','$location','$rootScope','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$timeout,$location,$rootScope,$state,$http,$scope){
	//$state.params.id
	$scope.loading=true;
	$scope.textstylename=$state.params.bookClass;
	$rootScope.pageStyle=$location.url();
   /* var total=0;*/
    $scope.pagenum=1;
    $rootScope.bookstoreBack="";
    $rootScope.title="元气小说";

    //微信静默注册
		var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
	    var ua = navigator.userAgent.toLowerCase();
	         //微信登录
	     function jmRegisterPage(){
	     	$scope.loading=true;
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
                    $scope.loading=false;
                }
            }
        }
        jmRegisterPage();
        
	$http({
		method:'Post',
		url:$rootScope.rootScopeUrl+'/api/class/list',
		cache:false,
		params:{classCode:$state.params.classCode,pageNum:$scope.pagenum,pageSize:10}
	}).then(function successCallback(response){
		if(response.data.httpCode==200){
				 $scope.loading=false;
				$scope.listsameList=response.data.data.list;
				$scope.total=response.data.data.total;
				Scroll();
				var userTrackingJson={
	                channelId:cache.get("channelId")?cache.get("channelId"):-1,
	                extId:cache.get("extId")?cache.get("extId"):-1,
	                userId:cache.get("userId")?cache.get("userId"):-1,
	                page:'',
	                title:'分类列表页',
	                columnName:'',
	                columnIndex:-1,
	                bookId:-1,
	                activityId:-1,
	                chapterId:-1,
	                url:$location.absUrl()
	            }
	            userTracking.getTrackingConfig(userTrackingJson);
			}else{
				 $scope.loading=false;
				$rootScope.httpSuccess($scope,response,$timeout)
			}
			async:false  
		},function errorCallback(err){
			 $scope.loading=false;
			$rootScope.serveErr($scope,$timeout);
	})

	function Scroll(){
		$scope.isScrollIf=true;
		$scope.loadingSmall=false;
		$(window).bind("scroll",function() {
			var scrollTop = $(this).scrollTop();
			var scrollHeight = $(document).height();
			var windowHeight = $(this).height();
			if (scrollTop + windowHeight > scrollHeight-30) {
				if($scope.isScrollIf){
					$scope.isScrollIf=false;
					if($scope.total>10){
						if($scope.pagenum<Math.ceil($scope.total/10)){
							$scope.loadingSmall=true;
							$scope.pagenum++;
							$http({
								method:'Post',
								cache:false,
								params:{classCode:$state.params.classCode,pageNum:$scope.pagenum,pageSize:10},
								url:$rootScope.rootScopeUrl+'/api/class/list'
							}).then(function successCallback(response){
								if(response.data.httpCode==200){
									$scope.loadingSmall=false;
									//$scope.bookBase=response.data.data;
									for(var i=0;i<response.data.data.list.length;i++){
										$scope.listsameList.push(response.data.data.list[i]);
									}
									$timeout(function() {
						                $scope.isScrollIf=true;
						            }, 1000);
								}else if(response.data){
									$rootScope.loadingFunction($scope);
									$rootScope.httpSuccess($scope,response,$timeout);
								}
								async:false  	
							},function errorCallback(response){
								$rootScope.loadingFunction($scope);
								$rootScope.serveErr($scope,$timeout);
							});
						}
					}
				}
			}
		});
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
'use strict'
	angular.module('app').controller('loginCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$timeout','md5','$state','cache','$http','$scope','$rootScope',function(userTracking,weixinsharehttp,weixinshare,$location,$timeout,md5,$state,cache,$http,$scope,$rootScope){
        $scope.change = false;
        $rootScope.pageStyle='';
        $rootScope.bookstoreBack="";
        var urlR=$location.absUrl().split("!")[0];
        var bookId, chapterId;
        $rootScope.title="元气小说";
        if ($state.params.bookId && $state.params.bookId != -1) {
            bookId = $state.params.bookId;
        }
        if ($state.params.chapterId && $state.params.chapterId != -1) {
            chapterId = $state.params.chapterId;
        }
        $scope.backlogin = function () {
            if ($rootScope.loginBack!='') {
                window.location.href=urlR+'!'+$rootScope.loginBack;
            }else{
                window.history.back();
            }
        }
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'登录页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);

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
        
        $scope.submit=function() {
            var pwdZQ = $scope.user.pwd;
            var pwdZ = md5.createHash(pwdZQ);
            $scope.loading = true;
            $http({
                method: 'Post',
                url: $rootScope.rootScopeUrl + '/api/login',
                params: {phone: $scope.user.phone, pwd: pwdZ}
            }).then(function successCallback(response) {
                if (response.data.httpCode == 200) {
                    $rootScope.loadingFunction($scope);
                    cache.put('userId', response.data.data.userId, 1);
                    cache.put('userName', response.data.data.userName, 1);
                    cache.put('imgUrl', response.data.data.imgUrl, 1);
                    cache.put('token', response.data.data.token, 1);
                     window.location.href=urlR+'!'+$rootScope.aboutLogin;
                } else {
                    $rootScope.loadingFunction($scope);
                    $rootScope.httpSuccess($scope, response, $timeout);
                }
            }, function errorCallback(err) {
                $rootScope.loadingFunction($scope);
                $rootScope.serveErr($scope, $timeout);
            })
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

'use strict'
	angular.module('app').controller('myCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$rootScope','cache','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,$timeout,$rootScope,cache,$state,$http,$scope){
		var search = $location.search();
		$rootScope.payBackPage=$location.absUrl();
		$rootScope.isSharePay=$location.url();
		$rootScope.loginBack=$location.url();
        $rootScope.pageStyle='';
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
		$rootScope.aboutLogin=$location.url();
		if(search.channelId){
			cache.put("channelId",search.channelId);
		}
		if(search.extId){
			cache.put("extId",search.extId);
		}
		if(cache.get('userId')){
			$scope.userName=cache.get('userName');
			$scope.imgUrl=cache.get('imgUrl');
		}
		$scope.isloginout=false;
		$scope.loginoutShow=function(){
			$scope.isloginout=!$scope.isloginout;
		}
		$scope.loginout=function(){
			cache.remove('userId');
			cache.remove('userName');
			cache.remove('imgUrl');
			cache.remove('gender');
			cache.remove('sign');
			cache.remove('token');
			$state.go('main');
		}
		$scope.loginoutN=function(){
			$scope.isloginout=!$scope.isloginout;
		}
		$scope.isTipContent=false;
		$scope.unopenTip=function(){
			var text="该功能未开放";
			$rootScope.serveTip($scope,$timeout,text);
		}
		var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'我的页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);

		//微信静默注册跟登录；
		var jmRegisterUrl,flage,postUrl,newUrl,endRout;
	    var ua = navigator.userAgent.toLowerCase();
	         
	    function jmRegisterPage(){
	        var extIdW=cache.get("extId")!=undefined?cache.get("extId"):'';
	        var channelIdW=cache.get("channelId")!=undefined?cache.get("channelId"):'';
	        var jmCode;
	        var search1=cache.get("userId")==undefined&&(!jmCode)?undefined:jmCode;
	        var postUrl;
	        if(cache.get("userId")==undefined&&(ua.match(/MicroMessenger/i)=="micromessenger")){
	            flage=$location.absUrl().split("userData=")[1];
	            endRout=$location.absUrl().split("userData=")[0];
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
	                flage=JSON.parse(decodeURIComponent(flage));
	                $rootScope.loadingFunction($scope);
	                cache.put("userId",flage.userId,1);
	                cache.put("userName",flage.userName,1);
	                cache.put("token",flage.token,1);
	               	if(flage.imgUrl!=""){
                    	cache.put("imgUrl",flage.imgUrl,1);
                    }
	               	cache.put("binding",flage.binding,1);
	                var abc=decodeURIComponent($location.url().split("?userData")[0]);
	                $location.url(abc);
	            }
	        }
	    }
	    jmRegisterPage();

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

'use strict'
angular.module('app').controller('paydetailCtrl',['userTracking','weixinsharehttp','weixinshare','$location','$timeout','$state','$rootScope','cache','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,$timeout,$state,$rootScope,cache,$http,$scope){
	var userId;
    $rootScope.pageStyle='';
    $rootScope.aboutLogin=$location.url();
	$scope.loading=true;
	$rootScope.bookstoreBack="";
	$rootScope.title="元气小说";

	//微信静默注册跟登录；
		var jmRegisterUrl,flage,postUrl,newUrl,endRout;
	    var ua = navigator.userAgent.toLowerCase();
	         
	    function jmRegisterPage(){
	        var extIdW=cache.get("extId")!=undefined?cache.get("extId"):'';
	        var channelIdW=cache.get("channelId")!=undefined?cache.get("channelId"):'';
	        var jmCode;
	        var search1=cache.get("userId")==undefined&&(!jmCode)?undefined:jmCode;
	        var postUrl;
	        if(cache.get("userId")==undefined&&(ua.match(/MicroMessenger/i)=="micromessenger")){
	            flage=$location.absUrl().split("userData=")[1];
	            endRout=$location.absUrl().split("userData=")[0];
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
	                flage=JSON.parse(decodeURIComponent(flage));
	                $rootScope.loadingFunction($scope);
	                cache.put("userId",flage.userId,1);
	                cache.put("userName",flage.userName,1);
	                cache.put("token",flage.token,1);
	               	if(flage.imgUrl!=""){
                    	cache.put("imgUrl",flage.imgUrl,1);
                    }
	               	cache.put("binding",flage.binding,1);
	                var abc=decodeURIComponent($location.url().split("?userData")[0]);
	                $location.url(abc);
	            }
	        }
	    }
	    jmRegisterPage();

	 	$scope.ispayDetail=false;
		$http({
			method:'Post',
			url:$rootScope.rootScopeUrl+'/api/recharge/logs',
			params:{userId:cache.get("userId")?cache.get("userId"):-1}
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				$scope.loading=false;
				$rootScope.loginBack=$location.url();
				$scope.payDetailList=response.data.data;
				if($scope.payDetailList.length==0){
					$scope.ispayDetail=!$scope.ispayDetail;
				}
				var userTrackingJson={
	                channelId:cache.get("channelId")?cache.get("channelId"):-1,
	                extId:cache.get("extId")?cache.get("extId"):-1,
	                userId:cache.get("userId")?cache.get("userId"):-1,
	                page:'',
	                title:'消费详情页',
	                columnName:'',
	                columnIndex:-1,
	                bookId:-1,
	                activityId:-1,
	                chapterId:-1,
	                url:$location.absUrl()
	            }
	            userTracking.getTrackingConfig(userTrackingJson);
				//console.log($scope.payDetailList,"记录")
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
				$scope.loading=false;
				$rootScope.httpSuccess($scope,response,$timeout);
			}
		},function errorCallback(err){
			$scope.loading=false;
			$rootScope.serveErr($scope,$timeout);	
		})
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


'use strict'
	angular.module('app').controller('problemsCtrl',['userTracking','cache','$location','weixinsharehttp','weixinshare','$rootScope','$http','$scope',function(userTracking,cache,$location,weixinsharehttp,weixinshare,$rootScope,$http,$scope){
        $rootScope.pageStyle='';
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
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
        
		$scope.clickBtn=function(row){
			$("#problemdetailbox").show();
			$("#problemdetail .faq-detail").eq(row).show().siblings().hide();
			$('#problembox').hide();
		}
		$scope.backproblem=function(){
			$("#problemdetailbox").hide();
			$("#problembox").show();
		}
        var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'问题列',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);

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

'use strict'
	angular.module('app').controller('rankCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$timeout','$location','$rootScope','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$timeout,$location,$rootScope,$http,$scope){
        $rootScope.pageStyle=$location.url();
        $rootScope.payBackPage=$location.absUrl();
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
        $rootScope.loginBack=$location.url();//如果点击需要登录的页面换回之后应该跳转的地址；
		$scope.loading=true;
        $rootScope.aboutLogin=$location.url();
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
            	$scope.loading=true;
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
			method:'POST',
			//url:'data/rank.json'
			url:$rootScope.rootScopeUrl+'/api/ranking'
		}).then(function successCallback(response){
			//console.log(response.data,"aa");
			if(response.data.httpCode==200){
				$scope.rankClass=response.data.data;
                if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
                        var text="为了便于您的阅读，请添加本链接到书签";
                        $rootScope.collectTip($scope,$timeout,text);
                    }
				$scope.loading=false;
                var userTrackingJson={
                    channelId:cache.get("channelId")?cache.get("channelId"):-1,
                    extId:cache.get("extId")?cache.get("extId"):-1,
                    userId:cache.get("userId")?cache.get("userId"):-1,
                    page:"rank",
                    title:'排行榜页',
                    columnName:'',
                    columnIndex:-1,
                    bookId:-1,
                    activityId:-1,
                    chapterId:-1,
                    url:$location.absUrl()
                }
                userTracking.getTrackingConfig(userTrackingJson);
			}else{
				$scope.loading=false;
				$rootScope.httpSuccess($scope,response,$timeout);
			}
		},function errorCallback(response){
			$scope.loading=false;
			$rootScope.serveErr($scope,$timeout);
		});

        $scope.rankFunction=function(item,name,i){
            var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:"column",
                title:item.bookName,
                columnName:name,
                columnIndex:(i+1),
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl().split("#")[0]+'#!/bookdetail?bookId='+item.bookId
            }
            userTracking.getTrackingConfig(userTrackingJson);
        }
        $scope.rankMore=function(item){
            var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:"column",
                title:'排行列表页',
                columnName:item.rankingName,
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl().split("#")[0]+'#!/bookdetail?styleName='+item.rankingName+"&rankingId="+item.rankingId
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
'use strict'
	angular.module('app').controller('ranklistsameCtrl',['weixinsharehttp','weixinshare','cache','$location','$timeout','$rootScope','$state','$http','$scope',function(weixinsharehttp,weixinshare,cache,$location,$timeout,$rootScope,$state,$http,$scope){
	$rootScope.bookstoreBack="";
	$rootScope.pageStyle=$location.url();
	$scope.textrank=$state.params.styleName;
	$scope.loading=true;
	$rootScope.title="元气小说";
	var total;

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
		params:{rankingId:$state.params.rankingId},
		url:$rootScope.rootScopeUrl+'/api/ranking/list'
	}).then(function successCallback(response){
		//console.log(response.data,"12")
		if(response.data.httpCode==200){
			$scope.rankList=response.data.data;
			$rootScope.loadingFunction($scope);
			//console.log($scope.rankList);
			total=response.data.data.total;
		}else{
			$rootScope.loadingFunction($scope);
			$rootScope.httpSuccess($scope,response,$timeout);
		}
	},function errorCallback(response){
		$rootScope.loadingFunction($scope);
		$rootScope.serveErr($scope,$timeout);
	});
	
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
'use strict'
	angular.module('app').controller('recentlyreadCtrl',['userTracking','weixinsharehttp','weixinshare','$q','$location','$timeout','$rootScope','cache','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,$q,$location,$timeout,$rootScope,cache,$state,$http,$scope){
	var userId=cache.get('userId');
	$rootScope.pageStyle=$location.url();
    $rootScope.bookstoreBack="";
	$rootScope.aboutLogin=$location.url();
	$scope.isbookstore=false;
    $rootScope.title="元气小说";
	$scope.loading=true;

	var search = $location.search();
    var urlR=$location.absUrl().split("!")[0];
    if(search.channelId){
        cache.put("channelId",search.channelId);
    }
    if(search.extId){
        cache.put("extId",search.extId);
    }
    /*var bookIdR,chapterIdR;
    if($state.params.bookId&&$state.params.bookId!=-1){
        bookIdR=$state.params.bookId;
    }else if(search.bookId){
        bookIdR=search.bookId;
    }else{
        bookIdR=-1;
    }
    if($state.params.chapterId&&$state.params.chapterId!=-1){
        chapterIdR=$state.params.chapterId;
    }else if(search.chapterId){
        chapterIdR=search.chapterId;
    }else{
    	chapterIdR=-1;
    }*/
    var userTrackingJson={
            channelId:cache.get("channelId")?cache.get("channelId"):-1,
            extId:cache.get("extId")?cache.get("extId"):-1,
            userId:cache.get("userId")?cache.get("userId"):-1,
            page:'',
            title:'最近阅读页',
            columnName:'',
            columnIndex:-1,
            bookId:-1,
            activityId:-1,
            chapterId:-1,
            url:$location.absUrl()
        }
        userTracking.getTrackingConfig(userTrackingJson);

    var jmRegisterUrl,flage,postUrl,newUrl,endRout,loginSuccess=false;
    var ua = navigator.userAgent.toLowerCase();
         //微信登录
     function jmRegisterPage(){
     	var def=$q.defer();
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
                def.resolve(flage.userId)
            }
        }
        return def.promise;
    }
    if(ua.match(/MicroMessenger/i)=="micromessenger"&&cache.get("userId")==undefined){
    	jmRegisterPage().then(function(userId){
    		app(userId);
    	})
    }else{
    	app(cache.get("userId"));
    }
	function app(userId){
   		$http({
			method:'Post',
			params:{userId:userId},
			url:$rootScope.rootScopeUrl+'/api/read/logs'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
                if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
                    var text="为了便于您的阅读，请添加本链接到书签";
                    $rootScope.collectTip($scope,$timeout,text);
                }
				$rootScope.loginBack=$location.url();
				$rootScope.loadingFunction($scope);
				$scope.recentRead=response.data.data;
				if($scope.recentRead.length==0){
					$scope.isbookstore=!$scope.isbookstore;
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
			}else if(response.data.httpCode==102){
				$state.go("main");
			}else{
				$rootScope.loadingFunction($scope);
				$rootScope.httpSuccess($scope,response,$timeout);
			}
		},function errorCallback(response){
			$rootScope.loadingFunction($scope);
			$rootScope.serveErr($scope,$timeout);
		});
   	}
	$scope.goRead=function(item){
		$state.go("bookcontent",{userId:userId})
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


'use strict'
	angular.module('app').controller('registerCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$location','$timeout','$rootScope','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$location,$timeout,$rootScope,$state,$http,$scope){
        $rootScope.pageStyle='';
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
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


        var userTrackingJson={
            channelId:cache.get("channelId")?cache.get("channelId"):-1,
            extId:cache.get("extId")?cache.get("extId"):-1,
            userId:cache.get("userId")?cache.get("userId"):-1,
            page:'',
            title:'注册页',
            columnName:'',
            columnIndex:-1,
            bookId:-1,
            activityId:-1,
            chapterId:-1,
            url:$location.absUrl()
        }
            userTracking.getTrackingConfig(userTrackingJson);

		$scope.submit=function(){
			$scope.loading=true;
			$scope.isTipContent=false;
			$http({
					method:'Post',
					url:$rootScope.rootScopeUrl+'/api/phone/validation',
					params:$scope.user
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loadingFunction($scope);
						$state.go("registernext",{phone:$scope.user.phone});
					}else{
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.loadingFunction($scope);
					$rootScope.serveErr($scope,$timeout);
			})
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


'use strict'
	angular.module('app').controller('registernextCtrl',['userTracking','weixinsharehttp','weixinshare','$location','md5','$timeout','cache','$rootScope','$state','$http','$interval','$scope',function(userTracking,weixinsharehttp,weixinshare,$location,md5,$timeout,cache,$rootScope,$state,$http,$interval,$scope){
	//console.log($state.params.phone,"登录的电话");
	$rootScope.bookstoreBack="";
	$rootScope.title="元气小说";
	var channel,extid;
	if(cache.get("channelId")){
		channel=cache.get("channelId");
	}else{
		channel=-1;
	}
	if(cache.get("extId")){
		extid=cache.get("extId");
	}else{
		extid=-1;
	}
	var userTrackingJson={
            channelId:cache.get("channelId")?cache.get("channelId"):-1,
            extId:cache.get("extId")?cache.get("extId"):-1,
            userId:cache.get("userId")?cache.get("userId"):-1,
            page:'',
            title:'注册设置密码页',
            columnName:'',
            columnIndex:-1,
            bookId:-1,
            activityId:-1,
            chapterId:-1,
            url:$location.absUrl()
        }
        userTracking.getTrackingConfig(userTrackingJson);
	var count=60;
		$scope.send=function(){
			$http({
				method:'Post',
				params:{phone:$state.params.phone},
				url:$rootScope.rootScopeUrl+'/api/send/authcode'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						//console.log($state.params.phone,"验证码");
						count=60;
						$scope.time='60s';
						var interval=$interval(function(){
							if(count<=0){
								$interval.cancel(interval);
								$scope.time='';
							}else{
								count--;
								$scope.time=count+'s';
							}
						},1000);
					}else{
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.serveErr($scope,$timeout);
			})
		}
	$scope.submit=function(){	
		$scope.loading=true;
		$scope.user.phone=$state.params.phone;
		$scope.user.channelId=channel;
		$scope.user.extId=extid;
		var pwdZQ=$scope.user.pwd;
		var pwdZ = md5.createHash(pwdZQ);
		$http({
				method:'Post',
				url:$rootScope.rootScopeUrl+'/api/register',
				params:{phone:$state.params.phone,channelId:channel,extId:extid,pwd:pwdZ,authCode:$scope.user.authCode}
			}).then(function successCallback(response){
				if(response.data.httpCode==200){
					$rootScope.loadingFunction($scope);
                    if(isWeiXin()){
                        window.location.href="http://topt.yqread.net/web/wechat/auth/redirect?phone="+$state.params.phone;
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
		})
	}
	//判断是不是微信；
	function isWeiXin(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
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

'use strict'
	angular.module('app').controller('serachCtrl',['userTracking','weixinsharehttp','weixinshare','cache','$location','$timeout','$rootScope','$state','$http','$scope',function(userTracking,weixinsharehttp,weixinshare,cache,$location,$timeout,$rootScope,$state,$http,$scope){
		//精彩推荐
        $rootScope.pageStyle=$location.url();
        $rootScope.title="元气小说";
        $rootScope.bookstoreBack="";
		$scope.loading=true;
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

		var userTrackingJson={
                channelId:cache.get("channelId")?cache.get("channelId"):-1,
                extId:cache.get("extId")?cache.get("extId"):-1,
                userId:cache.get("userId")?cache.get("userId"):-1,
                page:'',
                title:'搜索页',
                columnName:'',
                columnIndex:-1,
                bookId:-1,
                activityId:-1,
                chapterId:-1,
                url:$location.absUrl()
            }
            userTracking.getTrackingConfig(userTrackingJson);

		//微信静默注册跟登录；
		var jmRegisterUrl,flage,postUrl,newUrl,endRout;
	    var ua = navigator.userAgent.toLowerCase();
	         
	    function jmRegisterPage(){
	        var extIdW=cache.get("extId")!=undefined?cache.get("extId"):'';
	        var channelIdW=cache.get("channelId")!=undefined?cache.get("channelId"):'';
	        var jmCode;
	        var search1=cache.get("userId")==undefined&&(!jmCode)?undefined:jmCode;
	        var postUrl;
	        if(cache.get("userId")==undefined&&(ua.match(/MicroMessenger/i)=="micromessenger")){
	            flage=$location.absUrl().split("userData=")[1];
	            endRout=$location.absUrl().split("userData=")[0];
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
	                flage=JSON.parse(decodeURIComponent(flage));
	                $rootScope.loadingFunction($scope);
	                cache.put("userId",flage.userId,1);
	                cache.put("userName",flage.userName,1);
	                cache.put("token",flage.token,1);
	               	if(flage.imgUrl!=""){
                    	cache.put("imgUrl",flage.imgUrl,1);
                    }
	               	cache.put("binding",flage.binding,1);
	                var abc=decodeURIComponent($location.url().split("?userData")[0]);
	                $location.url(abc);
	            }
	        }
	    }
	    jmRegisterPage();

		//精彩推荐
		$http({
			method:'Post',
			params:'',
			url:$rootScope.rootScopeUrl+'/api/recommend/booklist'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				if($rootScope.isTipContentHome&&ua.match(/MicroMessenger/i)!="micromessenger"){
					var text="为了便于您的阅读，请添加本链接到书签";
       				$rootScope.collectTip($scope,$timeout,text);
				}
				$scope.recommendList=response.data.data;
				$scope.loading=false;
			}else{
				$$scope.loading=false;
				$rootScope.httpSuccess($scope,response,$timeout);
			}
		},function errorCallback(response){
			$scope.loading=false;
			$rootScope.serveErr($scope,$timeout);
		});
		//关键字
		$http({
			method:'Post',
			params:'',
			url:$rootScope.rootScopeUrl+'/api/popsearch/list'
		}).then(function successCallback(response){
			if(response.data.httpCode==200){
				//$rootScope.loadingFunction($scope);
				$scope.hotserachList=response.data.data;
			}else{
				$rootScope.httpSuccess($scope,response,$timeout);
			}
				
		},function errorCallback(response){
			$rootScope.serveErr($scope,$timeout);
		});
		//搜索
		$scope.pageNum=1;
		$scope.hideDiv=true;
		var total;
		$scope.serachsubmit=function(word){
			for(var i=0;i<$scope.hotserachList.length;i++){
				if(word===$scope.hotserachList[i].wd){
					$scope.loading=true;
					$scope.searchVal=word;
				}
			}
			if($scope.searchVal&&$scope.searchVal!=''){
				$scope.loading=true;
				var channelIdA=cache.get("channelId")?cache.get("channelId"):-1;
				var extIdA=cache.get("extId")?cache.get("extId"):-1
				$http({
					method:'Post',
					params:{wd:$scope.searchVal,pageNum:$scope.pageNum,pageSize:10,channelId:channelIdA,extId:extIdA},
					url:$rootScope.rootScopeUrl+'/api/search'
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$scope.loading=false;
						$scope.hideDiv=false;
						$scope.serachList=response.data.data;
						total=response.data.data.total;
					}else{
						$scope.loading=false;
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(response){
					$scope.loading=false;
					$rootScope.serveErr($scope,$timeout);
				});
				$scope.isScrollIf=true;
				$scope.loadingSmall=false;
				$(window).scroll(function() {
					var channelIdA=cache.get("channelId")?cache.get("channelId"):-1;
				   var extIdA=cache.get("extId")?cache.get("extId"):-1
					var scrollTop = $(this).scrollTop();
					var scrollHeight = $(document).height();
					var windowHeight = $(this).height();
					if (scrollTop + windowHeight > scrollHeight-40) {
					// 此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
						if($scope.isScrollIf){
							$scope.isScrollIf=false;
							$scope.loadingSmall=!$scope.loadingSmall;
							if($scope.pagenum<Math.ceil(total/10)){
								$scope.pagenum++;
								$http({
									method:'Post',
									params:{wd:$scope.searchVal,pageNum:$scope.pageNum,pageSize:10,channelId:channelIdA,extId:extIdA},
									url:$rootScope.rootScopeUrl+'/api/search'
								}).then(function successCallback(response){
									if(response.data.httpCode==200){
										$scope.isScrollIf=true;
										$scope.loadingSmall=!$scope.loadingSmall;
										for(var i=0;i<response.data.data.list.length;i++){
											$scope.serachList.list.push(response.data.data.list[i]);
										}
									}else{
										$scope.loadingSmall=!$scope.loadingSmall;
										$rootScope.httpSuccess($scope,response,$timeout);
									}
								},function errorCallback(response){
									$scope.loadingSmall=!$scope.loadingSmall;
									$rootScope.serveErr($scope,$timeout);
								});	
							}
						}
					}
				});
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
				//$rootScope.loadingFunction($scope);
				$scope.goodBookList=response.data.data.bookList;
			}else{
				$rootScope.httpSuccess($scope,response,$timeout);
			}
				
		},function errorCallback(response){
			$rootScope.serveErr($scope,$timeout);
		});
		//搜索词条删除
		$scope.cancelSearchVal=function(){
			$scope.searchVal="";
			$scope.hideDiv=true;
			$scope.loadingSmall=false;
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

'use strict'
	angular.module('app').controller('sercetsetCtrl',['userTracking','$location','weixinsharehttp','weixinshare','$state','$rootScope','cache','$http','$scope',function(userTracking,$location,weixinsharehttp,weixinshare,$state,$rootScope,cache,$http,$scope){
        $rootScope.pageStyle='';
        $rootScope.bookstoreBack="";
        $rootScope.title="元气小说";
        if(cache.get("binding")==undefined){
        	$scope.isJMShow=false;
        }else if(cache.get("binding")=="true"){
        	$scope.isJMShow=true;
        }else if(cache.get("binding")=="false"){
        	$scope.isJMShow=false;
        }
		if(cache.get('userId')){
			$scope.userName=cache.get('userName');
			$scope.imgUrl=cache.get('imgUrl');
		}
		$scope.isloginout=false;
		$scope.loginoutShow=function(){
			$scope.isloginout=!$scope.isloginout;
		}
		$scope.loginout=function(){
			cache.remove('userId');
			cache.remove('userName');
			cache.remove('imgUrl');
			cache.remove('gender');
			cache.remove('sign');
			cache.remove('binding');
			$state.go('main');
		}
		$scope.loginoutN=function(){
			$scope.isloginout=!$scope.isloginout;
		}
		var userTrackingJson={
            channelId:cache.get("channelId")?cache.get("channelId"):-1,
            extId:cache.get("extId")?cache.get("extId"):-1,
            userId:cache.get("userId")?cache.get("userId"):-1,
            page:'',
            title:'安全设置页',
            columnName:'',
            columnIndex:-1,
            bookId:-1,
            activityId:-1,
            chapterId:-1,
            url:$location.absUrl()
        }
        userTracking.getTrackingConfig(userTrackingJson);

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

'use strict'
	angular.module('app').controller('setnewpasswordCtrl',['weixinsharehttp','weixinshare','$location','cache','md5','$timeout','$state','$rootScope','$http','$scope',function(weixinsharehttp,weixinshare,$location,cache,md5,$timeout,$state,$rootScope,$http,$scope){
		$scope.isTipContent=false;
        $rootScope.pageStyle='';
		var authCode=$state.params.authCode;
		var phone=$state.params.phone;
		$rootScope.bookstoreBack="";
		$rootScope.title="元气小说";

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
		
		$scope.submit=function(){
			$scope.loading=true;
			var pwdQ=$scope.user.newPwd;
			var cpwdQ=$scope.user.confirmPwd;
			var pwdZ= md5.createHash(pwdQ);
			var cpwdZ= md5.createHash(cpwdQ);
			$http({
					method:'Post',
					url:$rootScope.rootScopeUrl+'/api/pwd/new',
					params:{newPwd:pwdZ,confirmPwd:cpwdZ,authCode:authCode,phone:phone}
				}).then(function successCallback(response){
					if(response.data.httpCode==200){
						$rootScope.loadingFunction($scope);
						$scope.tipContent=response.data.msg;
						$scope.isTipContent=!$scope.isTipContent;
						$timeout(function(){
							$scope.isTipContent=!$scope.isTipContent;
							$state.go("login");
						},1200)
					}else if(response.data.httpCode==100){
						$rootScope.loadingFunction($scope);
						$state.go("login")
					}else{
						$rootScope.loadingFunction($scope);
						$rootScope.httpSuccess($scope,response,$timeout);
					}
				},function errorCallback(err){
					$rootScope.loadingFunction($scope);
					$rootScope.serveErr($scope,$timeout);
			})
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

'use strict'
	angular.module('app').controller('signCtrl',['$rootScope','$http','$scope',function($rootScope,$http,$scope){
        $rootScope.pageStyle='';
        $rootScope.bookstoreBack="";
}])

'use strict'
	angular.module('app').controller('signgzCtrl',['$rootScope','$http','$scope',function($rootScope,$http,$scope){
		$rootScope.bookstoreBack="";
}])

'use strict'
	angular.module('app').controller('touprecordCtrl',['$rootScope','$http','$scope',function($rootScope,$http,$scope){
        $rootScope.pageStyle='';
}])

'use strict'
angular.module('app')
.service('cache',['$cookies',function($cookies){//这个是服务的写作方式
	this.put=function(key,value,day){//存这个值
		var expireDate = new Date();
 	 	expireDate.setDate(expireDate.getDate() + day);
		$cookies.put(key,value,{expires:expireDate});
	}
	this.get=function(key){//取这个值
		return $cookies.get(key);
	}
	this.remove=function(key){//删除这个值
		$cookies.remove(key);
	}
}]);


'use strict'
angular.module('app')
.factory('userTracking',['$http','$window','$rootScope', function ($http,$window,$rootScope) { 
    var userTrackingObj=new Object();
     userTrackingObj.getTrackingConfig=function(objJson){
        var obj=objJson;
        if(objJson.url.split("?userData")[1]){
            obj.url= objJson.url.split("?userData")[0];
        }else if(!objJson.url.split("?userData")[1]){
            obj.url=objJson.url;
             $http({
                method:'Post',
                url:$rootScope.rootScopeUrl+'/api/track',
                params:obj,
            }).then(function successCallback(response){
                if(response.data.httpCode==200){
                    
                }else{
                    //$rootScope.httpSuccess($scope,response,$timeout);
                }   
            },function errorCallback(response){
                //$rootScope.serveErr($scope,$timeout);
            });   
        } 
     }  
    return userTrackingObj;
}]);


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

/**
 * Created by zhaozijun on 2017/8/17.
 */
'use strict';
angular.module('app').directive('appBookdetail',[function(){
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/book/bookdetail.html'
    }
}]);
'use strict';
angular.module('app').directive('appBookbaselist',[function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			bobase:'='
		},
		templateUrl:'view/template/bookbase/bookbaselist.html',
		controller:function($scope,$http,$timeout,userTracking,$rootScope,cache,$location){
			$scope.rankMoreFunction=function(item,i){
				var params=$location.search();
				var userTrackingJson={
		            channelId:cache.get("channelId")?cache.get("channelId"):-1,
		            extId:cache.get("extId")?cache.get("extId"):-1,
		            userId:cache.get("userId")?cache.get("userId"):-1,
		            page:"column",
		            title:item.bookName,
		            columnName:params.styleName,
		            columnIndex:(i+1),
		            bookId:-1,
		            activityId:-1,
		            chapterId:-1,
		            url:$location.absUrl().split("#")[0]+'#!/bookdetail?bookId='+item.bookId
		        }
		        console.log(userTrackingJson,"userTrackingJson")
		        userTracking.getTrackingConfig(userTrackingJson);
			}
		}
	}
}])

'use strict';
angular.module('app').directive('appBookclass',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/bookbase/bookclass.html',
		controller:function($scope,$interval){	
			$scope.isBookclass=false;
		 	$scope.scrollTopHeight="";	
			$interval(function(){
				$(window).bind('scroll',function(){
					$scope.scrollTopHeight = $(window).scrollTop();
			
					if($scope.scrollTopHeight>49){
						$scope.isBookclass=true;
						$scope.warpMore=!$scope.isBookclass;
					}else{
						$scope.isBookclass=false;
						$scope.warpMore=false;
					}
				});
			},100);
		}
	}
}])
'use strict';
angular.module('app').directive('appClass',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/class/class.html'
	}
}])
'use strict';
angular.module('app').directive('appListsame',[function(){
    return{
        restrict:'A',
        replace:true,
        scope:{
            com:'='
        },
        templateUrl:'view/template/class/listsame.html'
    }
}])
'use strict'
angular.module('app').directive('appBanner',[function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			slides:'='
		},
		templateUrl:'view/template/main/banner.html',
		controller:function($scope,$http,$timeout,userTracking,$rootScope,cache,$location){
			$scope.bannerClick=function(banner,i){
				console.log(banner);
				var userTrackingJson={
						channelId:cache.get("channelId")?cache.get("channelId"):-1,
					    extId:cache.get("extId")?cache.get("extId"):-1,
					    userId:cache.get("userId")?cache.get("userId"):-1,
					    page:"column",
					    title:banner.bannerName,
					    columnName:'首页轮播图',
					    columnIndex:i+1,
					    bookId:-1,
					    activityId:-1,
					    chapterId:-1,
					    url:banner.bannerUrl
					}
					console.log(userTrackingJson,"userTrackingJson")
					userTracking.getTrackingConfig(userTrackingJson);
					window.location.href=banner.bannerUrl;
			}
			$timeout(function(){
				var mySwiper = new Swiper('.swiper-container',{
					autoplay:3000,
				    loop:true,
				    pagination : '.swiper-pagination',
				    paginationClickable: true,
				    longSwipesRatio: 0.3,
				    touchRatio:1,
				    observer:true,//修改swiper自己或子元素时，自动初始化swiper
				    observeParents:true,//修改swiper的父元素时，自动初始化swiper
				    autoplayDisableOnInteraction:true
				})
			},50)
		}
	};
}]);
'use strict';
angular.module('app').directive('appColumnsamelist',[function(){
    return{
        restrict:'A',
        replace:true,
        scope:{
            column:'='
        },
        templateUrl:'view/template/main/columnsamelist.html',
        controller:function($scope,$http,$timeout,userTracking,$rootScope,cache,$location){
        	$scope.columnSame=function(book,i){
        		var param=$location.search();
        		console.log(book);
				var userTrackingJson={
						channelId:cache.get("channelId")?cache.get("channelId"):-1,
					    extId:cache.get("extId")?cache.get("extId"):-1,
					    userId:cache.get("userId")?cache.get("userId"):-1,
					    page:"column",
					    title:book.bookName,
					    columnName:param.columnName,
					    columnIndex:i+1,
					    bookId:-1,
					    activityId:-1,
					    chapterId:-1,
					    url:$location.absUrl().split("#")[0]+'#!/bookdetail?bookId='+book.bookId
					}
					console.log(userTrackingJson,"userTrackingJson")
					userTracking.getTrackingConfig(userTrackingJson);
        	}
        }
    }
}])
'use strict';
angular.module('app').directive('appZttj',[function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			booklist:'='
		},
		templateUrl:'view/template/main/zttj.html'
	}
}])
/*
'use strict';
angular.module('app').directive('appBookcover',[function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			read:'='
		},
		templateUrl:'../view/template/person/bookcover.html',
		controller:function($scope,$http,$timeout){
			$timeout(function(){
				var coverSwiper=new Swiper("#coverSwiper", {	
					slidesPerView: "auto",
					loopedSlides: 2.5,
					centeredSlides: true,
					watchSlidesProgress: true,
					paginationClickable: true,
					onInit: function(t) {
						var a = $(".swiper-slide-active img").attr("src");
						"undefined" !== a && $(".J-blurMask").css("background-image", "url(" + a + ")")
					},
					onTransitionEnd: function(t) {
						var a = $(".swiper-slide-active img").attr("src");
						"undefined" !== a && $(".J-blurMask").css("background-image", "url(" + a + ")")
					}
				})
			},50)
		}
	}
}])*/

/*'use strict';
angular.module('app').directive('appChangepassword',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/changepassword.html'
	}
}])*/
/*
'use strict';
angular.module('app').directive('appCollect',[function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			coll:'='
		},
		templateUrl:'view/template/person/collect.html'
	}
}])
*/

'use strict';
angular.module('app').directive('appFeedback',[function(){
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/person/feedback.html'
    }
}])
'use strict';
angular.module('app').directive('appProblemdetail',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/problemdetail.html'
	}
}])
'use strict';
angular.module('app').directive('appProblemslist',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/problemslist.html'
	}
}])
'use strict';
angular.module('app').directive('appSercetset',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/sercetset.html'
	}
}])
'use strict';
angular.module('app').directive('appSign',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/sign.html'
	}
}])
'use strict';
angular.module('app').directive('appSigngz',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/signgz.html'
	}
}])
'use strict';
angular.module('app').directive('appTouprecord',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'../view/template/person/touprecord.html'
	}
}])