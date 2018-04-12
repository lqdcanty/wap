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