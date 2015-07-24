var bookStoreCtrls=angular.module('bookStoreCtrls',[]);

bookStoreCtrls.controller('HelloCtrl',['$scope',
	function($scope){
		$scope.greeting={
			text: "Hello"
		}
	}
]);

bookStoreCtrls.controller('BookListCtrl',['$scope',
	function($scope){
		$scope.books=[
			{title: '《笑傲江湖》' ,author: '金庸'},
			{title: '《天龙八部》' ,author: '金庸'},
			{title: '《射雕英雄传》' ,author: '金庸'}
		]
	}
]);
