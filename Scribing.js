var in_div = false;
var body =  document.getElementsByTagName("body")[0];
var g_bDisable = false;
var Options = null;
var last_frame = null;

function isPDF() {
	console.log('isPDF')
	var plugin = document.getElementById('plugin');
		if (!plugin)
			return false;
		if (plugin.tagName.toLowerCase() != 'embed')
			return false;
		if (plugin.type.toLowerCase() != 'application/pdf')
			return false;
		return true;
	}
body.addEventListener("mouseup",OnDictEvent, false);
body.addEventListener("mousedown",OnDictEventMouseDown, false);
body.addEventListener("touchend",OnDictEvent, false);
body.addEventListener("touchstart",OnDictEventMouseDown, false);


function onScrTrans(event){
		if(!optVal("ctrl_only"))
		{
		  return;
		}
		if (!event.ctrlKey){
			return true;
		}
	
		var r = document.caretRangeFromPoint(event.clientX, event.clientY);
		if (!r) return true;
	
		pX = event.pageX;
		pY = event.pageY;
		var so = r.startOffset, eo = r.endOffset;
		if (prevC === r.startContainer && prevO === so) return true
	
		prevC = r.startContainer;
		prevO = so;
		var tr = r.cloneRange(), text='';
		if (r.startContainer.data) while (so >= 1){
			tr.setStart(r.startContainer, --so);
			text = tr.toString();
			if (!isAlpha(text.charAt(0))){
				tr.setStart(r.startContainer, so + 1);
				break;
			}
		}
		if (r.endContainer.data) while (eo < r.endContainer.data.length){
			tr.setEnd(r.endContainer, ++eo);
			text = tr.toString();
			if (!isAlpha(text.charAt(text.length - 1))){
				tr.setEnd(r.endContainer, eo - 1);
				break;
			}
		}
	
		var word = tr.toString();
	
		if (prevWord == word  ) return true;
	
		prevWord = word;
	
	
		if (word.length >= 1){
	
			timer = setTimeout(function(){
			scr_flag = true;
			var s = window.getSelection();
			s.removeAllRanges();
			s.addRange(tr);
			xx = event.pageX,yy = event.pageY, sx = event.screenX, sy = event.screenY;
				console.log('前台的数据'+word)
					getAnswer(word,event.pageX,event.pageY,event.screenX,event.screenY);
	
			  }, 100);
		}
	}
	
document.addEventListener('mousemove', onScrTrans, true);
	
function optVal(strKey)
	{
		if (Options !== null)
		{
			if (Options[strKey] && Options[strKey].length > 1)
			  return Options[strKey][1];
		}
	}

function OnDictEventMouseDown(e) {
			console.log('OnDictEventMouseDown')
			window.pdfSelectTextRect = window.pdfSelectTextRect || {};
			window.pdfSelectTextRect.downX = e.clientX;
			window.pdfSelectTextRect.downY = e.clientY;
			window.pdfSelected = true;
	}
		
function OnDictEvent(e) {
		console.log('OnDictEvent')
		if (isPDF() && pdfSelected) {
		  console.log('isPDF')
		  var plugin = document.getElementById('plugin');
		  plugin.postMessage({'type': 'getSelectedText'});
		  window.pdfSelectTextRect = window.pdfSelectTextRect || {};
		  window.pdfSelectTextRect.upX = e.clientX;
		  window.pdfSelectTextRect.upY = e.clientY;
		  window.pdfSelected = false;
		  return;
		}
	  
		/*read options*/
		chrome.extension.sendRequest(
			  {
				  init: "init"
			  },
			  function(response)
			  {
				  if (response.ColorOptions)
				  {
					  Options = JSON.parse(response.ColorOptions);
				  }
			  }
		);
		if(in_div) return;
		OnCheckCloseWindow();
	  
		if(optVal("dict_disable"))
		  return;
		if(!optVal("ctrl_only") && e.ctrlKey)
		  return;
		if(optVal("ctrl_only") && !e.ctrlKey)
		  return;
		if(g_bDisable)
		  return;
		
		//获取划词
		var word = String(window.getSelection());
		word = word.replace(/^\s*/, "").replace(/\s*$/, "");
		if (window.pdfSelectText) {
		  word = window.pdfSelectText;
		}
	  
		if(word=="") return;
	  
		if ( (optVal("english_only") && isContainJapanese(word)) ||
			 (optVal("english_only") && isContainKoera(word))  ||
			 (optVal("english_only") && isContainChinese(word))
			 )
			return ;
	  
	  
		if(word.length > 2000)
			return;
			if (word != '') {
				OnCheckCloseWindowForce();
				xx = e.pageX,yy = e.pageY, sx = e.screenX, sy = e.screenY;
			  if (isPDF()) {
				xx = window.pdfSelectTextRect.upX;
				yy = window.pdfSelectTextRect.upY;
			  }
			//查词
			console.log(word)
			getAnswer(word,e.pageX,e.pageY,e.screenX,e.screenY);
			  return;
			}
	}

function OnCheckCloseWindow() {
			console.log('OnCheckCloseWindow')
			 isDrag =false;
			 if(in_div) return;
			 if (last_frame != null) {
				var cur = Math.round(new Date().getTime());
			  if (cur - last_time < 500 ) {
				  return;
			  }
			  while (list.length != 0) {
				  body.removeChild(list.pop());
			  }
			  last_frame = null;
			  last_div = null;
			  return true;
			}
			return false
	}

function OnCheckCloseWindowForce() {
			console.log('OnCheckCloseWindowForce')
			in_div = false;
			if (last_frame != null) {
				var cur = Math.round(new Date().getTime());
		  
			  while(list.length !=0)
				  body.removeChild(list.pop());
		  
			  last_frame = null;
			  last_div = null;
		  
			  return true;
			}
			return false
	}

function showAnswer(data){
	alert(data)
}

//向bg发送数据
function getAnswer(word,x,y,screenx,screeny){
  console.log('getAnswer')
	// chrome.extension.sendRequest({'action' : 'dict' , 'word': word , 'x' : x, 'y':y , 'screenX' : screenx, 'screenY': screeny}, onText);
    // todo start
    chrome.extension.sendRequest({
        'action': 'dict',
        'word': word,
        'x': x,
        'y': y,
        'screenX': screenx,
        'screenY': screeny
	}, function (data) {
		console.log(data)
		showAnswer(data)
        // onText(data);
        // if (optVal("autoaddword")) {
        //     //这样写,能保证成功就是成功,数据一致,但有dom操作
        //     //也可以,直接拼好带成功提示的弹窗的自符串,直接显示.
        //     chrome.runtime.sendMessage({
        //         action: "addword",
        //         data: word
        //     }, function (response) {
        //         var btn = document.getElementById("btnaddword")
        //         btn != null && (btn.innerText = "Add Success");
        //     });
        // }
    });
    // todo end

}
