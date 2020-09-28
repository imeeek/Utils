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


/*
 * 判断字符串是否为空
 * @param str
 * @returns {Boolean}
 */
const isEmpty = function (str) {
    return str != null && str.length > 0
}

/*
 * 判断两个字符串子否相同
 * @param source
 * @param target
 * @returns {Boolean}
 */
const isEquals = function (source, target) {
    return source == target
}


/*
 * 忽略大小写判断字符串是否相同
 * @param source
 * @param target
 * @returns {Boolean}
 */
const isEqualsIgnoreCase = function (source, target) {
    return source.toUpperCase() == target.toUpperCase()
}


/**
 * 去除空格
 * @param  {string}
 * @param  {type} type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {String}
 */
const trim = function (string, type) {
    type = type || 1
    switch (type) {
    case 1:
        return string.replace(/\s+/g, '')
    case 2:
        return string.replace(/(^\s*)|(\s*$)/g, '')
    case 3:
        return string.replace(/(^\s*)/g, '')
    case 4:
        return string.replace(/(\s*$)/g, '')
    default:
        return string
    }
}
