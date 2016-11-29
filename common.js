// $sel 
// 选择元素

function $sel(str){

    return document.querySelector(str);
}

HTMLElement.prototype.sel = function (str){

    var el = this || document;
    return el.querySelector(str);
}

HTMLElement.prototype.selAll = function(str){

    var el = this || document;
    return el.querySelectorAll(str);
}
// DOM元素添加addClass removeClass方法
HTMLElement.prototype.addClass = function(str) {

    var el = this;
    // 判断是否支持classList
    if (el.classList) {
        str.split(" ").forEach(function(className) {

            el.classList.add(className);
        })
    } else {
        str.split(" ").forEach(function(className) {

            el.className += " " + className;
        })
    }

    return el;
};

HTMLElement.prototype.removeClass = function(str) {

    var el = this;
    if (el.classList) {
        str.split(" ").forEach(function(className) {

            // 判断是否存在
            if (el.classList.contains(className)) {

                el.classList.remove(className);
            }
        })
    } else {

        var cArr = el.className.split(" ");
        var sArr = str.split(" ");

        // 比较数组间相同值 如存在 则删除 j--
        for (var i = 0; i < sArr.length; i++) {

            for (var j = 0; j < cArr.length; j++) {

                if (arr2[i] === arr1[j]) {

                    arr1.splice(j, 1);
                    j--;
                }
            }
        }

        // 重新写值
        el.className = arr1.join(" ");
    }

    return el;
}