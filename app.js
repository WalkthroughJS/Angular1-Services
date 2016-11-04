var app = angular.module('myFirstNgApp', []);

app.controller('myFirstController', function($scope, $http) {
  $scope.makeAPIcall = function(character) {
    $http.get('https://swapi.co/api/people/?search=' + character)
     .then(function(api_response) {
       console.log(api_response);
       $scope.results = api_response.data.results;
     });
  }
});
