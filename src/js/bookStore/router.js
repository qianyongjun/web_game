//定义路由模块
var routerApp = angular.module("routerApp",['ui.router']);

//模块参数设置
routerApp.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/index');
	$stateProvider
		.state('index',{
			url: '/index',
			views: {
				'':{
					templateUrl:'tpls2/index.html'
				},
				'topbar@index':{
					templateUrl:'tpls2/topbar.html'
				},
				'main@index':{
					templateUrl:'tpls/main.html'
				}
			}
		})
})
