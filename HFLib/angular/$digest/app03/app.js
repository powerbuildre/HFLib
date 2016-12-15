/*
 * @Author: Administrator
 * @Date:   2016-12-15 01:17:36
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-15 13:36:47
 */

'use strict';

function $scope() {
    this.$$watchList = [];
}
$scope.prototype.$watch = function(name, getNewValue, listener) {
    var watch = {
        name: name,
        getNewValue: getNewValue,
        listener: listener
    };
    this.$$watchList.push(watch);
}
$scope.prototype.$digest = function() {
    var list = this.$$watchList;
    for (var i = 0, l = list.length; i < l; i++) {
        list[i].listener();
    }
}

var scope = new $scope();
scope.$watch(function() {
    console.log("hey i have got newValue")
}, function() {
    console.log("i am the listener");
})

scope.$watch(function() {
    console.log("hey i have got newValue 2")
}, function() {
    console.log("i am the listener2");
})

scope.$digest();
