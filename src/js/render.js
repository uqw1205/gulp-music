(function($, root){
    function renderImg(src){
        var img = new Image();
        img.src = src;
        console.log(img);
        img.onload = function(){
            $(".song-img img").attr("src", src);
            root.blurImg(img, $("body"));
        }
    }
    root.render = function(data){
        console.log(data.image);
        renderImg(data.image);
    }
})(window.Zepto, window.player || (window.player = {}))