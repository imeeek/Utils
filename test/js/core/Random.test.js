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

import * as Random from '../../../src/js/core/Random'

/**
 * 获取范围内随机数
 */
test('获取随机数：', () => {
    const value = Random.getNumber(-199, 200)
    expect(value).toBeGreaterThanOrEqual(-199)
    expect(value).toBeLessThanOrEqual(200)
})


/**
 * 获取随字符串
 */
test('获取随字符串：', () => {
    const value = Random.getString(15)
    expect(value).toHaveLength(15)
})

/**
 * 获取随机颜色
 */
test('获取随机颜色：', () => {
    const value = Random.getColor('rgb')
    expect(value).not.toBeNull()
})
