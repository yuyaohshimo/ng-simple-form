'use strict';

angular.module('test', ['simpleForm']);

angular.module('test')

.controller('TestCtrl', ['$scope', function($scope) {
  var mockURLs = {
    success: 'http://demo5712530.mockable.io/success',
    error: 'http://demo5712530.mockable.io/error'
  };

  $scope.success = true;
  $scope.$watch('success', function() {
    $scope.submit.url = $scope.success ? mockURLs.success : mockURLs.error;
  });

  $scope.name = 'sample';

  $scope.submit = {
    label: 'Send Data',
    error: 'Error!',
    method: 'POST',
    url: mockURLs.success,
    headers: {},
    callback: {
      success: function() {
        alert('success');
      },
      error: function() {
        alert('error');
      }
    }
  };

  $scope.inputs = [
    {
      name: 'name',
      type: 'text',
      label: 'Name:',
      placeholder: 'Miyuki',
      required: true,
      errMsgs: {
        required: 'Name is required.'
      },
      pattern: ''
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email:',
      placeholder: 'miyuki@test.com',
      required: true,
      errMsgs: {
        required: 'Email is required.',
        email: 'Invalid email.'
      },
      pattern: '',
      confirm: true
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password:',
      placeholder: '',
      required: true,
      errMsgs: {
        required: 'Password is required.',
        pattern: 'Invalid pattern.'
      },
      pattern: /^[ -~]{8,}$/,
    }
  ];
}]);