
var root = window.player;
var $ = window.Zepto;

function getData(url){
    $.ajax({
        url: url,
        type: "GET",
        success: function(data){
            root.render(data[0])
        },
        error: function(){
            alert("数据请求失败")
        }
    })
}
getData("../mock/data.json")
