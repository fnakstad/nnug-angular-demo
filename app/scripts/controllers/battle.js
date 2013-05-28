'use strict';

angular.module('kittyBattle').controller('BattleCtrl', function ($scope, $http) {

    fetchContestants();

    $scope.vote = function(winner, loser) {
        $http.post('/api/battle', {
            winner: winner.id,
            loser: loser.id
        }).success(function() {
            fetchContestants();
        });
    }

    function fetchContestants() {
        $scope.loading = true;
        $http.get('api/kitties/?pageSize=2&sort=random').success(function(kitties) {
            $scope.contenderOne = kitties[0];
            $scope.contenderTwo = kitties[1];
            $scope.loading = false;
        });
    };
});
