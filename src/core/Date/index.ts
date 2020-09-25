/*! *****************************************************************************
Copyright (c) 2020-present, Meng Kang(meeek) Zhang

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy,modify, merge, publish, distribute,sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

export class DateUtils{

    /**
     * GMT时间转换为 正常北京时间(string类型)
     * @param time
     * @constructor
     */
    GMTToStr(time){
        let date = new Date(time);
        let Str=date.getFullYear() + '-' +
            (date.getMonth() + 1) + '-' +
            date.getDate() + ' ' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds();
        return Str;
    }

    /**
     * string类型转date 时间戳
     * @param date
     */

    public str_date(date){

        console.log("日期转换：");
        console.log(date);


        //前台数据转换获得时间戳 传给后台
        // @ts-ignore
        var date_m=Date.parse(date);
        // console.log(date_m);

        //将时间戳转换为GMT 格式时间
        var strDate= new Date(date_m);
        // console.log(strDate);

        //得到正常北京时间
        // @ts-ignore
        let GMTDate= this.GMTToStr(strDate);
        // console.log(GMTDate);

        //返回时间戳
        return  date_m;
    }
}
