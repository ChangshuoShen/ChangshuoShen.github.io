//弹窗样式
iziToast.settings({
    timeout: 10000,
    progressBar: false,
    close: false,
    closeOnEscape: true,
    position: 'topCenter',
    transitionIn: 'bounceInDown',
    transitionOut: 'flipOutX',
    displayMode: 'replace',
    layout: '1',
    backgroundColor: '#00000040',
    titleColor: '#efefef',
    messageColor: '#efefef',
    icon: 'Fontawesome',
    iconColor: '#efefef',
});

/* 鼠标样式 */
const body = document.querySelector("body");
const element = document.getElementById("g-pointer-1");
const element2 = document.getElementById("g-pointer-2");
const halfAlementWidth = element.offsetWidth / 2;
const halfAlementWidth2 = element2.offsetWidth / 2;

function setPosition(x, y) {
    element2.style.transform = `translate(${x - halfAlementWidth2 + 1}px, ${y - halfAlementWidth2 + 1}px)`;
}

body.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(function () {
        setPosition(e.clientX, e.clientY);
    });
});

//加载完成后执行
window.addEventListener('load', function () {

    //载入动画
    $('#loading-box').attr('class', 'loaded');
    $('#bg').css("cssText", "transform: scale(1);filter: blur(0px);transition: ease 1.5s;");
    $('.cover').css("cssText", "opacity: 1;transition: ease 1.5s;");
    $('#section').css("cssText", "transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important");

    now = new Date(), hour = now.getHours()
    if (hour < 6) {
        var hello = "Good Early Morning";
    } else if (hour < 12) {
        var hello = "Good Morning";
    } else if (hour < 17) {
        var hello = "Good Afternoon";
    } else if (hour < 22) {
        var hello = "Good Evening";
    } else {
        var hello = "Good Night";
    }
    hello += ", Welcone To Stephen Shenc's Homepage"

    //用户欢迎
    setTimeout(function () {
        iziToast.show({
            timeout: 2500,
            icon: false,
            title: hello
        });
    }, 800);

    //移动端去除鼠标样式
    if (Boolean(window.navigator.userAgent.match(/AppWebKit.*Mobile.*/))) 
        {
        $('#g-pointer-2').css("display", "none");
        }
}, false)

setTimeout(function () {
    $('#loading-text').html("It may take much time")
}, 3000);

//获取一言
fetch('https://v1.hitokoto.cn?max_length=24')
    .then(response => response.json())
    .then(data => {
        $('#hitokoto_text').html(data.hitokoto)
        $('#from_text').html(data.from)
    })
    .catch(console.error)

let times = 0;
$('#hitokoto').click(function () {
    if (times == 0) {
        times = 1;
        let index = setInterval(function () {
            times--;
            if (times == 0) {
                clearInterval(index);
            }
        }, 1000);
        fetch('https://v1.hitokoto.cn?max_length=24')
            .then(response => response.json())
            .then(data => {
                $('#hitokoto_text').html(data.hitokoto)
                $('#from_text').html(data.from)
            })
            .catch(console.error)
    } else {
        iziToast.show({
            timeout: 1000,
            icon: "fa-solid fa-circle-exclamation",
            message: "Don't click that fast~"
        });
    }
});

//获取时间
let t = null;
t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    let y = dt.getYear() + 1900;
    let mm = dt.getMonth() + 1;
    let d = dt.getDate();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = dt.getDay();
    let h = dt.getHours();
    let m = dt.getMinutes();
    let s = dt.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    $("#time").html(y + "&nbsp;/&nbsp;" + mm + "&nbsp;/&nbsp;" + d + "&nbsp;/&nbsp;" + "<span class='weekday'>" + weekday[day] + "</span><br>" + "<span class='time-text'>" + h + ":" + m + ":" + s + "</span>");
    t = setTimeout(time, 1000);
}

