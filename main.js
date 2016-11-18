# Record-your-footmark
An appliction of show where your went and what were you done


var allPlaces = ['xinJiang','xiZang','neiMengGu','gaSu','ningXia','shangXi','shanXi','heiNan',
				'huBei','huNan','heiBei','beiJing','tianJin','shangDong','anHui','jiangSu','shangHai','jiangXi',
				'zheJiang','fuJian','taiWan','guangDong','xiangGai','aoMen','liaoNing','jiLin',
				'heiLongJiang','qingHai','siChuan','chongQian','yunNan','guiZhou', 'guangXi','haiNan'];
window.onload = function(){
	var content = getClassNames('content','map'),
		target = getClassNames('target','map'),
		scale = getClassNames('scale','map'),
		title4 = getClassNames('title4','map'),
		foot = getClassNames('content_foot','map'),
		menu = getClassNames('asistant icon-menu','map'),
		list = getClassNames('list', 'map'),
		font = getClassNames('font', 'map'),
		setfont = getClassNames('setFont','map'),
		fontfamily = getClassNames('import_text','map'),
		themes = getClassNames('themes','map'),
		setTheme = getClassNames('setTheme','map'),
		len = allPlaces.length;

		console.log(len);

	positions(len,allPlaces,content,scale,menu,list,target,foot,title4,font,setfont,themes,setTheme,'map');
	
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
	event = event || window;
	event.cancelBubble = true || event.stopPropagation() ;
}




// 定位编辑页面
// 所有对编辑页面的操作都在这执行
function positions(len,allPlaces,content,scale,menu,list,target,foot,title4,font,setfont,themes,setTheme,ancient){

	var place;
	for(var i=0; i<len; i++){
		place = getClassNames(allPlaces[i],ancient)[0];
		contentBtn = content[i].getElementsByTagName('button');
		//content[i].style.left = place.offsetWidth+'px';


		//各个功能实现 的函数都在这
		add(scale[i], content[i]);
		cancel(place, content[i], foot[i]);
		
		getList(menu[i], list[i]);
		getTarget(target[i], content[i]);
		change(title4[i]);				
		setFont(font[i],setfont[i]);
		changeTheme(themes[i],setTheme[i]);
	}		
}



//编辑页面显示退出
function cancel(place,content,foot){
	place.onclick = function(event){

		puple(event);
		var top = place.offsetTop,
			left = place.offsetLeft,
			width = place.offsetWidth,
			height = place.offsetHeight,
			scrollY = document.body.scrollTop || document.documentElement.scrollTop,
			scrollX = document.body.scrollLeft || document.documentElement.scrollLeft,
			x = event.clientX + scrollX,
			y = event.clientY + scrollY;
			
			//console.log('top：'+top+' left： '+left+' width：'+width+' height：'+height+' x：'+x+' y：'+y);

		if((x>left && x<width+left) && (y>top && y< height+top)){
			content.style.height = '400px';
		}
	}
		foot.onclick = function(event){
			puple(event);
			content.style.height = 0;
	}
}

//拖动增加减小页面大小
function add(scale,content){
	scale.onmousedown = function(event){
		puple(event);
		var x = event.clientX,
			y = event.clientY;
		document.onmousemove = function(event){
		    var width = content.offsetWidth,
				height = content.offsetHeight,
			    top = content.offsetTop,
				left = content.offsetLeft,
				addX = x-(width+left),
				addY = y-(height+top);
			x = event.clientX;
			y = event.clientY;
			content.style.width = width+addX + 'px';
			content.style.height = height+addY + 'px';

			}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	
	}
	
 }

// 点击菜单按钮获取设置信息
function getList(menu,list){
	menu.onclick = function(event){
		puple(event);
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
	var len = allPlaces.length;
	var texts;
	for(var i=0; i<34; i++){
		texts = document.getElementById('text'+i);
		texts.style.fontFamily = family.value;
	}
}

//选择字体大小
function changeSize(size){
	var len = allPlaces.length;

	var texts;
	for(var i=0; i<34; i++){
		texts = document.getElementById('text'+i);
		console.log(texts);
		texts.style.fontSize = size.value;
	}
}

//主题框
function changeTheme(themes,setTheme){
	themes.onclick = function(event){
		puple(event);
		if(setTheme.offsetLeft == 90){
			setTheme.style.left = -200 + 'px';
		}else{
			setTheme.style.left = 90 + 'px';
		}
	}
}


function runingTheme(color){
	var contentMenu = getClassNames('content_menu','map'),
		list = getClassNames('list','map'),
		yes = getClassNames('yes','map'),
		no = getClassNames('no','map'),
		setFont = getClassNames('setFont','map'),
		setTheme = getClassNames('setTheme','map'),
		item;
		
	for(var i=0, len = contentMenu.length; i<len; i++){

		contentMenu[i].style.background =color.value;
		yes[i].style.background =color.value;
		no[i].style.background =color.value;
		setFont[i].style.background =color.value;
		setTheme[i].style.background =color.value;

		item = list[i].getElementsByTagName('li');
		for(var j =0; j<item.length; j++){
			item[j].style.background = color.value;
		}
	}
	

}

