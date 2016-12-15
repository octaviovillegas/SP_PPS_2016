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

.controller('AppCtrl', function($scope, $ionicModal, $firebaseArray, $timeout, $ionicPopup, $ionicPush, esAdminVal) {

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

          var SOS = $firebaseArray(ref);

          SOS.$loaded().then(function(){
            $.each(SOS, function(i){
              if(i == (SOS.length-1)){
                var nombre = SOS[i].usuName;
                var hecho;
                var text;
                var title = "NUEVO SOS";
                switch(SOS[i].tipo){
                  case 0:
                    hecho = " sufrió un Accidente";
                    break;
                  case 1:
                    hecho = " sufrió una Averia en su Vehiculo";
                    break;
                  case 2:
                    hecho = " vió un Animal Suelto";
                    break;
                  case 3:
                    hecho = " necestia una Ambulancia";
                    break;
                }
                text = nombre + hecho;

                //Envio de notificacion
                cordova.plugins.notification.local.schedule({
                  title: title,
                  text: text
                  //icon: ""
                });

                //Click sobre la notificacion
                cordova.plugins.notification.local.on("click", function (notification) {
                    var myPopup = $ionicPopup.show({
                      template: text,
                      title: title
                    });
                    $timeout(function(){
                      myPopup.close();
                    }, 3000);
                });

              }
            });
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