//链接提示文字
$("#social").mouseover(function () {
    $("#social").css({
        "background": "rgb(0 0 0 / 25%)",
        'border-radius': '6px',
        "backdrop-filter": "blur(5px)"
    });
    $("#link-text").css({
        "display": "block",
    });
}).mouseout(function () {
    $("#social").css({
        "background": "none",
        "border-radius": "6px",
        "backdrop-filter": "none"
    });
    $("#link-text").css({
        "display": "none"
    });
});

$("#github").mouseover(function () {
    $("#link-text").html("My Github");
}).mouseout(function () {
    $("#link-text").html("Contact Me");
});
$("#tel").mouseover(function () {
    $("#link-text").html("Call Me");
}).mouseout(function () {
    $("#link-text").html("Contact Me");
});
$("#email").mouseover(function () {
    $("#link-text").html("Email Me");
}).mouseout(function () {
    $("#link-text").html("Contact Me");
});
$("#bilibili").mouseover(function () {
    $("#link-text").html("Bilibili ~");
}).mouseout(function () {
    $("#link-text").html("Contact Me");
});


let showMore = false;
target = '';
var targetId = '';
// 更多页面切换
$('.link-card').on('click', function () {
    target = $(this).data('target');
    targetId = '#' + target;
    showMore = !showMore;
    console.log(targetId)
    if (showMore && $(document).width() >= 990) {
        $('#container').attr('class', 'container mores');
        $(targetId).attr('class', 'shown_more');
        iziToast.show({
            timeout: 1000,
            message: target + ' has been opened'
        });
    } else {
        $('#container').attr('class', 'container');
        $(targetId).attr('class', 'hidden_more');
        iziToast.show({
            timeout: 1000,
            message: target + ' has been closed'
        });
    }
});

// 更多页面关闭按钮
$(document).on('click', '.close', function () {
    $('#container').attr('class', 'container');
    $(targetId).attr('class', 'hidden_more');
    showMore = false;
    iziToast.show({
        timeout: 1000,
        message: target + ' has been closed'
    });
});

// 更多页面显示关闭按钮
$(document).on('mouseenter', '.shown_more', function () {
    $(this).find('.close').css('display', 'block');
});

$(document).on('mouseleave', '.shown_more', function () {
    $(this).find('.close').css('display', 'none');
});


//移动端菜单栏切换
let switchmenu = false;
$('#switchmenu').on('click', function () {
    switchmenu = !switchmenu;
    if (switchmenu) {
        $('#row').attr('class', 'row menus');
        $("#menu").html("<i class='fa-solid fa-xmark'></i>");
    } else {
        $('#row').attr('class', 'row');
        $("#menu").html("<i class='fa-solid fa-bars'></i>");
    }
});

//监听网页宽度
window.addEventListener('load', function () {
    window.addEventListener('resize', function () {
        //关闭移动端样式
        if (window.innerWidth >= 600) {
            $('#row').attr('class', 'row');
            $("#menu").html("<i class='fa-solid fa-bars'></i>");
            //移除移动端切换功能区
            $('#rightone').attr('class', 'row rightone');
        }

        if (window.innerWidth <= 990) {
            //移动端隐藏更多页面
            $('#container').attr('class', 'container');
            $("#change").html("Hello&nbsp;World&nbsp;!");
            $("#change1").html("One More Point, Make \"Impossible\" \"I\'m Possible\"");
            $(targetId).attr('class', 'hidden_more');
            //移动端隐藏弹窗页面
            $('#box').css("display", "none");
            $('#row').css("display", "flex");
            $('#more').css("display", "flex");
        }
    })
})

//移动端切换功能区
let changemore = false;
$('#changemore').on('click', function () {
    changemore = !changemore;
    if (changemore) {
        $('#rightone').attr('class', 'row menus mobile');
    } else {
        $('#rightone').attr('class', 'row menus');
    }
});


//屏蔽右键
document.oncontextmenu = function () {
    iziToast.show({
        timeout: 2000,
        icon: "fa-solid fa-circle-exclamation",
        message: 'For better browsing experience, right-click is disabled'
    });
    return false;
}