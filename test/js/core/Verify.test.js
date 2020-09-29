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

import * as Verify from '../../../src/js/core/Verify'

/**
 * 是否电话号码
 */
test('是否电话号码：', () => {
    const value = Verify.isMobilePhone('18988888888')
    expect(value).toBeTruthy()
})

/**
 * 是否Email
 */
test('是否Email：', () => {
    const value = Verify.isEmail('351264833@qq.com')
    expect(value).toBeTruthy()
})

/**
 * 是否URL
 */
test('是否URL：', () => {
    const value = Verify.isURL('https://jestjs.io/docs/zh-Hans/expect#tohavepropertykeypath-value')
    expect(value).toBeTruthy()
})

/**
 * 是否邮编
 */
test('是否邮编：', () => {
    const value = Verify.isPostcode('830000')
    expect(value).toBeTruthy()
})
