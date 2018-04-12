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
