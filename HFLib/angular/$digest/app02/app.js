/*
 * @Author: Administrator
 * @Date:   2016-12-14 20:52:43
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-14 21:30:01
 */

window.onload = function() {
    'use strict';

    var scope = {
        increase: function() {
            this.data++;
        },
        decrease: function decrease() {
            this.data--;
        },
        data: 0
    }

    function bind() {
        var list = document.querySelectorAll('[ng-click]');
        for (var i = 0, l = list.length; i < l; i++) {
            list[i].onclick = (function(index) {
                return function() {
                    var func = this.getAttribute('ng-click');
                    scope[func](scope);
                    apply();
                }
            })(i);
        }
    }

    // apply
    function apply() {
        var list = document.querySelectorAll('[ng-bind]');
        for (var i = 0, l = list.length; i < l; i++) {
            var bindData = list[i].getAttribute('ng-bind');
            list[i].innerHTML = scope[bindData];
        }
    }

    bind();
    apply();
}
