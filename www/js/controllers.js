angular.module('starter.controllers', [])

.factory("Info", function($firebaseArray) {
  var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/SOS");
  return $firebaseArray(infosRef);
})
.factory("Ratings", function($firebaseArray) {
  var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/Ratings");
  return $firebaseArray(infosRef);
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Cerrar sesion
  $scope.logout = function() {
    alert("Sesion cerrada!");
    refUsuarioActualVal.ref = null;
    location.href="#/app/login";
  };
});



