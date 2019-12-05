var in_div = false;
var body = document.getElementsByTagName("body")[0];
var g_bDisable = false;
var Options = null;
var last_frame = null;


body.addEventListener("mouseup", OnDictEvent, false);


//取消监听
function removeMouseUp() {
	console.log('取消监听')
	document.removeEventListener("mousedown", OnDictEventMouseDown);
}
  
//当鼠标指针移动到元素上方，并按下鼠标按键（左、右键均可）时，会发生 mousedown 事件。
//与 click 事件不同，mousedown 事件仅需要按键被按下，而不需要松开即可发生。
function OnDictEventMouseDown(e) {
	body.addEventListener("mousedown", OnDictEventMouseDown, false);
	window.pdfSelectTextRect = window.pdfSelectTextRect || {};
	window.pdfSelectTextRect.downX = e.clientX;
	window.pdfSelectTextRect.downY = e.clientY;
	window.pdfSelected = true;
}
//当在元素上松开鼠标按键（左、右键均可）时，会发生 mouseup 事件。
//与 click 事件不同，mouseup 事件仅需要松开按钮。当鼠标指针位于元素上方时，放松鼠标按钮就会触发该事件。		
function OnDictEvent(e) {
	/*read options*/
	chrome.extension.sendRequest({ init: "init" },
		function (response) {
			if (response.ColorOptions) {
				Options = JSON.parse(response.ColorOptions);
			}
		}
	);
	//获取划词
	var word = String(window.getSelection());
	word = word.replace(/^\s*/, "").replace(/\s*$/, "");
	if (word == "") return;
	if (word.length > 50) return;

	if (word != '') {
		xx = e.pageX, yy = e.pageY, sx = e.screenX, sy = e.screenY;
		//查词
		console.log(word,e.pageX,e.pageY,e.screenX,e.screenY)
		getAnswer(word, e.pageX, e.pageY, e.screenX, e.screenY);
		return;
	}
}

function showAnswer(data) {
	alert(data)
	removeMouseUp()
}
//向bg后台发送数据
function getAnswer(word, x, y, screenx, screeny) {
	console.log('getAnswer')
	chrome.extension.sendRequest({
		'action': 'dict',
		'word': word,
		'x': x,
		'y': y,
		'screenX': screenx,
		'screenY': screeny
	}, function (data) {
		showAnswer(data)
	});

}
