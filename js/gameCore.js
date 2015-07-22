//绘制界面
//设置难度系数
//获得随即颜色
//计算目标颜色，讲r,g,b分别+10
//计算目标位置:小于[0,n^2]的随机数
//设置颜色
//获得游戏提示语
!function(){
	var box=$('#box'), span="span",
	//定义核心逻辑对象e
	e={
		lvT:_lang[_config.lang].lv_txt,
		render:function(e,f){
			var g= _config.color.lvMap[f] || _.last(_config.color.lvMap);
			this.d = 15*Math.max(9-g,1);//划分游戏级别
			this.d = f > 20 ? 10 : this.d;
			this.d = f > 40 ? 8 : this.d;
			this.d = f > 50 ? 5 : this.d;
			//做随机数
			var h = Math.floor(Math.random()*e*e),//定义取第几个格子为正确数
			        i = this.getColor(255-this.d),//获取干扰色
			        j = this.getLvColor(i[0]);//获取目标颜色
			box.find(span).css("background-color",i[1]);
			box.find(span).eq(h).css("background-color",j[1]).data('type',"a")
		},
		//定义干扰色函数
		getColor:function(a){
			var b = [
				Math.round(Math.random()*a),
				Math.round(Math.random()*a),
				Math.round(Math.random()*a)
			],//随机rgb三色
			c = "rgb("+b.join(',')+")";
			return [b,c]
		},
		getLvColor:function(a){
			var b = this.d, c = _.map(a,function(a){
				return a + b + 10
			}),//设置难度越大颜色越接近
			d = "rgb("+c.join(',')+")";
			return [c,d]
		},
		getGameOverText:function(lv){
			var b = 20 >lv ? 0 : Math.ceil((lv - 20) / 10);//判断玩家水平
			var c = this.lvT[b] || _.last(this.lvT);
			var d = c+"lv"+lv;
			return {txt:d};
		}
	};
	API.color = e;
	API.color2=e;
}();
