'use strict';

angular.module('kittyBattle').controller('RosterCtrl', function ($scope, $http) {
    $scope.loading = true;
    $scope.numberOfKitties = 0;
    $http.get('api/kitties').success(function(kitties) {
        $scope.kitties = kitties;
        $scope.loading = false;
        $scope.numberOfKitties = kitties.length;
    });

    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.numberOfPages = function(){
        return Math.ceil($scope.numberOfKitties / $scope.pageSize);
    }
});
