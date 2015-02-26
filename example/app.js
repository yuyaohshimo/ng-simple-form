angular.module('test', ['simpleForm']);

angular.module('test')

.controller('TestCtrl', ['$scope', function($scope) {

  $scope.submit = {
    label: 'Send Data',
    method: 'POST',
    url: '/api/test',
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
      type: 'text',
      label: 'name',
      placeholder: 'Miyuki',
      required: true,
      errMsgs: {
        invalid: 'Error message.'
      },
      pattern: ''
    },
    {
      type: 'email',
      label: 'email',
      placeholder: 'miyuki@test.com',
      required: true,
      errMsgs: {
        invalid: 'Error message.'
      },
      pattern: '',
      confirm: true
    }
  ];
}]);