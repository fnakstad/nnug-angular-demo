'use strict';

angular.module('kittyBattle').controller('RosterCtrl', function ($scope, $http) {
    $scope.loading = true;

    $http.get('api/kitties').success(function(kitties) {
        $scope.loading = false;
        $scope.kitties = kitties;
    });
});
