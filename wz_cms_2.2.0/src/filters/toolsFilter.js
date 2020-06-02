import Vue from 'vue';
Vue.filter("ftToFixed", function(str, num) {
    if (str == null) {
        return '0.00';
    }
    if (num == null) {
        num = 2;
    }
    return parseFloat(str).toFixed(num);
});
Vue.filter("moneyFormat", function(str, num) {
    if (str == null || isNaN(str)) {
        return '0.00';
    }
    if (num == null) {
        num = 2;
    }
    return parseFloat(str).toFixed(num);
});
// 移除小数点后面多余的0
Vue.filter("ftRemoveZero", function(num) {
    if (num == null) {
        return '0';
    }
    return parseFloat(num);
});

// 根据value从list中获取对应的label
Vue.filter("getLabelByValue", function(value,list) {
    var label = '';
    list.forEach(function(element) {
        if (String(element.value) == String(value)) {
            label = element.label;
        }
    }, this);
    return label;
});

//超过特定字符数量追加...
Vue.filter("cutWord", function(oldText, count) {
    if (oldText.length > count) {
        var newText = oldText.substring(0, count) + "...";
        return newText;
    }
    return oldText;
});
//html把回车转换成html
Vue.filter("enter2Br", function(string = '') {
    string = string.replace(/\r\n/g, "<br>")
    string = string.replace(/\n/g, "<br>");
    return string;
});
