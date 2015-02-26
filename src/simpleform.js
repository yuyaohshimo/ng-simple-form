/*!
 * simpleform.js
 * https://github.com/yuyaohshimo/ng-simple-form
 *
 * Copyright (c) 2015 Yuya Ohshimo
 * Licensed under the MIT license.
 */

(function() {
  angular.module('simpleForm', [])

  .constant('simpleFormConfig', {

  })

  .factory('simpleFormService', ['$q', '$http', function($q, $http) {
    var sendRequest = function(url, headers, method, params) {
      var deferred = $q.defer();
      $http({
        url: url,
        headers: headers,
        method: method,
        params: params,
      }).success(function(data, status, headers, config) {
        deferred.resolve();
      }).error(function(data, status, headers, config) {
        deferred.reject();
      });

      return deferred.promise;
    };

    return {
      sendRequest: sendRequest
    };
  }])

  .controller('simpleFormController', ['$scope', 'simpleFormService', function($scope, simpleFormService) {
    $scope.send = function(e) {
      var url = $scope.submit.url;
      var headers = $scope.submit.headers;
      var method = $scope.submit.method;
      var params = {};

      simpleFormService.sendRequest(url, headers, method, params)
      .then(function() {
        $scope.submit.callback.success();
      }, function() {
        $scope.submit.callback.error();
      });
    };
  }])

  .directive('simpleForm', function() {
    return {
      restrict: 'EA',
      replace: true,
      template: '{html}',
      scope: {
        inputs: '=',
        submit: '='
      },
      controller: 'simpleFormController',
      link: function(scope, element, attrs, ctrls) {

      }
    };
  });

}).call(this);