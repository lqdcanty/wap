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