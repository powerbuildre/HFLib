/*
 * @Author: Administrator
 * @Date:   2016-12-15 13:34:05
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-15 13:52:31
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
scope.hello = 10;
scope.$watch('hello', function(scope) {
        return scope[this.name]
    },
    function(newValue, oldValue) {
        console.log('newValue:' + newValue + '~~~~' + 'oldValue:' + oldValue);
    })
scope.$digest();
scope.hello = 10;
scope.$digest();
scope.hello = 20;
scope.$digest();
