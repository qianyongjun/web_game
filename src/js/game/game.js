//game逻辑框架
var _lang={
	zh: {title: "看你有多色",help_txt: "找出所有色块里颜色不同的一个",score: "得分:",btn_pause: "暂停",btn_normal: "普通场",btn_double: "双飞场",btn_normal_mode: "普通模式",btn_double_mode: "双飞模式",btn_reTry: "重来",btn_more_game: "更多游戏",game_pause: "游戏暂停",btn_resume: "继续",lv_txt: ["瞎子", "色盲", "色郎", "色狼", "色鬼", "色魔", "超级色魔", "变态色魔", "孤独求色"],tips: '再得<em id="_score"></em>分，就可再打败<em id="_num"></em>万人',share_txt_d: "[双飞]",share_txt1: "我怒砍",share_txt2: "分,击败",share_txt3: "%的人,我是[",share_txt4: "],不服来战！",coyright: "PIG_god"}
	}
	,_config={
		lang: "zh",
		color:{
			allTime: 60,
			addTime:0,
			lvMap: [2,3,4,5,5,6,6,7,7,7,8,8,8,8,8,9]
		},
		color2:{
			allTime:60,
			addTime:0,
			lvMap: [4,4,6,6,6,6,6,8,8,8,8,8,10,10,10,10]
		},
		pic:{isOpen:false,allTime:5,addTime:0,lvMap:[2,3,3,4,4,4,4,5,5,5,7,7,7,]}
	};
	/*,_shareData={
		imgUrl:"",
		timeLineLink:'http://url.cn/RN8G9E',
		tTItle:_lang[_config.lang].title,
		tContent: _lang[_config.lang].desc
	};*/

