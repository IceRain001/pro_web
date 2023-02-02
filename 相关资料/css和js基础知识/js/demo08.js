//window代表当前页面（相当于整个屏幕）   document代表网页显示的区域 location代表导航栏所在的区域
//window.onload=function(){} :表示当前页面加载完成之后调用一个匿名函数
//在此处为组件绑定事件，就不用在html中进行绑定；前者方式会使html代码更为清爽
window.onload=function(){
	updateZJ();
	//当页面加载完成，我们需要绑定各种事件
	//根据id获取到表格
	var fruitTbl =  document.getElementById("tbl_fruit");
	//获取表格中的所有的行
	var rows = fruitTbl.rows ;
	for(var i = 1 ; i<rows.length-1 ; i++){
		var tr = rows[i];
		//1.绑定鼠标悬浮以及离开时设置背景颜色事件
		//此处绑定时只使用方法名，若使用方法名（）则含义为调用此方法，并将返回值赋予变量
		tr.onmouseover=showBGColor;
		tr.onmouseout=clearBGColor;
		//获取tr这一行的所有单元格
		var cells = tr.cells;
		var priceTD = cells[1];
		//2.绑定鼠标悬浮在单价单元格变手势的事件
		priceTD.onmouseover = showHand ;
		//3.绑定鼠标点击单价单元格的事件
		priceTD.onclick=editPrice;
	}

}

//当鼠标点击单价单元格时进行价格编辑
function editPrice(){
	if(event && event.srcElement && event.srcElement.tagName=="TD"){
		var priceTD = event.srcElement ;
		//目的是判断当前priceTD有子节点，而且第一个子节点是文本节点 ， TextNode对应的是3  ElementNode对应的是1
		// 
		if(priceTD.firstChild && priceTD.firstChild.nodeType==3 ){
			//innerText 表示设置或者获取当前节点的内部文本 
			//第一次触发点击事件后，td中为input节点，无文本节点，此时innerText返回结果为空
			var oldPrice = priceTD.innerText ;
			//innerHTML 表示设置当前节点的内部HTML
			//js中单引号和双引号作用相同 此处只是因为最外层为双引号，所以在内部使用单引号的方法进行表示
			//此处含义为priceTD组件中出现一个input的文本框
			priceTD.innerHTML="<input type='text' size='4'/>";
			// <td><input type='text' size='4'/></td>
			//priceTD.firstChild ：获得priceTD组件的第一个孩子节点即input
			var input = priceTD.firstChild;
			if(input.tagName=="INPUT"){
				input.value = oldPrice ;
				//选中输入框内部的文本
				input.select();
				//4.绑定输入框失去焦点事件 , 失去焦点，更新单价
				input.onblur=updatePrice ;
			}
		}
		
	}
}

function updatePrice(){
	if(event && event.srcElement && event.srcElement.tagName=="INPUT"){
		var input = event.srcElement ;
		//此处需要将输入的价格赋给td的innerText属性，直接使用input.value会定格input输入框的存在（td和input是属于父子节点的关系）
		var newPrice = input.value ;
		//input节点的父节点是td
		var priceTD = input.parentElement ;
		//相当于将文本节点替换掉input节点
		priceTD.innerText = newPrice ;

		//更新当前行的小计这一个格子的值
		//priceTD.parentElement td的父元素是tr
		updateXJ(priceTD.parentElement);

	}
}

//更新指定行的小计
function updateXJ(tr){
	if(tr && tr.tagName=="TR"){
		var tds = tr.cells;
		var price = tds[1].innerText ;
		var count = tds[2].innerText ;
		//innerText获取到的值的类型是字符串类型，因此需要类型转换，才能进行数学运算
		//parseInt():
		var xj = parseInt(price) * parseInt(count);
		tds[3].innerText = xj ;

		//更新总计
		updateZJ();
	}

}

//更新总计
function updateZJ(){
	//window.document为完整写法，window.此处可省略
	var fruitTbl = document.getElementById("tbl_fruit");
	var rows = fruitTbl.rows ;
	var sum = 0 ;
	for(var i = 1; i<rows.length-1 ; i++){
		var tr = rows[i];
		var xj = parseInt(tr.cells[3].innerText);		//NaN    not a number 不是一个数字
		sum = sum + xj ;
	}
	rows[rows.length-1].cells[1].innerText = sum ;
}




//当鼠标悬浮时，显示背景颜色
function showBGColor(){
	//event : 当前发生的事件
	//event.srcElement : 事件源
	//alert(event.srcElement);
	//alert(event.srcElement.tagName);	--> TD
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
		tr.style.backgroundColor="transparent";
		var tds = tr.cells;
		for(var i = 0 ; i<tds.length ; i++){
			tds[i].style.color="threeddarkshadow";
		}
	}
}

//当鼠标悬浮在单价单元格时，显示手势
function showHand(){
	if(event && event.srcElement && event.srcElement.tagName=="TD"){
		var td = event.srcElement ;
		//cursor : 光标
		td.style.cursor="hand";
	}

}