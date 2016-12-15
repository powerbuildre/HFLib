/*
 * @Author: Administrator
 * @Date:   2016-12-15 15:23:46
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-15 15:32:49
 */

'use strict';
/*
 * @Author: Administrator
 * @Date:   2016-12-15 15:00:42
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-15 15:03:42
 */

'use strict';
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

$scope.prototype.$$digestOnce = function() {
    var dirty = false;
    var list = this.$$watchList;
    for (var i = 0, l = list.length; i < l; i++) {
        var watch = list[i];
        var newValue = watch.getNewValue(this);
        var oldValue = watch.last;
        if (newValue != oldValue) {
            watch.listener(newValue, oldValue);
            dirty = true;
        }
        watch.last = newValue;
    }
    return dirty;
}
$scope.prototype.$digest = function() {
    var dirty = true;
    var checkTimes = 0;
    while (dirty) {
        dirty = this.$$digestOnce();
        checkTimes++;
        if (checkTimes > 10 && dirty) {
            throw new Error("检测超过10次");
            console.log("123");
        }
    };
};

var scope = new $scope();
scope.first = 1;
scope.second = 10;
scope.$watch('first', function(scope) {
        return scope[this.name]
    },
    function(newValue, oldValue) {
        scope.second++;
        console.log('first:      newValue:' + newValue + '~~~~' + 'oldValue:' + oldValue);
    })

scope.$watch('second', function(scope) {
        return scope[this.name]
    },
    function(newValue, oldValue) {
        scope.first++;
        console.log('second:     newValue:' + newValue + '~~~~' + 'oldValue:' + oldValue);
    })
scope.$digest();
