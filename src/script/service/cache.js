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

