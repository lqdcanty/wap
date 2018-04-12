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