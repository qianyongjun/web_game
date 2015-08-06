function Animation(){
	var container = $('#content');
	/*swipe.scrollTo($('#content').width(),10000)*/
	var $boy = $('#boy');
	var boyWidth = $boy.width();
	var boyHeight = $boy.height();

	var width = $('#content').width();
	var height = $('#content').height();

	//小男孩坐标top值 = 中间路段的中间坐标值 - 小男孩的高度
	//获取数据
	var getValue = function(className){
		var $ele = $(className);
		return {
			height: $ele.height(),
			top: $ele.position().top
		}
	};

	//获取中间路段中间值
	//即top值加上自身height的一半
	var middle_path = function(){
		var data = getValue('.bg_middle');
		return data.top + data.height / 2
	}();

	//计算小男孩坐标
	$boy.css({
		top: middle_path - boyHeight
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

	//太阳移动
	function sunmove(){
		var sun = $('#sun');
		sun.addClass('sunmove')
	}

	//云朵移动
	function cloudmove(){
		var cloud = $('.cloud');
		cloud.eq(0).addClass('cloud1Move');
		cloud.eq(1).addClass('cloud2Move')
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
		setColor:function(value){
			$boy.css('background-color',value)
		},
		sunmove:function(){
			sunmove();
		},
		cloudmove:function(){
			cloudmove()
		}
	}
}
