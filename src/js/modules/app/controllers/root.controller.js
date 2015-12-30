angular
  .module('ngApp')
  .controller('RootCtrl', RootCtrl)

RootCtrl.$inject = [
  '$rootScope',
  '$scope',
  '$q',
  '$mediator',
  '$state'
];

function RootCtrl($rootScope, $scope, $q, $mediator, $state) {

};
