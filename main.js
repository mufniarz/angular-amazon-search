var app = angular.module('mainModule', []);

app
  .value('constants', {
    //your own aws keys must be used here.
    AWSAccessKeyId: "AKIAIPTRW2ANAGYGXUVA",
    AWSsecretkeyId: "te6dvgK1yFAZ2tfM8ahLKEHjW8acpqbWU75Nn2qA",
    URI: "ecs.amazonaws.jp"
  })
  .value('options', {
    //These parameters can be changed for your purposes
    AssociateTag: "feynman123-22",
    Operation: "ItemSearch",
    SearchIndex: "Books",
  });


app
  .factory('autocomplete', function($http) {

    return function(keyword, callback) {
      $http.jsonp(
        "http://completion.amazon.co.jp/search/complete", {
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
        callback(status, data[1]);
      }).
      error(function(data, status) {
        data = data || "Request failed";
        callback(status, data);
      });
    };
  })

.factory('search', function(constants, options, $http) {
  return {
    itemsearch: function(keyword, callback) {
      var request = getSignedQuery(constants, options, keyword);
      var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + request + '"') + '&format=json';
//Get JSON data via yahoo! YQL service
      $http({
        method: 'JSONP',
        url: yql,
        params: {
          callback: 'JSON_CALLBACK'
        }
      }).
      success(function(data, status) {
        callback(status, data);
      }).
      error(function(data, status, headers, config) {
        callback(status, data);
        //$scope.data = data || "request failed";
        //$scope.status = status;
      });
    }
  };
});


app
  .controller('mainCtrl', function($scope, autocomplete, search) {
    $scope.onChange = function(keyword) {
      autocomplete(keyword, function(status, words) {
        $scope.words = words;
        $scope.status = status;
      });
    };

    $scope.search = function(keyword) {
      search.itemsearch(keyword, function(status, data) {
        $scope.result = data;
        $scope.items = data.query.results.ItemSearchResponse.Items.Item;
        $scope.status = status;
      });
    };
  });
