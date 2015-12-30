angular
  .module('ngApp')
  .controller('MainCtrl', MainCtrl)

MainCtrl.$inject = [
  '$scope',
  '$http',
  'localStorageService',
  '$cordovaPushV5'
];

function MainCtrl($scope, $http, localStorageService, $cordovaPush) {

};
