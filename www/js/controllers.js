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

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $ionicPush, esAdminVal) {

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

  var ref = new Firebase("https://triggered-4e761.firebaseio.com/SOS");
  var primerEvento = false;
  ref.on("value", function(snapshot){

    if(primerEvento){
      document.addEventListener('deviceready', function () { //Cuando el dispositivo esta listo
        if(esAdminVal.admin){ //Si es administrador

          var SOS = snapshot.val();
          alert(SOS)
          $.each(SOS, function(i){
            alert(SOS[i].id);
          });

          //Envio de notificacion
          cordova.plugins.notification.local.schedule({
            title: "Meeting in 15 minutes!",
            text: "Pepito necesita un taxi",
            icon: "file://img/ionic.png"
            //icon: ""
          });

          //Click sobre la notificacion
          cordova.plugins.notification.local.on("click", function (notification) {
              location.href="#/listadeSOS"; //Redireccionamiento
          });

        }
      }, false);
    }else{
      primerEvento = true;
    }

  });

  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    alert(msg);
    var myPopup = $ionicPopup.show({
      template: msg,
      title: 'Logout'
    });
    $timeout(function(){
      myPopup.close();
    }, 1000);
  });
});



