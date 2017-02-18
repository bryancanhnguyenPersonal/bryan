"use strict";
var angular = require('angular');
var angularRoute = require('angular-route');

var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider

  .when('/', {
    templateUrl: './pages/blog-page.html'
})

  .when('/about', {
    templateUrl: './pages/about-me.html'
})
  .otherwise({redirectTo: '/'});
});

app.directive('activeLink', ['$location', function (location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var clazz = attrs.activeLink;
        var path = attrs.href;
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        scope.$watch('location.path()', function (newPath) {
          if (path === newPath) {
            element.addClass(clazz);
          } else {
            element.removeClass(clazz);
          }
        });
      }
    };
}]);


app.directive('012717', function() {
  return {
    templateUrl: './pages/01.27.17.html'
  };
});

app.directive('020417', function() {
  return {
    templateUrl: './pages/02.04.17.html'
  };
});

app.directive('blog3', function() {
  return {
    templateUrl: './pages/blog-post-3.html'
  };
});

app.directive('blog4', function() {
  return {
    templateUrl: './pages/blog-post-4.html'
  };
});
