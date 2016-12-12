"use strict";

var ss = (function () {
    var ss = {};
    var result = "";
    var regex = /\{\{([A-Za-z_\$][A-Za-z0-9_\$\.]*?[A-Za-z0-9_\$])\}\}/g;

    // this mathod is the main method, 
    // origin: origin string containing the mark up.
    // data: the json object used to instead the markup in origin.
    ss.Render = function (origin, data) {
        result = origin.replace(regex, function ($, $1) {
           
            $1 = $1.trim();
            var innerdata= data;
            var items = $1.split('.');
            for(var i = 0;i<items.length;i++){
                innerdata = innerdata[items[i]];
            }
            console.log(innerdata);
            return innerdata;
         });

        return result.replace("@{{",'{{').replace('@}}','}}'); 
    }
    return ss;
})();

var res = ss.Render(`<div>
{{title}}
<span>@{{afb@}}</span>
<ul>
<li>{{item.name}}</li>
<li>{{item.age}}</li>
<li>{{item.0}}</li>
<ul/><div>`, { title:"hello",item:{name:'pawn',age:15}});
console.log(res);