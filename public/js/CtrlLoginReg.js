//firebase.User.uid;
angular.module('starter')

.controller('loginCtrl', function($scope, $firebaseArray) {

  $scope.loginData = {};
  $scope.Loguear = function(){

    /*Validar datos de logueo*/
    if($scope.loginData.email == null){ 
      alert("Ingrese un email");
      return -1;
    }else if($scope.loginData.password == null){
      alert("Ingrese un password");
      return -1;
    }

    /*Crear variables con datos de logueo*/
    var email = $scope.loginData.email;
    var password = $scope.loginData.password;

    /*Loguear con mail y password*/
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(usuario){ /*Logueo exitoso*/
        firebase.User = usuario;
        /*alert("Bienvenidx " + usuario.displayName);*/
        location.href="#/app/mapa"; //Redireccionamiento
      })
      .catch(function(error) { /*Manejo de errores*/
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          alert('El email ingresado no es válido.');
        } 
        else if (errorCode == 'auth/user-disabled') {
          alert('El usuario ha sido deshabilitado.');
        } 
        else if (errorCode == 'auth/user-not-found') {
          alert('El usuario ingresado no existe.');
        } 
        else if (errorCode == 'auth/wrong-password') {
          alert('El password ingresado es incorrecto.');
        } 
        else {
          alert(errorMessage); //Otro tipo de error
        }
        console.info(error);
      });
  }

})

.controller('registroCtrl', function($scope, $firebaseArray) {

  $scope.regData = {};
  // Hacer logueo
  $scope.Registrar = function() {

    /*Validar datos de logueo*/
    if($scope.regData.nombre == null){ 
      alert("Ingrese un nombre.");
      return -1;
    } else if($scope.regData.email == null){ 
      alert("Ingrese un email.");
      return -1;
    } else if($scope.regData.password1 == null){
      alert("Ingrese un password.");
      return -1;
    } else if($scope.regData.password2 == null){
      alert("Ingrese nuevamente su password.");
      return -1;
    } else if($scope.regData.password1 != $scope.regData.password2){
      alert("Los passwords no coinciden.");
      return -1;
    }

    /*Crear variables con datos de registro*/
    var nombre = $scope.regData.nombre;
    var email = $scope.regData.email;
    var password = $scope.regData.password1;

    /*Registrar con mail y password*/
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(usuario){ /*Registro exitoso*/
        firebase.User = usuario;
        usuario.updateProfile({
          displayName: nombre
        }).then(function() {
          var displayName = usuario.displayName;
        }, function(error) {
          console.info(error);
        });

        alert("Bienvenidx " + nombre);
        location.href="#/app/mapa"; //Redireccionamiento
      })
      .catch(function(error) { /*Manejo de errores*/
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/email-already-in-use') {
          alert('El email ingresado ya se encuentra en uso.');
        } 
        else if (errorCode == 'auth/invalid-email') {
          alert('El email ingresado no es válido.');
        } 
        else if (errorCode == 'auth/operation-not-allowed') {
          alert('Esta operación se encuentra deshabilitada.');
        } 
        else if (errorCode == 'auth/weak-password') {
          alert('El password ingresado es muy debil.');
        } 
        else {
          alert(errorMessage); //Otro tipo de error
        }
        console.info(error);
      });

  }

});



