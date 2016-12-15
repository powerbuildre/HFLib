/*
 * @Author: Administrator
 * @Date:   2016-12-14 12:32:24
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-14 13:26:50
 */

'use strict';

angular.module('app', []).controller('appController', ['$scope', '$interval', function($scope, $interval) {
    var staticItems = [];
    var dynamicItems = [];
    for (var i = 0; i < 720; i++) {
        var item = Math.ceil(100 * Math.sin(i * Math.PI / 180));
        item += 100;
        staticItems.push(item);
    }

    $scope.staticItems = staticItems;

    for (i = 0; i < 720; i++) {
        item = Math.ceil(100 * Math.sin(i * Math.PI / 180));
        item += 100;
        dynamicItems.push(item);
    }
    var num = i;
    $interval(function() {
        dynamicItems.splice(0, 1);
        var item = Math.ceil(100 * Math.sin(num++ * Math.PI / 180));
        item += 100;
        dynamicItems.push(item);
    }, 20);
    $scope.dynamicItems = dynamicItems;
}])
