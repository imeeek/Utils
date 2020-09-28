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

import * as IDCardUtils from '../../../src/js/exp/IDCard'

/**
 * 获取身份证信息
 * @see jest https://jestjs.io/docs/zh-Hans/using-matchers
 */
test('获取身份证信息：', () => {
    const id = '654123199209301775'
    expect(IDCardUtils.getIdCardInfo(id)).toEqual({ gender: '男', birthday: '1992-09-30' })
})
