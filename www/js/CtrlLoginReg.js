angular.module('starter')

.controller('loginCtrl', function($scope, $firebaseArray, $timeout) {

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
      .then(function(){ /*Logueo exitoso*/
        alert("Bienvenidx" + email);
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

.controller('registroCtrl', function($scope, $stateParams,$firebaseArray,$timeout,Info, refUsuarioActualVal) {

  $scope.regData = {};
  // Hacer logueo
  $scope.registrar = function() {

    console.info($scope.regData);
    //VALIDAR DATOS
    if($scope.regData.user == null){
      alert("No se ingreso usuario");
      return;
    }else if ($scope.regData.contra1 == null){
      alert("No se ingreso password");
      return;
    }else if ($scope.regData.contra2 == null){
      alert("No se confirmo password");
      return;
    } else if ($scope.regData.contra1 != $scope.regData.contra2){
      alert("Los passwords no coinciden");
      return;
    }else if ($scope.regData.tipo == null){
      alert("No se eligio tipo de usuario");
      return;
    }else{

      //INICIO...
      
      firebase.database().ref('usuarios').once('value', function(snapshot){
        var flagExiste = false;
        var usuarios = snapshot.val();
        $.each(usuarios, function(i){
          if(usuarios[i].usr == $scope.regData.user){
            flagExiste = true;
          }
        })

        if(!flagExiste){      
          var refUsuarios = firebase.database().ref('usuarios/' + $scope.regData.user);        
          refUsuarioActualVal.ref = refUsuarios;
          refUsuarios.ref.set({
            usr: $scope.regData.user,
            contra: $scope.regData.contra1,
            tipo: $scope.regData.tipo
          });
          alert("Bienvenidx " + $scope.regData.user);
          location.href="#/app/mapa";
          //$scope.modalRg.hide();
        }else{
          alert("Este usuario ya existe...");
          return;
        }
      });  
    }
  }

  /*REGISTRAR SESION CON GITHUB*/
  var provider = new firebase.auth.GithubAuthProvider();
  $scope.registroGithub = function(){
    if($scope.regData.tipo == null) {
      alert("Seleccione un tipo de usuario");
      return;
    }
    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        //Guardar en DB
        var refUsuarios = firebase.database().ref('usuariosGithub/' + result.user.uid);
        refUsuarios.once('value')
          .then(function(snapshot){
            if(snapshot.val() == null){
              refUsuarios.set({
                usr: result.user.email,
                id: result.user.uid,
                tipo: $scope.regData.tipo
              });
            }
          })
          .catch(function(error){
            console.info(error);
          });
        //Guardar referencia
        refUsuarioActualVal.ref = refUsuarios;
        //Redireccionar
        location.href='#/app/mapa';
      }).catch(function(error) {
        console.info(error);
      });
    }

});



