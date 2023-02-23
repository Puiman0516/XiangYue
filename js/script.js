//加载头部
$(document).ready(function () {
    $("header").load("/html/header.html");
    $.getScript("/js/header.js");
});

window.onload = function() {
    //取当前页面名称(带后缀名)
    function pageName() {
        var strUrl = location.href;
        var arrUrl = strUrl.split("/");
        var strPage = arrUrl[arrUrl.length - 1];
        return strPage;
    }
};