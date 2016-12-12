/*
 * @Author: Administrator
 * @Date:   2016-12-07 16:10:12
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2016-12-07 22:02:54
 */

'use strict';

var template =
    `<div>
    {{title}}
    <ul>
        <li>{{item.name}}</li>
        <li>{{item.age}}</li>
    <ul/>
<div>
`;

var scope = {
    title: "hello",
    item: {
        name: 'pawn',
        age: 15
    }
}
var SS = (function() {
    var regex = /\{\{([A-Za-z_\$]+(\.[A-Za-z_\$]+|[A-Za-z0-9_\$])*)\}\}/g;
    var result = "";

    var ss = {};
    ss.Render = function(origin, scope) {
        result = origin.replace(regex, function($, $1) {

            $1 = $1.trim();
            var innerdata = scope;
            var items = $1.split('.');
            for (var i = 0; i < items.length; i++) {
                innerdata = innerdata[items[i]];
            }
            return innerdata;
        });

        return result;
    }
    return ss;
})()
console.log(SS.Render(template, scope));
