'use strict';

angular.module('kittyBattle').controller('BattleCtrl', function ($scope, $http) {
    $scope.loading = true;
    $http.get('api/kitties').success(function(kitties) {
        $scope.kitties = kitties;
        $scope.loading = false;
    });
});
