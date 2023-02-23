var pagename = ['', '无人生还','基督山伯爵'];

function bookName(i) {
    var strUrl = location.href;
    var arrUrl = strUrl.split("/");
    var strBook = arrUrl[i];
    return strBook;
}

var booknum = bookName(3).match(/\d+/g);
if (booknum.length > 0) {
    $('.pagename').html(pagename[parseInt(booknum[0]) - 1]);
    $(".pagename").attr("href",'/book' + booknum[0] + '/intro.html');
}