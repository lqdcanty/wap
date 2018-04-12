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