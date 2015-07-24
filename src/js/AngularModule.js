var myModule = angular.module("MyModule", []);

myModule.controller("helloAngular", ['$scope',
	function HelloAngular($scope){
		$scope.greeting = {
			text: 'hello'
		};
	}
]);

myModule.directive('hello',function(){
	return {
		restrict: 'E',
		template: '<div>你好</div>',
		replace: true
	}
})


function greetCtrl($scope,$rootScope){
	$scope.name = "World";
	$rootScope.department = "Angular";
	$scope.test=function(){
		alert($scope.name)
	}
}

function listCtrl($scope){
	$scope.names = ['lili','ignore','mike']
}

function EventController($scope){
	$scope.count = 0;
	$scope.$on('MyEvent',function(){
		$scope.count++;
	})
}
//$scope是表达式作用域

//angular.element($0).scope()可进行调试
