/*!
 * simpleform.js
 * https://github.com/yuyaohshimo/ng-simple-form
 *
 * Copyright (c) 2015 Yuya Ohshimo
 * Licensed under the MIT license.
 */

(function() {
  angular.module('simpleForm', ['ngMessages'])

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
    $scope.sending = false;
    $scope.hasError = false;

    $scope.getCtrl = function() {
      return $scope[$scope.name];
    };

    $scope.getInputCtrl = function(name) {
      return $scope[$scope.name][name];
    };

    $scope.send = function(e) {
      var url = $scope.submit.url;
      var headers = $scope.submit.headers;
      var method = $scope.submit.method;
      var params = {};

      simpleFormService.sendRequest(url, headers, method, params)
      .then(function() {
        $scope.submit.callback.success();
      }, function() {
        $scope.hasError = true;
        $scope.submit.callback.error();
      });
    };
  }])

  .directive('simpleForm', function() {
    return {
      restrict: 'EA',
      replace: true,
      template: '<div class="simpleform"><form name="{{ name }}" ng-submit="send()" novalidate="novalidate"><div ng-repeat-start="input in inputs" class="simpleform__input"><label ng-bind="input.label"></label><input name="{{ input.name }}" type="{{ input.type }}" placeholder="{{ input.placeholder }}" ng-model="a" ng-required="input.required" ng-pattern="input.pattern"/><i ng-class="{ \'fa-exclamation-circle\': getInputCtrl(input.name).$invalid &amp;&amp; !getInputCtrl(input.name).$pristine, \'fa-check\': getInputCtrl(input.name).$valid &amp;&amp; !getInputCtrl(input.name).$pristine }" class="fa"></i></div><div ng-if="!getInputCtrl(input.name).$pristine" ng-repeat-end="ng-repeat-end" class="simpleform__help"><div ng-messages="getInputCtrl(input.name).$error"><p ng-message-exp="error" ng-repeat="(error, message) in input.errMsgs">{{ message }}</p></div></div><button type="submit" ng-disabled="getCtrl().$pristine || sending || getCtrl().$invalid"><span ng-show="sending"><i class="fa fa-circle-o-notch fa-spin"></i></span><span ng-show="!sending &amp;&amp; !hasError" ng-bind="submit.label"></span><span ng-show="!sending &amp;&amp; hasError" ng-bind="submit.error"></span></button></form></div>',
      scope: {
        name: '=',
        inputs: '=',
        submit: '='
      },
      controller: 'simpleFormController',
      link: function(scope, element, attrs, ctrls) {
      }
    };
  });

}).call(this);