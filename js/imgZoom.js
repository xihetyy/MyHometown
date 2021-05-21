let step = 0.1;
let INNER = false;
function $a(select) {
    return document.querySelector(select);
}
// 鼠标相对页面的位置
function getMousePos(event) {
    let e = event || window.event;
    let scrollX =
        document.documentElement.scrollLeft || document.body.scrollLeft;
    let scrollY =
        document.documentElement.scrollTop || document.body.scrollTop;
    let x = e.pageX || e.clientX + scrollX;
    let y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { x: x, y: y };
}
function getElementPosition(select) {
    let dom = document.querySelector(select);
    let scrollX =
        document.documentElement.scrollLeft || document.body.scrollLeft;
    let scrollY =
        document.documentElement.scrollTop || document.body.scrollTop;
    let rect = dom.getBoundingClientRect();
    let x = scrollX + dom.getBoundingClientRect().left;
    let y = scrollY + dom.getBoundingClientRect().top;
    let height = dom.getBoundingClientRect().height;
    let width = dom.getBoundingClientRect().width;
    return { x: x, y: y, height: height, width: width };
}
function mouseIndom(event) {
    let mouseMsg = getMousePos(event);
    let domMsg = getElementPosition('#box');
    let flagX = mouseMsg.x > domMsg.x && mouseMsg.x < domMsg.x + domMsg.width;
    let flagY =
        mouseMsg.y > domMsg.y && mouseMsg.y < domMsg.y + domMsg.height;
    if (flagX && flagY) {
        // console.log('鼠标位于元素里面啦！');
        return true;
    } else {
        // console.log('鼠标位于元素外面拉！');
        return false;
    }
}
// 文档鼠标移动
document.onmousemove = function (event) {
    INNER = mouseIndom(event);
    // console.log(INNER);
};
if (window.addEventListener)
    //FF,火狐浏览器会识别该方法
    window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel; //W3C
//统一处理滚轮滚动事件
function wheel(event) {
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta; //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
    } else if (event.detail) {
        //FF浏览器使用的是detail,其值为“正负3”
        delta = -event.detail / 3;
    }
    if (delta) handle(delta, event);
}
//上下滚动时的具体处理函数
function handle(delta, event) {
    if (INNER) {
        if (delta < 0) {
            //向下滚动
            // console.log('向下滚动');
            let scale =
                Number.parseFloat($a('#box').style.transform.replace('scale(', '')) +
                step;
            $a('#box').style.webkitTransform = 'scale(' + scale + ')';
            $a('#box').innerText = '缩小了' + scale;
            var url = 'img/enlarge.png';
            $a('#box').style.cursor = 'url(' + url + '), default'
        } else {
            //向上滚动
            // console.log('向上滚动');
            let scale =
                Number.parseFloat($a('#box').style.transform.replace('scale(', '')) -
                step;
            $a('#box').style.webkitTransform = 'scale(' + scale + ')';
            $a('#box').innerText = '放大了' + scale;
            var url = 'img/narrow.png';
            $a('#box').style.cursor = 'url(' + url + '), default'
        }
        event.preventDefault();
        event.stopPropagation();
        return;
    }
}