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


hexToRgba(hex, opacity) {
  // 去除#号
  hex = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (hex.length != 3 && hex.length != 6) {
    throw new Error("Wrong color setting!");
  }
  if (hex.length == 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
}


const CastUtil = {
  /**
   * 颜色转换
   * @param hex {Hex} 16进制
   * @param opacity {Double} 透明度 0 < 1
   * @return {string}
   */
  hexToRgba: function (hex, opacity) {
    hex = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (hex.length != 3 && hex.length != 6) {
      throw new Error("Wrong color setting!");
    }
    if (hex.length == 3) {
      hex = hex.split('').map(x => x + x).join('');
    }
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
  }
}

export default CastUtil
