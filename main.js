var app = angular.module('mainModule', []);

app.controller('amazon_box', function($scope, autocomplete,amazonSearch) {
  $scope.words = autocomplete;
 // $scope.results = amazonSearch;

});

app.factory('autocomplete', function($scope, $http) {
  $scope.autocomplete = function(keyword) {

    $http.jsonp(
      'http://completion.amazon.co.jp/search/complete', {
        params: {
          callback: 'JSON_CALLBACK',
          mkt: '6',
          method: 'completion',
          'search-alias': 'stripbooks',
          q: keyword,
        },
        timeout: 5000
      }).
    success(function(data, status) {
      $scope.status = status;
      $scope.data = data;
      return data[1];
      // $scope.words = data[1];
    }).
    error(function(data, status) {
      $scope.data = data || 'gcRequest failed';
      $scope.status = status;
    });
  };

});

/*
app.factory('amazonSearch', function($scope, $http) {

  $scope.search = function(keyword) {
    $http.get(
      request, {
        params: {
        },
        timeout: 5000
      }).
    success(function(data, status) {
      $scope.status2 = status;
      $scope.results = data;
    }).
    error(function(data, status) {
      $scope.results = data || 'gcRequest failed';
      $scope.status2 = status;
    });
  };

});
*/
