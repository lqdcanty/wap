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
