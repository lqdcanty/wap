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

