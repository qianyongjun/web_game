//game初始化js
!function(){
	var b = {
		index:$('#index'),
		room:$('#main'),
		loading:$('#loading'),
		dialog:$('#dialog'),
		play:$('.btn-play')
	},
	ua=window.navigator.userAgent.toLowerCase();
	isAndroid= /android/i.test(ua);
	isIOS=/iphone|ipod|ipad/i.test(ua);
	//初始化功能
	app = {
		init: function(){
			this.initEvent();
			this.loading();
		},
		loading:function(){
			function a(){
				d++,d==c&&app.render();
			}//计数函数,当加载到一定数之后即c后，调用app方法
			/*if(_config.pic.isOpen){
				for(var b= []){
					var g=new Image;
					g.onload=a,g.src=b[e];
				}
			}*/
			/*else{*/
				app.render();
			/*}*/
		},//loading方法，加载所需图片或内容
		render:function(){
			setTimeout(function(){
				b.loading.hide(),b.index.show()
			},1000)
		},
		initEvent:function(){
			var clickEvent = "ontouchstart" in document.documentElement?"touchend":"click";//判断是否支持touch事件
			myApp=this; //指针绑定
			b.play.on(clickEvent,function(){
				var type= $(this).data("type") || "color";//判断获取元素通过data-type
				b.index.hide();
				console.log(type);
				Game.init(type,b.room,myApp)
			});
			/*this.weixinEvent();*///微信分享
		},
		/*weixinEvent: function(){
			var h=_lang[_config.lang];
			document.addEventListener("WeixinJSBridgeReady",
				function(){
					if(WeixinJSBridge){
						WeixinJSBridge.on('menu:share:appmessage',function(){
							var a="color2" == Game.type? h.share_txt_d:"",
							b=Game.lastScore>0?a+h.share_txt1+Game.lastScore+h.share_txt2+Game.lastGamePercent+h.share_txt3+Game.lastGameTxt+h.share_txt4:"";
							WeixinJSBridge.invoke(
								"sendAppMessage",{
									img_url:shareData.imgUrl,
									link:shareData.timeLineLink,
									title:b
								},function(){});
						});
						 WeixinJSBridge.on("menu:share:timeline", function(){
							var a = "color2" == Game.type ? h.share_txt_d : "",
							b = Game.lastScore > 0 ? a + h.share_txt1 + Game.lastScore + h.share_txt2 + Game.lastGamePercent + h.share_txt3 + Game.lastGameTxt + h.share_txt4 : shareData.tTitle;
							WeixinJSBridge.invoke(
							"shareTimeline", {
								img_url: shareData.imgUrl,
								link: shareData.timeLineLink,
								desc: shareData.tContent,
								title: b
						}, function() {});
					});
				}
			},false)
		}*/
	};
	app.init();
	window.API={};

}();
