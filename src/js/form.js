var userInfoModule = angular.module('UserInfoModule',[])

userInfoModule.controller('UserInfoCtrl',['$scope',
	function($scope){
		$scope.userInfo={
		}
		$scope.getFormData=function(){
			console.log($scope.userInfo)
		}
		$scope.setFormData=function(){
			$scope.userInfo={
				email:"384000374@qq.com",
				password:"22222222",
				checkbox:false
			}
		}
		$scope.resetFormData=function(){
			$scope.userInfo={
				email:"394900197@qq.com",
				password:'12345678',
				checkbox:true
			}
		}
	}
]);

userInfoModule.controller("cssCtrl",['$scope',
	function($scope){
		$scope.isError=false,
		$scope.isWarning=false,
		$scope.setError=function(){
			$scope.messageText="This is a Error!",
			$scope.isError=true;
			$scope.isWarning=false
		},
		$scope.setWarning=function(){
			$scope.messageText="This is a Warning",
			$scope.isError=false,
			$scope.isWarning=true
		}
	}
]);

userInfoModule.controller("showMenu",['$scope',
	function($scope){
		$scope.menuState={
			show:false
		}
		$scope.toggleMenu=function(){
			$scope.menuState.show = !$scope.menuState.show
		}
	}
]);

userInfoModule.directive('hello',function(){
	return {
		restrict:'AE',
		transclude:true,
		template:'<div>Hello Everyone!<div ng-transclude></div></div>'
	}
})

userInfoModule.controller('MyCtrl',['$scope',
	function($scope){
		$scope.loadData=function(){
			console.log('数据加载中。。。')
		}
		$scope.loadData2=function(){
			console.log('数据加载中。。。222222')
		}
		$scope.ctrlFlavor = "百威";
	}
]);

userInfoModule.directive('loader',function(){
	return {
		restrict: 'AE',
		link: function(scope,element,attrs){
			element.bind('mouseover',function(){
				scope.$apply(attrs.howtoload);
			})
		}
	}
})
//注意，如果html中使用驼峰写法，js中要换成全部小写

userInfoModule.directive('drink',function(){
	return {
		restrict:'AE',
		scope:{
			flavor:'@'
		},
		template:'<div>{{flavor}}</div>'
		//@把当前属性作为字符串传递
		//= 与父scope中的属性进行双向绑定
		/*link:function(scope,element,attrs){
			scope.flavor=attrs.flavor
		}*/
	}
})

userInfoModule.controller('formCheck',['$scope',
	function($scope){
		$scope.user={
			userName:'justtin Beber',
			password:'123456'
		};
		$scope.save=function(){
			alert("保存数据");
		}
	}
])


userInfoModule.directive('expand',function(){
	return {
		restrict: 'AE',
		replace:true,
		transclude:true,
		scope:{
			title: '=expandTitle'
		},
		template:'<div class="wrap">'
			  +'<div class="title" ng-click="toggle()">{{title}}</div>'
			  +'<div class="body" ng-show="showList" ng-transclude>{{body}}</div>'
			  +'</div>',
		link:function(scope,element,attrs){
			scope.showList=false,
			scope.toggle=function(){
				scope.showList = !scope.showList
			}
		}
	}
})

userInfoModule.controller('showThing',function($scope){
		$scope.title="这是展开内容。";
		$scope.text="这是展开内容。";
})
