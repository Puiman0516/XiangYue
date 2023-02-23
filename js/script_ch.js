var show = true;
var scrollTop = 0;
var notes = 0;

function bookName() {
    var strUrl = location.href
    var arrUrl = strUrl.split('/')
    var strBook = arrUrl[arrUrl.length - 2]
    return strBook
}

var book = bookName()

//每个item所显示的资讯
var item = {
  'book2': {
    '劳伦斯·约翰·沃格雷夫': '最终审判者，第六个死亡，实为假死，曾公报私仇，害死爱德华·塞顿，最终自杀',
    '泰晤士报': '英国的一份于全国发行的综合型日报，是一张对全球政治、经济、文化发挥巨大影响力的报纸',
    '萨默塞特': '英国伦敦市中心的一幢大型建筑，位于河岸街的南侧，俯瞰泰晤士河，西邻滑铁卢桥',
    '德文郡': '英国英格兰西南部的一个郡，以人口计算，普利茅斯是第一大城市、自治市镇（Borough），艾希特是第二大城市（亦是郡治），托贝是第二大自治市镇，托基是第一大镇（Town），佩恩顿是第二大镇'
  },
  'book3': {
    '伊夫堡': '位于法国马赛港海域伊夫岛上的城堡，因为是大仲马著名小说《基督山伯爵》中的场景而闻名于世。1926年被法国政府指定为法兰西历史纪念物',
    '法老号': '一艘木质法老船，位于大开罗地区吉萨省古埃及陵墓群，经鉴定为古埃及第一王朝（公元前3100年—公元前2820年）法老德闻所有，距今已有5000多年历史。',
    '主桅帆': '帆船上的主要装置附件之一。帆船主要靠帆来受风航行，而帆又必须依附于桅杆上才能扬帆远航。',
    '大三角帆': '一种专门设计用于将风从到达航向顺风航行的风帆，即在船首偏航90-180°的情况下',
    '爱德蒙·唐太斯':'一位智慧、诚实而且富有爱心的男子，后来受人诬陷而无辜被关押入狱十四年，变得痛苦而报复性强。'
  }
    
}; // 定义一个字典

