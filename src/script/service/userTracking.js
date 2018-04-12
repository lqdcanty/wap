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

