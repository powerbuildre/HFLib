/*
 * @Author: Administrator
 * @Date:   2016-12-07 16:10:12
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2016-12-07 22:50:54
 */

'use strict';

var template =
    `<div>
    {{title}}
    <ul>
        <li>
           name:{{items[0].name}}
           <br />
            age:{{items[0].age}}
           <br />
            sex:{{items[0].sex}}
        </li>
         <li>
           name:{{items[1].name}}
           <br />
            age:{{items[1].age}}
           <br />
            sex:{{items[1].sex}}
        </li>
    <ul/>
<div>
`;

var scope = {
    title: "person list",
    items: [{
        name: 'pawn',
        age: 21,
        sex: 1
    }, {
            name: 'jk',
            age: 30,
            sex: 0
        },]

}
var SS = (function () {
    var regex = /\{\{([A-Za-z_\$]+(\[\d+\]+|\.[A-Za-z_\$]+|[A-Za-z0-9_$])*)\}\}/g;

    var result = "";



    var ss = {};
    ss.Render = function (origin, scope) {
        result = origin.replace(regex, function ($, $1) {
            $1 = $1.trim();
            var innerdata = scope;
            var items = $1.split('.');


            for (var i = 0; i < items.length; i++) {
                var m;
                if (/\[\d+\]/.test(items[i])) {
                    innerdata = innerdata[items[i].split('[')[0]];
                    var reNumber = /\[(\d+)\]/g;
                    while (m = reNumber.exec(items[i])) {
                        innerdata = innerdata[m[1]];
                    }
                }
                else {
                    innerdata = innerdata[items[i]];
                }
            }


            return innerdata;
        });

        return result;
    }
    return ss;
})()
console.log(SS.Render(template, scope));
