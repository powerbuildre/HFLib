/*
 * @Author: Administrator
 * @Date:   2016-12-06 23:34:04
 * @Last Modified by: Pawn.Hu
 * @Last Modified time: 2016-12-07 22:53:58
 */

'use strict';
var template = `
<div>
    <span>
    {{number}}
    </span>
</div>
`;


var Scope = {
    number: 10
}
var SS = (function() {
    var regex = /\{\{([A-Za-z_\$]+[A-Za-z0-9_\$]*?)\}\}/g;
    var result = "";

    var ss = {};
    ss.Render = function(template, Scope) {
        result = template.replace(regex, function(a, b) {
            b = b.trim();
            return Scope[b];
        })
        return result;
    }
    return ss;
})()
console.log(SS.Render(template, Scope));
