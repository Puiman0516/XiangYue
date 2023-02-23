//加载头部
$(document).ready(function () {
    if (siteName() != 'index.html') {
        $('header').load('../html/header.html')
        $.getScript('../js/header.js')
    } else {
        $('header').load('./html/header.html')
        $.getScript('./js/header.js')
    }
})

function siteName() {
    var strUrl = location.href
    var arrUrl = strUrl.split('/')
    var str = arrUrl[arrUrl.length - 1]
    return str
}
