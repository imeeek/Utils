/*! *****************************************************************************
Copyright (c) 2020-present, meeek

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use,copy,modify, merge, publish, distribute,sublicense, and/or sell copies
of theSoftware, and to permit persons to whom the Software is furnished
to do so,subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHTHOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTIONOF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THESOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
***************************************************************************** */

// 城市代码
const cityCode = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
}

// 每位加权因子
const weightingFactor = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']

// 第18位校检码
const verifyCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

// 性别
const genders = { male: '男', female: '女' }

// 校验地址码
function checkAddressCode (addressCode) {
    const check = /^[1-9]\d{5}$/.test(addressCode)
    if (!check) return false
    if (cityCode[parseInt(addressCode.substring(0, 2))]) {
        return true
    } else {
        return false
    }
}

// 校验日期码
function checkBirthDayCode (birDayCode) {
    const check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode)
    if (!check) return false
    const yyyy = parseInt(birDayCode.substring(0, 4), 10)
    const mm = parseInt(birDayCode.substring(4, 6), 10)
    const dd = parseInt(birDayCode.substring(6), 10)
    const xData = new Date(yyyy, mm - 1, dd)
    if (xData > new Date()) {
        // 生日不能大于当前日期
        return false
    } else if ((xData.getFullYear() == yyyy) && (xData.getMonth() == mm - 1) && (xData.getDate() == dd)) {
        return true
    } else {
        return false
    }
}

// 计算校检码
function getVerifyCode (idCardNo) {
    const id17 = idCardNo.substring(0, 17)
    // 加权
    let power = 0
    for (let i = 0; i < 17; i++) {
        power += parseInt(id17.charAt(i), 10) * parseInt(weightingFactor[i])
    }
    // 取模
    const mod = power % 11
    return verifyCode[mod]
}

// 验证校检码
function checkVerifyCode (idCardNo) {
    const verifyCode = idCardNo.charAt(17).toUpperCase()
    if (getVerifyCode(idCardNo) == verifyCode) {
        return true
    } else {
        return false
    }
}

// 校验15位的身份证号码
function check15IdCardNo (idCardNo) {
    // 15位身份证号码的基本校验
    let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo)
    if (!check) return false
    // 校验地址码
    const addressCode = idCardNo.substring(0, 6)
    check = checkAddressCode(addressCode)
    if (!check) return false
    const birDayCode = '19' + idCardNo.substring(6, 12)
    // 校验日期码
    return checkBirthDayCode(birDayCode)
}

// 校验18位的身份证号码
function check18IdCardNo (idCardNo) {
    // 18位身份证号码的基本格式校验
    let check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo)
    if (!check) return false
    // 校验地址码
    const addressCode = idCardNo.substring(0, 6)
    check = checkAddressCode(addressCode)
    if (!check) return false
    // 校验日期码
    const birDayCode = idCardNo.substring(6, 14)
    check = checkBirthDayCode(birDayCode)
    if (!check) return false
    // 验证校检码
    return checkVerifyCode(idCardNo)
}

// 格式化时间
function formatDateCN (day) {
    const yyyy = day.substring(0, 4)
    const mm = day.substring(4, 6)
    const dd = day.substring(6)
    return yyyy + '-' + mm + '-' + dd
}


/**
 * @module IDCardUtil
 * @desc 身份证工具类
 * @author meeek
 * @date 2020年9月29日
 */
const IDCardUtil = {
    /**
     * @memberOf module:IDCardUtil
     * @method checkIdCardNo
     * @desc 校验身份证号码[15位/18位]
     * @param idCardNo {String} 身份证号码
     * @return {Boolean} true/false
     */
    checkIdCardNo: function (idCardNo) {
        // 15位和18位身份证号码的基本校验
        const check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo)
        if (!check) return false
        // 判断长度为15位或18位
        if (idCardNo.length == 15) {
            return check15IdCardNo(idCardNo)
        } else if (idCardNo.length == 18) {
            return check18IdCardNo(idCardNo)
        } else {
            return false
        }
    },

    /**
     * @memberOf module:IDCardUtil
     * @method getId15
     * @desc 身份证号码18位转15位
     * @param idCardNo {String} 18位身份证号码
     * @return {String} 15位身份证号码
     */
    getId15: function (idCardNo) {
        if (idCardNo.length == 15) {
            return idCardNo
        } else if (idCardNo.length == 18) {
            return idCardNo.substring(0, 6) + idCardNo.substring(8, 17)
        } else {
            return null
        }
    },

    /**
     * @memberOf module:IDCardUtil
     * @method getId18
     * @desc 身份证号码15位转18位
     * @param idCardNo {String} 15位身份证号码
     * @return {String} 18位身份证号码
     */
    getId18: function (idCardNo) {
        if (idCardNo.length == 15) {
            const id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6)
            const verifyCode = this.getVerifyCode(id17)
            return id17 + verifyCode
        } else if (idCardNo.length == 18) {
            return idCardNo
        } else {
            return null
        }
    },

    /**
     * @memberOf module:IDCardUtil
     * @method getInfo
     * @desc 获取身份证信息
     * @param idCardNo {String} 身份证号码
     * @return {Object} {gender:'男/女',birthday:'yyyy-mm-dd'}
     */
    getInfo: function (idCardNo) {
        const idCardInfo = {
            gender: '', // 性别
            birthday: '' // 出生日期(yyyy-mm-dd)
        }
        if (idCardNo.length == 15) {
            const aDay = '19' + idCardNo.substring(6, 12)
            idCardInfo.birthday = formatDateCN(aDay)
            if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
                idCardInfo.gender = genders.female
            } else {
                idCardInfo.gender = genders.male
            }
        } else if (idCardNo.length == 18) {
            const aDay = idCardNo.substring(6, 14)
            idCardInfo.birthday = formatDateCN(aDay)
            if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
                idCardInfo.gender = genders.female
            } else {
                idCardInfo.gender = genders.male
            }
        }
        return idCardInfo
    }
}

export default IDCardUtil
