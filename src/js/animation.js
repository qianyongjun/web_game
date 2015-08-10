//开门关门
function doorAction(left,right,time){
	var doorLeft = $('.door-left');
	var doorRight = $('.door-right');
	var dtd = $.Deferred();
	var count = 2;
	var done = function(){
		if(count == 1){
			dtd.resolve();
			return;
		}
		count--;
	}
	//左侧门移动
	doorLeft.transition({
		'left': left
	},time,done);
	//右侧门移动
	doorRight.transition({
		'left': right
	},time,done);

	return dtd;
}

//开门
function openDoor(){
	return doorAction('-50%','100%',1000)
}

//关门
function closeDoor(){
	return doorAction('0%','50%',1000)
}

//定义移动位置
//translateX = 门中间的left值 - 小男孩中间的left值
//translateY = 人物底部的top值 - 门中间的top值
var distance;
var container = $('#content');
var swipe = Swipe(container);

var initWidth = container.width();
var initHeight = container.height();


//获取数据
var getValue = function(className) {
        var $elem = $(className);
        // 走路的路线坐标
        return {
            height: $elem.height(),
            top: $elem.position().top
        };
    };
//定义滚屏
function scrollTo(time,proportion){
			var disX = container.width()*proportion;
			swipe.scrollTo(disX,time)
		}
//开灯
var light = {
	$element : $('.b_background_dark'),
	on:function(){
		this.$element.addClass('b_lightup')
	},
	off:function(){
		this.$element.removeClass('b_lightup')
	}
}

//鸟飞
var bird={
	$element: $('.bird'),
	fly:function(){
		this.$element.addClass('fly');
		this.$element.transition({
			right: $('#content').width()
		}, 10000 , 'linear')
	}
};

var girlPosY = function(){
	var data = getValue('.c_background .bg_middle');
	return data.top;
}


//小女孩
var girl={
	$ele: $('.girl'),
	getHeight: function(){
		return this.$ele.height();
	},
	getWidth: function(){
		return this.$ele.width();
	},
	//女孩转身
	rotate: function(){
		this.$ele.addClass('girl-rotate')
	},
	getOffset: function(){
		return this.$ele.offset();
	},
	setOffset: function(){
		this.$ele.css({
			left: initWidth / 2,
			top: girlPosY - this.getHeight()
		})
	}
}

function Animation(){
	var container = $('#content');
	/*swipe.scrollTo($('#content').width(),10000)*/
	var $boy = $('#boy');
	var boyWidth = $boy.width();
	var boyHeight = $boy.height();

	var width = $('#content').width();
	var height = $('#content').height();

	//小男孩坐标top值 = 中间路段的中间坐标值 - 小男孩的高度
	//获取中间路段中间值
	//即top值加上自身height的一半
	var middle_path = function(){
		var data = getValue('.bg_middle');
		return data.top + data.height / 2
	}();

	//计算小男孩坐标
	$boy.css({
		top: middle_path - boyHeight + 25
	});

	//css3移动
	function walk(){
		$boy.addClass('walk')
	};

	//暂停走路
	function pause(){
		$boy.addClass('pause')
	};

	//恢复走路
	function rewalk(){
		$boy.removeClass('pause')
	};

	//男孩捧花，做一个间隔动作
	function getFlower(){
		var dtd = $.Deferred();
		setTimeout(function(){
			$boy.removeClass('walk').addClass('flower');
			dtd.resolve();
		},1000);

		return dtd;
	}


	//人物transition移动
	function startWalk(options, time) {
		var dtd = $.Deferred();
		//恢复走路
		rewalk();
		//运动的属性
		$boy.transition(
			options,
			time,
			'linear',
			function(){
				dtd.resolve(); //动画完成
			});
		return dtd;
	};
	// var dtd = $.Deferred(); //创建
	// dtd.resolve();  //成功
	// dtd.then()  //执行回调
	//开始走路
	function startMove(time, dist, disY){
		time = time || 3000;
		//人物移动
		walk();
		var d = startWalk({
			'left': dist + "px",
			'top': disY ? disY : undefined + "px"
		},time);
		return d;

	};

	//计算走路距离,根据x轴还是y轴移动进行赋值
	//距离均是基于页面可视区域宽高为基数
	function caculation(direction,proportion){
		return (direction == "x" ? width : height) * proportion;
	};

	//进入商店
	function walkToShop(runtime){
		var dtd = $.Deferred();
		var door = $('.door');
		//门位置
		var doorPos = door.offset();
		var doorPosLeft = doorPos.left;
		//男孩位置
		var boyPos = $boy.offset();
		var boyPosLeft = boyPos.left;

		distance = (doorPosLeft + door.width() / 2) - (boyPosLeft + $boy.width() / 2);
		console.log(distance)
		//开始进入商店
		var walkPlay = startWalk({
			transform :  'translateY(' + distance +'px),scale(0.3,0.3)',
			opacity : 0.1
		},runtime);
		//完全进入
		walkPlay.done(function(){
			$boy.css({
				opacity:0
			});
			dtd.resolve();
		});
		return dtd;
	}

	//走出商店
	function walkOutShop(runtime){
		var dtd = $.Deferred();
		var walkPlay = startWalk({
			transform :  'translateY(' + distance +'px),scale(1,1)',
			opacity : 1
		},runtime);
		//完全进入
		walkPlay.done(function(){
			dtd.resolve();
		});
		return dtd;
	}

	return{
		//开始走路,定义多久时间移动多少距离
		walkTo: function(time,proportionX,proportionY){
			var dist = caculation('x',proportionX);
			var disY = caculation('y',proportionY);
			return startMove(time,dist,disY);
		},
		//暂停移动
		stopMove:function(){
			pause();
		},
		intoShop:function(){
			return walkToShop.apply(null,arguments)//intoShop方法 继承walkToShop函数参数
		},
		outShop:function(){
			return walkOutShop.apply(null,arguments)
		},
		flower:function(){
			return getFlower();
		},
		Reset:function(){
			this.stopMove();
			$boy.removeClass('flower walk').addClass('person-reset')
		},
		getWidth: function(){
			return $boy.width();
		}
		//一定切记，deferred对象返回状态，函数一定要return Func
	}
}
