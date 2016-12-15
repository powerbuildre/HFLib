/*
 * @Author: Administrator
 * @Date:   2016-12-15 14:39:05
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-15 14:42:50
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
    }

    this.$$watchList.push(watch);
}
$scope.prototype.$digest = function() {
    var list = this.$$watchList;
    for (var i = 0, l = list.length; i < l; i++) {
        var watch = list[i];
        var newValue = watch.getNewValue(this);
        var oldValue = watch.last;
        if (newValue != oldValue) {
            watch.listener(newValue, oldValue);
        }
        watch.last = newValue;
    }
}

var scope = new $scope();
scope.first = 10;
scope.second = 1;
scope.$watch('first', function(scope) {
        return scope[this.name]
    },
    function(newValue, oldValue) {
        console.log('first:      newValue:' + newValue + '~~~~' + 'oldValue:' + oldValue);
    })

scope.$watch('second', function(scope) {
        return scope[this.name]
    },
    function(newValue, oldValue) {
        scope.first = 8;
        console.log('second:     newValue:' + newValue + '~~~~' + 'oldValue:' + oldValue);
    })
scope.$digest();
console.log(scope.first);
console.log(scope.second);
