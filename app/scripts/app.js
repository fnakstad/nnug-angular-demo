'use strict';

angular.module('kittyBattle', ['ui.bootstrap']).config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/battle.html',
        controller: 'BattleCtrl'
        })
        .when('/rankings', {
            templateUrl: 'views/rankings.html',
            controller: 'RankingsCtrl'
        })
        .when('/roster', {
            templateUrl: 'views/roster.html',
            controller: 'RosterCtrl'
        })
        .otherwise({
        redirectTo: '/'
        });

    //$locationProvider.html5Mode(true);
  }).run(function($rootScope) {
        $rootScope.initialPageLoad = true;
        console.log('hey');
        setTimeout(function() {
            console.log('done');
            $rootScope.initialPageLoad = false;
            if(!$rootScope.$$phase) $rootScope.$apply();
        }, 500);
    });

// Paging
angular.module('kittyBattle').filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
    }
});


angular.module('kittyBattle').directive('activeLink', ['$location', function(location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var cssClass = attrs.activeLink;
            var nestedA = element.find('a')[0];
            var path = nestedA.href;

            scope.location = location;
            scope.$watch('location.absUrl()', function(newPath) {
                if (path === newPath) {
                    element.addClass(cssClass);
                } else {
                    element.removeClass(cssClass);
                }
            });
        }

    };

}]);