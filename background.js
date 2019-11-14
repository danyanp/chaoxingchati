//chrome.browserAction.setBadgeText( { text : enable ? '' : 'off' } );
// todo end
//接受消息的一方，需要启动一个chrome.extension.onRequest事件监听器用来处理消息
//chrome.extension.onRequest.addListener(onRequest)监听，一旦触发监听，执行函数onRequest
function onRequest(request, sender, callback) {
    console.log(request)
    if (request.action == 'dict') {
        mainQuery(request.word, callback);
    }
};

chrome.extension.onRequest.addListener(onRequest);

var _word;

function translateAnswer(xmlnode){
	//this.basetrans = JSON.parse(xmlnode).data.answer;
    //mainFrameQuery();
    console.log(JSON.parse(xmlnode).data.answer)
	return JSON.parse(xmlnode).data.answer;
}

function mainQuery(word,callback) {
        console.log(word)
		var url = 'https://api.chaoxing360.com/exam/search/question/token/d67b8ee7c02111e9a2990235d2b38928'
		var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(data) {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              var dataText = translateAnswer(xhr.responseText);
			  if(dataText != null)
              	callback(dataText);
            }
          }
        }
		_word = word;
		xhr.open('POST',url,true);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
		var type = 'text' 
		var timu = _word
        xhr.send('type='+type+'&question='+timu);
}