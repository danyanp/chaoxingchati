# 超星查题
### 关注我们
 ![南泰校园](https://github.com/danyanp/chaoxingchati/blob/master/qrcode.jpg?raw=true)
## 超星划题查题
- 划题选中题目
- 后台获取题目，查询
- 返回题目答案
- # manifest.json文件
```
{
    //插件标题
	"name" : "超星查题" ,
    //插件描述
	"description" : "支持超星题目查找" ,
	"manifest_version" : 2 ,
	"version" : "1.0.0" ,
	"author": "@单眼皮_905986631",
    //图标
	"icons":
	{
		"48": "icon.png",
		"128": "icon.png"
	},
    //需要权限
	"permissions" : [
		"<all_urls>" ,
		"contextMenus" ,
		"storage" ,
		"clipboardWrite" ,
		"clipboardRead" ,
		"activeTab" ,
		"identity",
		"webRequest",
		"webRequestBlocking"
	  ] ,
    //插件后端，一直运行的js
	"background" : {
		"scripts" : ["background.js"]
	} ,
    //菜单栏上的图标和功能
	"browser_action": 
	{
		"default_icon": "icon.png",
		"default_popup": "popup.html"
	},
    //使用到的js
	"content_scripts": 
	[
		{
			"all_frames": true,
			"js": ["Scribing.js","jQuery.js","popup.js"],
			"matches": ["<all_urls>"],
			"match_about_blank": true,
			"run_at": "document_end"
		}
	]
}
```
- # popup.html文件

- # popuup.js

- # background.js

- # Scribing.js


