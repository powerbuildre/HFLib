/*
 * @Author: Administrator
 * @Date:   2016-12-14 19:25:25
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-14 20:33:58
 */

'use strict';

/*
 * @Author: Administrator
 * @Date:   2016-12-14 12:32:24
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-14 13:26:50
 */

'use strict';

var app = angular.module('app', []);
app.directive('myclick', function() {
    return function(scope, element, attr) {
        element.on('click', function() {
            scope.data++;
            console.log(scope.data)
            scope.$digest();
        })
    }
})
app.controller('appController', function($scope) {
    $scope.data = 0;
});
