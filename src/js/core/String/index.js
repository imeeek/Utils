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
 * @module StringUtil
 * @desc 对象工具类
 * @author meeek
 * @date 2020年9月29日
 */
const StringUtil = {
    /**
     * @memberOf module:StringUtil
     * @method getType
     * @desc 获取对象的类型
     * @param o {Any} 要判断类型的对象
     * @return {String} 'String','Number','Boolean','Function','Null','Undefined','Object','Array','Date','RegExp','Error','Symbol','Promise','Set'
     */
    /**
     * @memberOf module:StringUtil
     * @method isEmpty
     * @desc 判断字符串是否为空
     * @param str {String}
     * @return {Boolean}
     */
    isEmpty: function (str) {
        return str != null && str.length > 0
    },

    /**
     * @memberOf module:StringUtil
     * @method isEquals
     * @desc 判断两个字符串子否相同
     * @param source {String} 源字符串
     * @param target {String} 目标字符串
     * @return {Boolean}
     */
    isEquals: function (source, target) {
        return source == target
    },

    /**
     * @memberOf module:StringUtil
     * @method isEqualsIgnoreCase
     * @desc 忽略大小写判断字符串是否相同
     * @param source {String} 源字符串
     * @param target {String} 目标字符串
     * @return {Boolean}
     */
    isEqualsIgnoreCase: function (source, target) {
        return source.toUpperCase() == target.toUpperCase()
    },


    /**
     * @memberOf module:StringUtil
     * @method trim
     * @desc 去除空格
     * @param  str {String}
     * @param  type {Number} 1-所有空格  2-前后空格  3-前空格 4-后空格
     * @return {String}
     */
    trim: function (str, type) {
        type = type || 1
        switch (type) {
        case 1:
            return str.replace(/\s+/g, '')
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, '')
        case 3:
            return str.replace(/(^\s*)/g, '')
        case 4:
            return str.replace(/(\s*$)/g, '')
        default:
            return str
        }
    }
}

export default StringUtil
