// 定义常用变量
var oHome = $sel(".home");
 	slider = oHome.sel(".slider"),
	homeBtn = oHome.sel(".homebtn"),
	homeTimer = null;

var oCourse = $sel(".course");
	aPlane = oCourse.selAll(".plane");

var oWork = $sel(".work");
	aPen = oWork.selAll(".pen");

var oAbout = $sel(".about"),
	aImgBox = oAbout.selAll(".imgbox");

var oTeam = $sel(".team"),
	oTitle = oTeam.sel(".title"),
	oTxt = oTeam.sel(".text");

// 各屏出入场动画
var arrFun = [
	{
		enter : function (){

			
			slider.addClass("animated fadeInDown");
			homeBtn.addClass("animated fadeInUp");
		},
		out : function (){

			// 离开可视区时 清除定时器
			clearInterval(homeTimer);

			slider.removeClass("animated fadeInDown");
			homeBtn.removeClass("animated fadeInUp");
		}
	},
	{
		enter : function (){

			aPlane[0].addClass("animated zoomInDown");
			aPlane[1].addClass("animated zoomInLeft");
			aPlane[2].addClass("animated zoomInUp");
		},
		out : function (){

			aPlane[0].removeClass("animated zoomInDown");
			aPlane[1].removeClass("animated zoomInLeft");
			aPlane[2].removeClass("animated zoomInUp");
		}
	},
	{
		enter : function (){

			for(var i=0;i<aPen.length;i++){

				aPen[i].addClass("animated flip")
			}
		},
		out : function (){

			for(var i=0;i<aPen.length;i++){

				aPen[i].removeClass("animated flip")
			}
		}
	},
	{
		enter : function (){

			
			for(var i=0;i<aImgBox.length;i++){

				aImgBox[i].addClass("animated rotateIn");
			}
		},
		out : function (){

			for(var i=0;i<aImgBox.length;i++){

				aImgBox[i].removeClass("animated rotateIn");
			}
		}
	},
	{
		enter : function (){

			

			oTitle.addClass("animated slideInLeft");
			oTxt.addClass("animated slideInRight");
		},
		out : function (){

			var oBox = oTeam.sel(".box");
			var oTitle = oBox.sel(".title");
			var oTxt = oBox.sel(".text");

			oTitle.removeClass("animated slideInLeft");
			oTxt.removeClass("animated slideInRight");
		}
	}
];

// 设置主体区域高度
(function(doc,win){

	setHeight();
	win.addEventListener("resize",setHeight,false);

	function setHeight(){

		var header = $sel("header");
		var oMain = $sel(".main");
		var cUl = $sel(".content");
		var cLi = cUl.selAll(".list");

		var height = window.innerHeight - header.offsetHeight;
		var len = cLi.length;
		// 设置高度
		oMain.style.height = height + "px";
		cUl.style.height = len + "00%";
		for(var i=0;i<len;i++){

			cLi[i].style.height = 1/len * 100 + "%";
		}
	}
})(document,window);

// loading动画
(function(doc,win){

	var load = $sel(".loading");
	var top = load.sel(".top");
	var bot = load.sel(".bottom");
	var progress = load.sel(".progress");
	var step = 0;

	// 通过图片加载判断动画是否完成
	var aImg = ["img/about1.jpg","img/about2.jpg","img/about3.jpg","img/about4.jpg","img/bg1.jpg","img/bg2.jpg","img/bg3.jpg","img/bg4.jpg","img/bg5.jpg","img/team.png","img/work1.jpg","img/work2.jpg","img/work3.jpg","img/work4.jpg"];
	var len = aImg.length;
	for(var i=0;i<len;i++){

		var img = new Image();
		img.src = aImg[i];
		img.onload = function (){

			step++;
			progress.style.width = step/len*100 + "%";
		}
	}

	// 进度条
	progress.addEventListener("transitionend",function(){

		this.style.display = "none";
		top.style.transform = "translateY(-100%)";
		bot.style.transform = "translateY(100%)";
	});

	// 加载动画完成
	top.addEventListener("transitionend",loadEnd,false);

	function loadEnd(){

		load.parentNode.removeChild(load);
		oHome.sel(".box").style.opacity = 1;
	}
})(document,window);

