/*! *****************************************************************************
Copyright (c) 2020-present, meeek

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy,modify, merge, publish, distribute,sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */


/**
 * 是否为有效移动电话号码
 * @param str
 * @return boolean
 */
const isMobilePhone = function (str) {
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
}

/**
 * 是否为有效邮箱地址
 * @param str
 * @return boolean
 */
const isEmail = function (str) {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
}

/**
 * 是否为有效网址
 * @param str
 * @return boolean
 */
const isURL = function (str) {
    return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
}

/**
 * 是否为有效邮编
 * @param str
 * @return boolean
 */
const isPostcode = function (str) {
    return /^[1-9]\d{5}$/.test(str);
}

/**
 * 是否为有效身份证号码
 * @param str
 * @return boolean
 */
const isIP = function (str) {
    return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
}

/**
 * 是否为有效身份证
 * @param str
 * @return boolean
 */
const isIDCard = function (sId) {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
        // 身份证长度非法
        return false
    }
    //身份证城市
    const aCity={
        11:"北京",
        12:"天津",
        13:"河北",
        14:"山西",
        15:"内蒙古",
        21:"辽宁",
        22:"吉林",
        23:"黑龙江",
        31:"上海",
        32:"江苏",
        33:"浙江",
        34:"安徽",
        35:"福建",
        36:"江西",
        37:"山东",
        41:"河南",
        42:"湖北",
        43:"湖南",
        44:"广东",
        45:"广西",
        46:"海南",
        50:"重庆",
        51:"四川",
        52:"贵州",
        53:"云南",
        54:"西藏",
        61:"陕西",
        62:"甘肃",
        63:"青海",
        64:"宁夏",
        65:"新疆",
        71:"台湾",
        81:"香港",
        82:"澳门",
        91:"国外"
    };
    if(!aCity[parseInt(sId.substr(0,2))]) {
        // 地区非法
        return false
    }

    // 出生日期验证
    const sBirthday=(sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2))).replace(/-/g,"/"),
        d = new Date(sBirthday)
    if(sBirthday != (d.getFullYear()+"/"+ (d.getMonth()+1) + "/" + d.getDate())) {
        // 出生日期非法
        return false
    }

    // 身份证号码校验
    var sum = 0,
        weights =  [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        codes = "10X98765432"
    for (var i = 0; i < sId.length - 1; i++) {
        sum += sId[i] * weights[i];
    }
    const last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (sId[sId.length-1] != last) {
        // 身份证号非法
        return false;
    }
    return true
}
