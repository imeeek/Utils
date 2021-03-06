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


/**
 * @module VerifyUtil
 * @desc 对象工具类
 * @author meeek
 * @date 2020年9月29日
 */
const VerifyUtil = {
    /**
     * @memberOf module:VerifyUtil
     * @method isMobilePhone
     * @desc 是否为有效移动电话号码
     * @param str {String}
     * @return {Boolean}
     */
    isMobilePhone: function (str) {
        return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str)
    },

    /**
     * @memberOf module:VerifyUtil
     * @method isEmail
     * @desc 是否为有效邮箱地址
     * @param str {String}
     * @return {Boolean}
     */
    isEmail: function (str) {
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
    },

    /**
     * @memberOf module:VerifyUtil
     * @method isURL
     * @desc 是否为有效网址
     * @param str {String}
     * @return {Boolean}
     */
    isURL: function (str) {
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    },

    /**
     * @memberOf module:VerifyUtil
     * @method isPostcode
     * @desc 是否为有效邮编
     * @param str {String}
     * @return {Boolean}
     */
    isPostcode: function (str) {
        return /^[1-9]\d{5}$/.test(str)
    }
}

export default VerifyUtil