// 头部导航
(function(doc,win){

	var nUl = $sel(".nav");
	var aLi = nUl.selAll("li");
	var oTran = $sel(".tr_down");
	var oRadius = $sel(".radius");
	var aSpan = oRadius.selAll("span");
	var cUl = $sel(".content");

	// 三角形宽度
	var tWidth = oTran.offsetWidth;
	var len = aLi.length;
	// 同步操作
	var iNow = 0;
	var last = 0;
	var timer = null;

	// 设置三角形初始left值
	oTran.style.left = aLi[0].offsetLeft + aLi[0].offsetWidth/2 - tWidth/2 + "px";
	// console.log(aLi[0].offsetLeft+":"+aLi[0].offsetWidth/2+":"+tWidth/2) bug

	// 添加事件
	for(var i=0;i<len;i++){

		aLi[i].index = i;
		aLi[i].onclick = function (){

			iNow = this.index;
			move(iNow)
		}
	}

	// 添加鼠标滚轮事件
	doc.addEventListener("mousewheel",function(e){

		// 限制滚轮滚动速度
		clearTimeout(timer);
		timer = setTimeout(function(){

			mouseScroll(e)
		},200);
	},false);
	doc.addEventListener("DOMMouseScroll",function(e){

		//限制滚轮滚动速度
		clearTimeout(timer);
		timer = setTimeout(function(){

			mouseScroll(e)
		},300);
	},false);

	// 执行函数
	function mouseScroll(e){

		// 判断用户滚动方向
		var isDown = true;
		if(e.wheelDelta === 120 || e.detail === -3){

			isDown = false;
		}

		// 限制方向
		if((!isDown && iNow === 0) || (isDown && iNow === len-1)) return;

		// 限制滚动范围
		isDown ? iNow++ : iNow--;
		iNow = iNow > len - 1 ? len - 1 : iNow++;
		iNow = iNow < 0 ? 0 : iNow--;

		move(iNow);
	}


	// 运动事件
	function move(index){

		for(var i=0;i<len;i++){

			aLi[i].className = "";
			aSpan[i].className = "";
		}

		aLi[index].className = "active";
		aSpan[index].className = "active";
		oTran.style.left = aLi[index].offsetLeft + aLi[index].offsetWidth/2 - tWidth/2 + "px";

		cUl.style.transition = "1s top";
		cUl.style.top = -index + "00%";
		arrFun[last].out();
		arrFun[index].enter();
		last = iNow; 
	}
})(document,window);

// home动画
(function(doc,win){

	var aLi = slider.selAll("li");
	var aSpan = homeBtn.selAll("span");

	// 长度 自增变量 上次索引 定时器
	var len = aSpan.length;
	var iNow = 0;
	var last = 0;
	// var timer = null;

	setTimeout(function(){

		homeTimer = setInterval(autoMove,2000);
	},2000);

	for(var i=0;i<aSpan.length;i++){

		aSpan[i].index = i;
		aSpan[i].onclick = function (){

			iNow = this.index;
			move(iNow);
		}
	}

	slider.addEventListener("mouseover",function(){

		clearInterval(homeTimer);
	},false);
	slider.addEventListener("mouseout",function(){

		// homeTimer = setInterval(autoMove,2000);
	},false);
	// 运动函数 index>last左进右出 else 右进左出
	function move(index){

		for(var i=0;i<len;i++){

			aSpan[i].className = "";
		}

		aSpan[index].className = "active";
		if(index > last){

			aLi[index].className = "rightshow";
			aLi[last].className = "lefthide";
		}else{

			aLi[index].className = "leftshow";
			aLi[last].className = "righthide";
		}
		
		last = index;
	}

	// 定时器函数
	function autoMove(){

		iNow++;
		if(iNow > len - 1) iNow=0;

		for(var i=0;i<len;i++){

			aSpan[i].className = "";
		}

		aSpan[iNow].className = "active";

		aLi[iNow].className = "rightshow";
		aLi[last].className = "lefthide";

		last = iNow;
	}
})(document,window);