!function(){
	var box= $('#box'),
	//定义游戏变量，便于调用
	b={
	      	lv: $('#main .score em'),
	      	time: $('#main .time'),
	      	start: $('#dialog .btn-restart'),
	      	pause: $('#main .btn-pause'),
	      	resume: $('#dialog .btn-resume'),
	      	mode: $('#mode'),
	      	dialog: $('#dialog'),
	      	d_content: $('#dialog .content'),
	      	d_pause: $('#dialog .pause'),
	      	d_gameover: $('#dialog .gameover')
	},
	//定义游戏对象
	c={
		target: 1,//游戏目标 ，找出一个不用
		finded: 0,//当前找到量
		score: 0,//初始等分
		init:function(type,el,parent){
			this.type= type,
			this.target = "color2" ==type?2:1,
			this.api=API[type];// this.api.render==e.render
			this.config= _config[type];
			this.lang= _lang[_config.lang];
			b.mode.data("type","color"==type?"color2":'color').html("color" == type ? this.lang.btn_double : this.lang.btn_normal);
			this.reset();
			this.parent = parent;
			this.el = el;
			this.renderUI();
			this.inited || this.initEvent();
			this.inited = true;
			this.start();
		},//初始化函数完成
		//下面是游戏绑定事件
		reset:function(){
			this.time = this. config.allTime;
			this.lv = -1;//表示非处于正常游戏状态
		},
		//游戏
		initEvent:function(){
			var eventName = "ontouchstart" in document.documentElement?"touchend":"click",myGame=this;
			$(window).resize(function(){
				myGame.renderUI();
			});//初始化界面当窗口变化时
			box.on(eventName,'span',function(){
				var type=$(this).data('type');
				if('a'== type){//a是定义游戏格子中和其他格子不同颜色的
					$(this).css("background-color","#f00").data("type","a").html("<em></em>");
					myGame.finded++ //myGame是当前游戏对象，表示玩家成功一次
					if(myGame.finded == myGame.target){
						myGame.nextLv.call(myGame)
					}//玩家完成一关目标后，进入下一关
				}
			});
			b.pause.on(eventName,_.bind(this.pause,this));
			b.resume.on(eventName,_.bind(this.resume,this));
			b.start.on(eventName,function(){
				myGame.score = 0;
				b.time.html(0);
				myGame.reset();
				myGame.start()
			});
		},
		//游戏屏幕设置
		renderUI:function(){
			var isLandscape = 90 ==window.orientation || -90 == window.orientation;//判断浏览器是横屏还是竖屏
			var width = isLandscape? window.innerHeight : window.innerWidth;
			width -=20,width= Math.min(width,500);
			box.width(width).height(width);//绘制游戏舞台
			this.el.show();
		},
		//游戏开始函数
		start:function(){
			this.time > 5 && b.time.removeClass('danger');//判断剩余时间是否大于5秒,&&表示条件满足触发后面的表达式
			this.finded=0;//初始化数据
			b.dialog.hide();
			this._pause=false;
			this.lv= "undefined" != typeof this.lv ? this.lv+1 : 0;//判断游戏level，lv初始值为-1,在reset函数中声明了;
			console.log(this.lv);
			this.lvMap = this.config.lvMap[this.lv] || _.last(this.config.lvMap); //后半句表示当玩家实际游戏关数超过我们定义的lvMap数组长度,"_.last"是underscore.js中语法表示取 this.config.lvMap数组中的最后一个数
			console.log(this.lvMap);
			this.renderMap();//渲染map
			this.renderInfo();//渲染页面信息
			this.timer || (this.timer = setInterval(_.bind(this.tick,this),1000)) //设置计时器
		},
		//继续
		resume:function(){
			b.dialog.hide();
			this._pause=false;
		},
		//暂停
		pause:function(){
			this._pause=true;
			b.d_content.hide();
			b.d_pause.show();
			b.dialog.show();
		},
		nextLv: function() {
			this.time += this.config.addTime;
			b.time.text(parseInt(this.time));
			if(!this._pause){
				this.start();
			}
		},
		//渲染游戏格子
		renderMap:function(){
			if(!this._pause){//通过start声明的 this._pause,判断是否为暂停状态
				var n = this.lvMap*this.lvMap,//绘制n宫格
				      c = "", d = "lv"+this.lvMap;
				      _(n).times(function(){
				      	c +="<span></span>"
				      });//根据lvMap 值判断绘制的格子数添加span元素
				      box.attr('class',d).html(c);
				      this.api.render(this.lvMap,this.lv)//api是游戏核心逻辑，用于绘制span
			}
		},
		//渲染页面内容
		renderInfo:function(){
			this.score += "color2" == this.type ? this.lvMap / 2 : 1;
			b.lv.text(this.score)
		},
		//定时器设置，判断游戏是否是暂停或者是结束
		tick:function(){
			if(this._pause){
				return;
			}
			else{
				this.time--;//根据reset中调用config内设置的allTime
				this.time<6&&b.time.addClass('danger');//小于6秒增加提示色
				if(this.time<0){
					this.gameOver();
				}
				else{
					b.time.text(parseInt(this.time));
				}
			}
		},
		//游戏结束实现
		gameOver:function(){
			var d=this.api.getGameOverText(this.score);
			this.lastScore = this.score;//记录最后得分
			this.lastGameTxt=d.txt;
			b.d_content.hide();
			b.d_gameover.show().find('h3').html(this.lastGameTxt);
			box.find('span').fadeOut(1500,function(){
				b.dialog.show();//对话框中有gamerover内容
			});//给格子做渐隐效果
			if ( "color2" == this.type) {
				var e = [2, 3, 4][parseInt(2 * Math.random())];
				$("#_score").html(e);
				var f;
				f = this.score < 70 ? (20 + 10 * Math.random()).toFixed(1) : this.score < 80 ? (30 + 20 * Math.random()).toFixed(1) : this.score < 90 ? (70 + 10 * Math.random()).toFixed(1) : this.score < 100 ? (100 + 100 * Math.random()).toFixed(1) : this.score < 110 ? (60 + 10 * Math.random()).toFixed(1) : this.score < 120 ? (30 + 20 * Math.random()).toFixed(1) : this.score < 130 ? (10 + 10 * Math.random()).toFixed(1) : (5 + 10 * Math.random()).toFixed(1);
				$("#_num").html(f), $("#tips").show()
			}
			else{
				$("#tips").hide();
			}
			this._pause = true;
			var g = "color2" == this.type ? "d_" : "";
		}
	};
	window.Game=c;
}();
