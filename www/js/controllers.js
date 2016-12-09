angular.module('starter.controllers', [])

.factory("Info", function($firebaseArray) {
  var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/SOS");
  return $firebaseArray(infosRef);
})

.factory("Ratings", function($firebaseArray) {
  var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/Ratings");
  return $firebaseArray(infosRef);
})

.factory("Admin", function($firebaseArray) {
  var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/Admin");
  return $firebaseArray(infosRef);
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $ionicPush) {

  var user = $scope.usr = firebase.auth().currentUser;

  if(user==null){
    alert("No esta Logeado");
    location.href="#/login"; //Redireccionamiento
  };

  // Cerrar sesion
  $scope.logout = function() {
    //alert("Sesion cerrada!");
    var myPopup = $ionicPopup.show({
           template: '<center> Sesión Cerrada! </center>',
           title: 'Logout'
        });
        $timeout(function(){
          myPopup.close();

        }, 1000);
    //Cerrar sesion DE GITHUB
    firebase.auth().signOut();
    location.href="#/login";
  };

  //MANEJO DE NOFICACIONES
  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    console.info()ñ
    var myPopup = $ionicPopup.show({
      template: '<center> ' + data.message + "</center>",
      title: 'Bienvenido'
    });
  });
});