// course
(function(doc,win){

	var oBox = oCourse.sel(".box");
	var rCon = oBox.sel(".rcont");
	var oUl = rCon.sel("ul");

	// 假数据
	var data = [
		{img : "img/course/course1.png",text : "测试文字"},
		{img : "img/course/course2.png",text : "测试文字"},
		{img : "img/course/course3.png",text : "测试文字"},
		{img : "img/course/course8.png",text : "测试文字"},
		{img : "img/course/course5.png",text : "测试文字"},
		{img : "img/course/course6.png",text : "测试文字"},
		{img : "img/course/course7.png",text : "测试文字"},
		{img : "img/course/course8.png",text : "测试文字"},
		{img : "img/course/course9.png",text : "测试文字"},
		{img : "img/course/course4.png",text : "测试文字"},
		{img : "img/course/course5.png",text : "测试文字"},
		{img : "img/course/course6.png",text : "测试文字"}
	];

	create(data);
	// // 创建元素
	function create(data){

		var str = "";
		for(var i=0;i<data.length;i++){

			str += '<li><div class="up" style="background: url('+data[i].img+') no-repeat center center;"></div><div class="down">'+data[i].text+'</div></li>';
		}

		oUl.innerHTML = str;
	}
})(document,window);

// work动画
(function(doc,win){

	var oBox = oWork.sel(".box");
	var oUl = oBox.sel("ul");

	// 动态创建内容
	var data = [
	{img : "img/work1.jpg",text : "测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文"},
	{img : "img/work2.jpg",text : "测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试"},
	{img : "img/work3.jpg",text : "测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文文字测试文"},
	{img : "img/work4.jpg",text : "测试文字测试文字测试文字测试文字测试文字"}]

	creatCon(oUl,data);
	// 函数体
	function creatCon(parent,aData){

		var str = "";
		var len = aData.length || 0;
		for(var i=0;i<len;i++){

			str += '<li><img src="'+aData[i].img+'" alt=""><div class="mask"><p>'+aData[i].text+'</p><a href="#" class="bg"></a></div></li>';
		}
		parent.innerHTML = str;
	}
})(document,window);

// about动画
(function(doc,win){

	// 绑定事件
	for(var i=0;i<aImgBox.length;i++){

		var oUl = aImgBox[i].querySelector("ul");
		createEle.call(aImgBox[i],oUl);
		aImgBox[i].onmouseover = animate;
		aImgBox[i].onmouseout = back;
	}

	// 创建li img
	function createEle(oUl){
		
		var src = oUl.dataset.src;

		var w = oUl.offsetWidth/2;
		var h = oUl.offsetHeight/2;

		for(var i=0;i<4;i++){
			
			var li = doc.createElement("li");
			var img = doc.createElement("img");
			img.src = src;
			img.style.top = -Math.floor(i/2)*h + "px";
			img.style.left = -i%2*w +"px";

			// 保存img的初始值
			img.oldtop = -Math.floor(i/2)*h;
			img.oldleft = -i%2*w;
			li.appendChild(img);
			oUl.appendChild(li);
		}
	}

	// mouseover运动函数
	function animate(){

		var oUl = this.sel("ul");
		var aImg = oUl.selAll("img");

		var w = oUl.offsetWidth/2;
		var h = oUl.offsetHeight/2;

		// 指定运动形式
		var type = [{top : h},{left : -2*w},{left: w},{top : -2*w}];

		for(var i=0;i<type.length;i++){

			for(var key in type[i]){

				aImg[i].style[key] = type[i][key] + "px";
			}
		}
	}

	// mouseout运动函数
	function back(){

		var oUl = this.sel("ul");
		var aImg = oUl.selAll("img");

		for(var i=0;i<aImg.length;i++){

			aImg[i].style.left = aImg[i].oldleft + "px";
			aImg[i].style.top = aImg[i].oldtop + "px";
		}
	}
})(document,window);

