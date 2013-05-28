'use strict';

angular.module('kittyBattle').controller('RosterCtrl', function ($scope, $http) {
    $scope.loading = true;

    $scope.pageSize = 3;
    $scope.currentPage = 1;

    $http.get('api/kitties').success(function(kitties) {
        $scope.loading = false;
        $scope.kitties = kitties;
        $scope.numberOfKitties = kitties.length;

        $scope.noOfPages = Math.floor($scope.numberOfKitties / $scope.pageSize);
    });
});
