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