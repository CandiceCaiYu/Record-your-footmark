

var allPlaces = ['xinJiang','xiZang','neiMengGu','gaSu','ningXia','shangXi','shanXi','heiNan',
				'huBei','huNan','heiBei','beiJing','tianJin','shangDong','anHui','jiangSu','shangHai','jiangXi',
				'zheJiang','fuJian','taiWan','guangDong','xiangGai','aoMen','liaoNing','jiLin',
				'heiLongJiang','qingHai','siChuan','chongQian','yunNan','guiZhou', 'guangXi','haiNan'];
window.onload = function(){

//------------------begin性能测试1------------------------

	/*var times = new Date();
	console.log(times);*/


	var mainTheme = document.getElementById('mainTheme'),
		content = getClassNames('content','map'),
		target = getClassNames('target','map'),

		title4 = getClassNames('title4','map'),
		menu = getClassNames('asistant icon-menu','map'),
		list = getClassNames('list', 'map'),
		font = getClassNames('font', 'map'),
		setfont = getClassNames('setFont','map'),
		fontfamily = getClassNames('import_text','map'),
		themes = getClassNames('themes','map'),
		setTheme = getClassNames('setTheme','map'),
		imgs = getClassNames('import_img','map'),
		imgsURL = getClassNames('imgURL','map'),

		scale1 = getClassNames('scale1','map'),
		scale2 = getClassNames('scale2','map'),
		foot = getClassNames('content_foot','map'),	
		btn_yes = getClassNames('yes','map'),	
		btn_no = getClassNames('no','map'),	
		len = allPlaces.length;

		positions(allPlaces,content,target,title4,menu,list,font,setfont,themes,setTheme,imgs,imgsURL,scale1,scale2,foot,btn_yes,btn_no,len,'map');
	
//图片地址帮助页面
		var left = document.getElementById('left'),
			right = document.getElementById('right'),
			top = document.getElementById('top'),
			help = document.getElementById('help'),
			lis = help.getElementsByTagName('li');
		
		getImgURL(left,right,help,lis);

//回到顶部
		window.onscroll = function(){
			var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
			if(scrolltop>600){
				top.style.opacity = 1;
			}else{
				top.style.opacity = 0;
			}
			top.onclick = function(){
				(document.documentElement.scrollTop = 0) || (document.body.scrollTop = 0);
			}
		}


//主页面背景色（白天不懂夜的黑）
		var bright = document.getElementById('bright'),
			black = document.getElementById('black');
			bright.onclick = function(){
				this.style.color = '#000';
				black.style.color = '#000';
				mainTheme.style.color = '#000';
				top.style.color = '#000';
				document.body.style.background = '#fff';
				for(var i=0; i<len; i++){
					getClassNames(allPlaces[i],'map')[0].style.background = '#e0a461';
				}
			}
			black.onclick = function(){
				this.style.color = '#fff';
				bright.style.color = '#fff';
				mainTheme.style.color = '#fff';
				top.style.color = '#fff';
				document.body.style.background = '#2b2533';
				for(var i=0; i<len; i++){
					getClassNames(allPlaces[i],'map')[0].style.background = '#5d544a';
				}
			}

//------------------性能测试2 end------------------------
			/*var times2 = new Date();
			console.log(times2);
			console.log(times2.getTime()-times.getTime());*/
}




//根据类名来获取元素
function getClassNames(className, parent){
	var myParent = parent ? document.getElementById(parent) : document;
	var allSons  = myParent.getElementsByTagName("*");
	var sons = [];
	for(var i=0, len = allSons.length; i<len; i++){
		if(allSons[i].className == className){
			sons.push(allSons[i]);
		}
	}

	return sons;
}


//冒泡处理
function puple(event){
	event = event || window.event;
	event.cancelBubble = true || event.stopPropagation();
}

// 定位编辑页面
// 所有对编辑页面的操作都在这执行
function positions(allPlaces,content,target,title4,menu,list,font,setfont,themes,setTheme,imgs,imgsURL,scale1,scale2,foot,btn_yes,btn_no,len,ancient){
	var place;
	for(var i=0; i<len; i++){
		place = getClassNames(allPlaces[i],ancient)[0];

		//各个功能实现 的函数都在这
		var colorYes  = '';
		var colorNo = '';
		btn_yes[i].onmouseover= function(){
			colorYes = this.style.background;
			this.style.background = "#ccc";
		}
		btn_yes[i].onmouseout = function(){
			this.style.background = colorYes;
		}
		btn_no[i].onmouseover= function(){
			colorNo = this.style.background;
			this.style.background = "#ccc";
		}
		btn_no[i].onmouseout = function(){
			this.style.background = colorNo;
		}

		cancel(place, content[i], foot[i]);

		add(scale1[i],scale2[i],imgsURL[i],content[i]);


		getList(menu[i], list[i]);
		getTarget(target[i], content[i]);

		change(title4[i]);				
		setFont(font[i],setfont[i]);
		changeTheme(themes[i],setTheme[i]);

		getURL(imgs[i],imgsURL[i]);
	}		
}



