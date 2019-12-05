function jsonpCallback(content){ 
  alert(content);
 } 
$(document).ready(function(){
$("#answer").click(function(){
    $("p").hide();
});
$("button").click(function(){
    var timu = $("input[name='timu']").val()
    if(timu==''){
        alert('请输入题目')
    }else{
      // $.ajax({ 
      //   type: "post",
      //   async: false, 
      //   url: "http://wx.quanon.cn/query.php", 
      //   dataType: "jsonp",
      //   jsonp:"callback",
      //   data:{'token':'390e629fdb757853ebfa8aca6344ab7b','question':'1'}, 
      //  success: function (data) { 
      //     alert(data);
      //    }, 
      //  error: function () { 
      //     alert('fail');
      //   } 
      //   }); 

        // $.ajax({
        //   url: 'http://wx.quanon.cn/query.php',
        //   type: 'post',
        //   data: { 'token':'390e629fdb757853ebfa8aca6344ab7b','question':'1' },
        //   xhrFields: {
        //       withCredentials: true    // 前端设置是否带cookie
        //   },
        //   crossDomain: true,   // 会让请求头中包含跨域的额外信息，但不会含cookie
        // });

         $.post("http://wx.quanon.cn/query.php",
        {
          'token':'390e629fdb757853ebfa8aca6344ab7b',
          'question':timu 
        },
        function(data,status){
            $("p").after(JSON.parse(data).answer);
            $("#answer").click(function(){
                 $("div").show();
            });
        });   
    }
  })
});

