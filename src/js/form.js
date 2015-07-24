var userInfoModule = angular.module('UserInfoModule',[])

userInfoModule.controller('hello',['$scope',
	function hello($scope){
		$scope.greeting={
			text:'hello'
		};
	}
])
