var bookStoreApp = angular.module("bookStoreApp",[
	'ngRoute','ngAnimate','bookStoreCtrls','bookStoreFilters',
	'bookStoreServices','bookStoreDirectives'
]);

//路由编写
bookStoreApp.config(function($routeProvider){
	$routeProvider.when('/hello',{
		templateUrl:'tpls/hello.html',
		controller:'HelloCtrl'
	}).when('/list',{
		templateUrl:'tpls/list.html',
		controller:'BookListCtrl'
	}).otherwise({
		redirectTo:'/hello'
	})
})