// team动画
(function(doc,win){

	var oBox = oTeam.sel(".box");
	var oPerson = oBox.sel(".person");
	var oUl = oPerson.sel("ul");

	// 创建元素
	var str = "";
	for(var i=0;i<8;i++){

		str += '<li style="background-position:'+(-i*118)+'px  0px;"></li>'
	}

	oUl.innerHTML = str;

	var aLi = oUl.selAll("li");
	var len = aLi.length;
	var oC = null;
	// 定时器 timer1控制值的改变 timer2添加值
	var timer1 = null;
	var timer2 = null;

	for(var i=0;i<len;i++){

		aLi[i].index = i;
		// 绑定事件
		aLi[i].onmouseover = function (){

			for(var j=0;j<len;j++){

				aLi[j].style.opacity = "0.6";
			}
			this.style.opacity = 1;
			this.addEventListener("mouseenter",creatCanvas,false);
		}
		aLi[i].onmouseout = function (){

			for(var i=0;i<len;i++){

				aLi[i].style.opacity = 1;
			}

			this.addEventListener("mouseleave",removeCanvas,false);	
		}
	}

	// 创建canvas并执行动画
	function creatCanvas(){

		if(oC) return;
		var left = this.offsetLeft;

		oC = doc.createElement("canvas");
		oC.width = 118;
		oC.height = 300;
		oC.style.left = left + "px";
		oC.style.bottom = 60 + "px";
		this.appendChild(oC);

		var conText = oC.getContext("2d");

		var data = [];
		// 画圆
		timer1 = setInterval(function(){

			// 清空画布
			conText.clearRect(0,0,oC.width,oC.height);

			for(var i=0;i<data.length;i++){

				// 改变圆的位置
				data[i].num +=5;
				data[i].y = data[i].startY - data[i].num/180*Math.PI*50;
				data[i].x =data[i].startX -  Math.sin(data[i].num/180 * Math.PI)*50;

				// 限制运动范围
				if(data[i].y < 50){

					data.splice(i,1);
				}
			}
			for(var i=0;i<data.length;i++){

				// 设置颜色值
				conText.fillStyle = "rgba("+data[i].c1+","+data[i].c2+","+data[i].c3+","+data[i].op+")";
				conText.beginPath();
				// 画圆
				conText.arc(data[i].x,data[i].y,data[i].r,0,2*Math.PI,false);
				conText.fill();
			}
		},100);

		// 动态添加数据 提供圆位置信息
		timer2 = setInterval(function(){

			// 坐标x,y
			var x = oC.width * Math.random();
			var y = oC.height - 10;
			// 半径
			var r = Math.ceil(Math.random()*6 + 2);
			// 颜色值与透明度
			var c1 = Math.ceil(255*Math.random());
			var c2 = Math.ceil(255*Math.random());
			var c3 = Math.ceil(255*Math.random());
			var op = Math.ceil(Math.random());

			// startX startY为初始位置
			data.push({
				x : x,
				y : y,
				r : r,
				c1 : c1,
				c2 : c2,
				c3 : c3,
				op : op,
				num : 5,
				startX : x,
				startY : y
			})
		},200);
	}

	// 移除canvas
	function removeCanvas(){

		// 清空定时器
		clearInterval(timer1);
		clearInterval(timer2);
		this.removeChild(oC);
		oC = null;
		// 移除绑定事件
		this.removeEventListener("mouseenter",creatCanvas);
		this.removeEventListener("mouseleave",removeCanvas);
	}
})(document,window);



