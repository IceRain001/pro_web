
//当鼠标悬浮时，显示背景颜色
function showBGColor(){
	//event : 当前发生的事件
	//event.srcElement : 事件源 --事件所在组件 
	//alert(event.srcElement);
	//alert(event.srcElement.tagName);	--> TD 事件的传递：虽然tr组件处绑定的事件，但当触发时是在tr中的td，因而事件源变为td
	if(event && event.srcElement && event.srcElement.tagName=="TD"){
		var td = event.srcElement ;
		//td.parentElement 表示获取td的父元素 -> TR
		var tr = td.parentElement ;
		//如果想要通过js代码设置某节点的样式，则需要加上 .style
		tr.style.backgroundColor = "navy" ;

		//tr.cells表示获取这个tr中的所有的单元格
		var tds = tr.cells;
		for(var i = 0 ; i<tds.length ; i++){
			tds[i].style.color="white";
		}
	}
}

//当鼠标离开时，恢复原始样式
function clearBGColor(){
	if(event && event.srcElement && event.srcElement.tagName=="TD"){
		var td = event.srcElement ;
		var tr = td.parentElement ;
		//transparent ：透明
		tr.style.backgroundColor="transparent";
		var tds = tr.cells;
		for(var i = 0 ; i<tds.length ; i++){
			//此处是将字体颜色恢复为原来的颜色
			tds[i].style.color="threeddarkshadow";
		}
	}
}

//当鼠标悬浮在单价单元格时，显示手势
function showHand(){
	if(event && event.srcElement && event.srcElement.tagName=="TD"){
		var td = event.srcElement ;
		//cursor : 光标 
		//hand 手势光标图案
		td.style.cursor="hand";
	}

}