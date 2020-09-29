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
 * @module RandomUtil
 * @desc 随机数工具类
 * @author meeek
 * @date 2020年9月29日
 */
const RandomUtil = {
    /**
     * @memberOf module:RandomUtil
     * @method getNumber
     * @desc 获取指定范围的数字
     * @param min {Number} 范围最小值，默认 0
     * @param max {Number} 范围最大值，默认 1
     * @param fixed {Number} 保留几位小数，默认不保留，取值范围为[0,17]，输入大于17的数取17，输入小于0的数取绝对值的整数位，输入小数将取其整数位
     * @return {Number} 随机数
     */
    getNumber: function (min = 0, max = 1, fixed = 0) {
        const range = max - min
        const num = min + Math.random() * range
        fixed = Math.floor(Math.abs(fixed)) > 17 ? 17 : Math.floor(Math.abs(fixed))
        return Number(num.toFixed(fixed))
    },

    /**
     * @memberOf module:RandomUtil
     * @method getString
     * @desc 获取指定长度字随机符串
     * @param length {Number} 字符串长度
     * @return {string} 随机字符
     */
    getString: function (length = 32) {
        const array = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
        ]
        let n = ''
        for (let i = 0; i < length; i++) {
            n += array[Math.floor(Math.random() * array.length)]
        }
        return n
    },

    /**
     * @memberOf module:RandomUtil
     * @method getColor
     * @desc 获取随机颜色
     * @param type {String} 颜色类型，默认值hex,可选rgb、rgba、hsb
     * @return {String} 颜色字符串
     */
    getColor: function (type = 'hex') {
        if (type.toLocaleLowerCase() == 'rgb') {
            const r = Math.floor(Math.random() * 256)
            const g = Math.floor(Math.random() * 256)
            const b = Math.floor(Math.random() * 256)
            return `rgb(${r},${g},${b})`
        } else if (type.toLocaleLowerCase() == 'rgba') {
            const r = Math.floor(Math.random() * 256)
            const g = Math.floor(Math.random() * 256)
            const b = Math.floor(Math.random() * 256)
            const alpha = Math.random().toFixed(4)
            return `rgb(${r},${g},${b},${alpha})`
        } else {
            return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6)
        }
    }
}

export default RandomUtil