window.onload = function () {
    //============================header部分============================
    //控制header的显示
    //滑动到一定位置后隱藏
    $(window).scroll(function () {
        //在window的滚动回调方法中，我们处理具体逻辑
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        /* 以上代码获取滚动后，离顶端距离，这里使用两个值是为了兼容不同浏览器及其不同doctype定义 */

        if (scrollTop > 80) {
            /*当滚动超过80px*/
            $('header').css('top', '-50px');
        } else {
            $('header').css('top', '0px');
        }

    });

    //鼠标位于顶部时显示
    $(document).mousemove(function (event) {
        if (scrollTop > 80) {
            var e = event || window.event;
            // console.log({'x':e.clientX,'y':e.clientY});
            if (e.clientY <= 56) {
                $('header').css('top', '0px');
            } else {
                $('header').css('top', '-50px');
            }
        }
    });


    //============================兩侧部分============================
    //按下menu事件
    $('.button-func').click(function () {
        //如果兩侧没显示
        if (show == false) {
            $('.layout1').css('transform', 'translateX(0%)');
            $('.layout2').css('transform', 'translateX(0%)');
            // $('.reader-main').css('width', '50%');
            // $('.layout1').css('width', '25%');
            // $('.layout2').css('width', '25%');

            show = true;
        }
        //如果兩侧已显示
        else {
            $('.layout1').css('transform', 'translateX(100%)');
            $('.layout2').css('transform', 'translateX(-100%)');
            // $('.reader-main').css('width', '60%');
            // $('.layout1').css('width', '20%');
            // $('.layout2').css('width', '20%');

            show = false;
        }
    });



    //============================弹幕部分============================

    //2种生成弹幕方法, 1是使用left定位元素, 2是使用right定位元素
    //这样做的话在窗口縮放时, 右边的弹幕能向右移, 左边的则能向左移
    function creat1(i, left, top) {
        $('.canvas').append('<div contenteditable="true" oninput="changeInput(event)" onblur="deleteEmpty(event)" class="note note_l note' + i + '"' + '></div>');
        $('.note' + i).css('left', left);
        $('.note' + i).css('top', top);

        //create完后直接进入編輯
        $('.note' + i).show().focus();
    }

    function creat2(i, right, top) {
        $('.canvas').append('<div contenteditable="true" oninput="changeInput(event)" onblur="deleteEmpty(event)" class="note note_r note' + i + '"' + '></div>');
        $('.note' + i).css('right', right);
        $('.note' + i).css('top', top);

        //create完后直接进入編輯
        $('.note' + i).show().focus();
    }


    // $(".note").on("click", function () {
    //     console.log($(this));
    //     // $(this).attr("contenteditable", "false");
    //     // $(event.target).css('transform','translateX(-' + $(event.target).width - 26 + 'px)')
    // });


    //按下閱讀部分的事件
    $('.barrage').on("dblclick", function (event) {
        console.log($(event.target));
        notes += 1;

        //獲取鼠标相对閱讀框的位置
        var e = event || window.event;
        var x = e.clientX - $('.layout1').width() - 50;
        var y = e.clientY - 80 + scrollTop;

        //獲取弹幕框寬度
        var width = $('.barrage').width();

        //如果鼠标位于閱讀框的右半部分
        if (x > width / 2 - 30) {
            //用right來給元素定位
            x = width - x;
            creat2(notes, x + 55, y);
        } else {
            creat1(notes, x, y);
        }
    });



    //============================item部分============================
    $(".item-content-name").mouseover(function (event) {
        $("body").append('<div class="showbox">' + item[book][$(event.target).html()] + '</div>');
    });

    $(".item-content-name").mousemove(function (event) {
        var e = event || window.event;
        var x = e.clientX;
        var y = e.clientY;
        $('.showbox').css('top', y + 10);
        $('.showbox').css('left', x + 10);
    });

    $(".item-content-name").mouseout(function () {
        $('.showbox').remove();
    });


    $(".item-touch").mouseover(function (event) {
        eid = $(event.target).attr('id');
        $('.waterfall').animate({
                scrollTop: $("#" + eid + '-item').offset().top - 85 + $('.waterfall').scrollTop() - document.documentElement.scrollTop
            },
            'swing');
        $("#" + eid + '-item').css('box-shadow', '0 0 6px 0 rgba(0, 0, 0, 0.5)');
    });

    $(".item-touch").mouseout(function (event) {
        eid = $(event.target).attr('id');
        $("#" + eid + '-item').css('box-shadow', 'none');
    });

}

function changeInput(e) {
    //獲取点击的对象
    var target = '.' + e.target.className.split(' ')[2];
    //獲除对象的class (note_l or note_r), 用以判斷弹幕向左移还是向右移
    var lr = e.target.className.split(' ')[1];

    //獲取对象transform值, 用以判断弹幕是否到达边缘
    var translateX = parseInt($(target).css('transform').split(', ')[4]);

    if (lr == 'note_l') {
        var x = parseInt($(target).css('left'));
        if (x >= -translateX) {
            $(target).css('transform', 'translate(-' + $(target).width() / 2 + 'px, -' + $(target).height() / 2 + 'px)');
        }
    } else {
        var x = parseInt($(target).css('right'));
        if (x >= translateX) {
            $(target).css('transform', 'translate(' + $(target).width() / 2 + 'px, -' + $(target).height() / 2 + 'px)');
        }
    }
    console.log($(target).html());
}

//弹幕輸入完毕函数
function deleteEmpty(e) {
    var target = '.' + e.target.className.split(' ')[2];
    //輸入完毕后不可再輸入
    $(target).css('-webkit-user-modify', 'read-only');

    //判斷是否刪除
    var src = $(target).html().replace('<br>', ''); //清除<br>
    src = src.replace(/(\n|\r|\r\n|↵)/g, ''); //清除換行符
    src = src.replace(/\s*/g, ''); //清除空格

    //如果弹幕只有空格、換行符、<br>, 则刪除弹幕
    if (src == '') {
        $(target).remove();
    }
}