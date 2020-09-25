const verify = {
    isIP: function(strIP) {
        if (isNull(strIP)) return false;
        const re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
        if(re.test(strIP)) {
            if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true;
        }
        return false;
    }
}
export default verify;

/**用途：校验ip地址的格式

 输入：strIP：ip地址
 返回：如果通过验证返回true,否则返回false；
 **/

function isIP
/*
用途：检查输入字符串是否为空或者全部都是空格
输入：str
返回：
如果全是空返回true,否则返回false
*/
function isNull( str ){
    if ( str == "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}

/*
用途：检查输入对象的值是否符合整数格式
输入：str 输入的字符串
返回：如果通过验证返回true,否则返回false
*/
function isInteger( str ){
    var regu = /^[-]{0,1}[0-9]{1,}$/;
    return regu.test(str);
}


/*
用途：检查输入字符串是否符合正整数格式
输入：
s：字符串
返回：
如果通过验证返回true,否则返回false
*/
function isNumber( s ){
    var regu = "^[0-9]+$";
    var re = new RegExp(regu);
    if (s.search(re) != -1) {
        return true;
    } else {
        return false;
    }
}
/*
用途：检查输入字符串是否是带小数的数字格式,可以是负数
输入：
s：字符串
返回：
如果通过验证返回true,否则返回false
*/
function isDecimal( str ){
    if(isInteger(str)) return true;
    var re = /^[-]{0,1}(\d+)[\.]+(\d+)$/;
    if (re.test(str)) {
        if(RegExp.$1==0&&RegExp.$2==0) return false;
        return true;
    } else {
        return false;
    }
}
/*
用途：检查输入对象的值是否符合端口号格式
输入：str 输入的字符串
返回：如果通过验证返回true,否则返回false
*/
function isPort( str ){
    return (isNumber(str) && str<65536);
}
/*
用途：检查输入对象的值是否符合E-Mail格式
输入：str 输入的字符串
返回：如果通过验证返回true,否则返回false
*/
function isEmail( str ){
    var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    if(myReg.test(str)) return true;
    return false;
}
/*
用途：检查输入字符串是否符合金额格式
格式定义为带小数的正数，小数点后最多三位
输入：
s：字符串
返回：
如果通过验证返回true,否则返回false
*/
function isMoney( s ){
    var regu = "^[0-9]+[\.][0-9]{0,3}$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}
/*
用途：检查输入字符串是否只由英文字母和数字和下划线组成
输入：
s：字符串
返回：
如果通过验证返回true,否则返回false
*/
function isNumberOr_Letter( s ){//判断是否是数字或字母
    var regu = "^[0-9a-zA-Z\_]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    }else{
        return false;
    }
}
/*
用途：检查输入字符串是否只由英文字母和数字组成
输入：
s：字符串
返回：
如果通过验证返回true,否则返回false
*/
function isNumberOrLetter( s ){//判断是否是数字或字母
    var regu = "^[0-9a-zA-Z]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    }else{
        return false;
    }
}
/*
用途：检查输入字符串是否只由汉字、字母、数字组成
输入：
value：字符串
返回：
如果通过验证返回true,否则返回false
*/
function isChinaOrNumbOrLett( s ){//判断是否是汉字、字母、数字组成
    var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    }else{
        return false;
    }
}
/*
用途：判断是否是日期
输入：date：日期；fmt：日期格式
返回：如果通过验证返回true,否则返回false
*/
function isDate( date, fmt ) {
    if (fmt==null) fmt="yyyyMMdd";
    var yIndex = fmt.indexOf("yyyy");
    if(yIndex==-1) return false;
    var year = date.substring(yIndex,yIndex+4);
    var mIndex = fmt.indexOf("MM");
    if(mIndex==-1) return false;
    var month = date.substring(mIndex,mIndex+2);
    var dIndex = fmt.indexOf("dd");
    if(dIndex==-1) return false;
    var day = date.substring(dIndex,dIndex+2);
    if(!isNumber(year)||year>"2100" || year< "1900") return false;
    if(!isNumber(month)||month>"12" || month< "01") return false;
    if(day>getMaxDay(year,month) || day< "01") return false;
    return true;
}

function getMaxDay(year,month) {
    if(month==4||month==6||month==9||month==11)
        return "30";
    if(month==2)
        if(year%4==0&&year%100!=0 || year%400==0)
            return "29";
        else
            return "28";
    return "31";
}