//编辑页面 显示 退出
function cancel(place,content,foot){		
	place.onclick = function(event){
		puple(event);
		var top = this.offsetTop,
			left = this.offsetLeft,
			width = this.offsetWidth,
			height = this.offsetHeight,
			T = top + height,
			L = left + width,
			scrolly = document.body.scrollTop || document.documentElement.scrollTop,
			scrollx = document.body.scrollLeft || document.documentElement.scrollLeft,
			x = event.clientX + scrollx,
			y = event.clientY + scrolly;
				
			
		if(x>left && x<L && y>top && y<T ){
			content.style.height = '400px';
		}
	}
		foot.onclick = function(){
			content.style.height = 0;
	}
}

//拖动编辑框的右下角，增加减小页面大小或改变页面的位置
function add(scale1,scale2,imgsURL,content){
	scale1.onmousedown = allMoving;
	scale2.onmousedown = allMoving;
	function allMoving(event){
		var scaleName = this.className;
		document.onmousemove = function(event){
			var x = event.clientX,
				y = event.clientY,
				top = content.offsetTop,
				left = content.offsetLeft,
				width = content.offsetWidth,
				height = content.offsetHeight;

			if(scaleName == 'scale1'){
				content.style.top = y - height + 'px';
				content.style.left = x - width + 'px';
				imgsURL.style.top = y - height - 40 + 'px';
				imgsURL.style.left = x - width + 'px';
			}else if(scaleName == 'scale2'){
				content.style.width = x - left +'px';
				content.style.height = y - top +'px';
			}
		}
		
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}


// 点击菜单按钮获取设置信息
function getList(menu,list){
	menu.onclick = function(){
		if(list.style.display == 'block'){
			list.style.display = 'none';
		}
		else{
			list.style.display ='block';
		}
	}

}

//点击确认按钮后，定位图标开始闪烁
function getTarget(target,content){
	var yes = content.getElementsByTagName('button')[0];
	yes.onclick = function(){
		target.style.display = 'block';

	}

}


//点击更改标题
function change(title){
	title.ondblclick = function(){
		var oldhtml = title.innerHTML;
		var input = document.createElement('input');
		input.type = 'text';
		input.value = oldhtml;
		title.innerHTML = '';
		title.appendChild(input);

		input.onblur = function(){
			title.innerHTML = this.value;
		}
		input.setSelectionRange(0, oldhtml.length);
		input.focus();
	}
}
//字体设置框
function setFont(font,setfont){
	font.onclick = function(){
		if(setfont.offsetLeft == 90){
			setfont.style.left = -200+'px';
		}
		else{ 
			setfont.style.left = 90+'px';
		}
	}
}


//选择字体类型
function changeFamily(family){
	var fontFamilId = family.id;
	var index = fontFamilId.substring(9);
	var	texts = document.getElementById('text'+index);
		texts.style.fontFamily = family.value;
}

//选择字体大小
function changeSize(size){
	var fontsizeId = size.id;
	var index = fontsizeId.substring(8);
	var	texts = document.getElementById('text'+index);
		texts.style.fontSize = size.value;
}

//主题框
function changeTheme(themes,setTheme){
	themes.onclick = function(){
		if(setTheme.offsetLeft == 90){
			setTheme.style.left = -200 + 'px';
		}else{
			setTheme.style.left = 90 + 'px';
		}
	}
}


function runingTheme(color){
	var themeID = color.id;
	var index = themeID.substring(5);
	var contentMenu,list,btn,setFont,setTheme,item;
	contentMenu = getClassNames('content_menu','map')[index];
	list = getClassNames('list','map')[index];
	yes = getClassNames('yes','map')[index];
	no = getClassNames('no','map')[index];
	setFont = getClassNames('setFont','map')[index];
	setTheme = getClassNames('setTheme','map')[index];
	item = list.getElementsByTagName('li');
	
	contentMenu.style.background = color.value;
	list.style.background = color.value;
	yes.style.background = color.value;
	no.style.background = color.value;
	setFont.style.background = color.value;
	setTheme.style.background = color.value;

	for(var i=0; i<item.length; i++){
		item[i].style.background = color.value;
	}

}

//输入路径，添加图片
function getURL(imgs,imgsURL){
	imgs.onclick = function(){
		imgsURL.style.height = 40 + 'px';
	}
	imgsURL.onmouseout = function(){ 
		this.style.height = 0;
	}
}

function imgURLChange(str){	
	var parent = str.parentNode;
	var imgs = parent.getElementsByTagName('img')[0];
	imgs.src = str.value;
}


//输入图片路径的帮助页面
function getImgURL(left,right,help,lis){
	var claName = '', 
		index = 0 ;

	for(var i=0, len = lis.length; i<len; i++){
		if(lis[i].offsetLeft == 0){
			 claName = lis[i].className;
			 index = parseInt(claName.charAt(claName.length-1))-1;

			right.onclick = function(){
				if(index == len-1){
					alert('已经是最后一页了！');
					return;
				}

				lis[index].style.left = lis[index].offsetLeft + 1000 + 'px';
				index++;
				lis[index].style.left = lis[index].offsetLeft + 1000 + 'px';
			}

			left.onclick = function(){
				if(index == 0){
					alert('已经是第一页了！');
					return;
				};
				lis[index].style.left = lis[index].offsetLeft - 1000 + 'px';
				index--;
				lis[index].style.left = lis[index].offsetLeft - 1000 + 'px';
			}
		}
	}
}
















