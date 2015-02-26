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
      template: '<div class="simpleform"><form novalidate="novalidate" ng-submit="send()"><div ng-repeat="input in inputs"><label ng-bind="input.label"></label><input type="input.type" placeholder="{{ input.placeholder }}"/></div><button type="submit" ng-disabled="sending || hasError"><span ng-show="sending">kurukuru</span><span ng-show="!sending &amp;&amp; !hasError" ng-bind="submit.label"></span><span ng-show="!sending &amp;&amp; hasError" ng-bind="errorMsg"></span></button></form></div>',
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