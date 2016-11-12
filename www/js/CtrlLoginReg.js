angular.module('starter')

.controller('loginCtrl', function($scope, $stateParams,$firebaseArray,$timeout,Info, refUsuarioActualVal, $state) {
  $scope.loginData = {};
  // Hacer logueo
  $scope.loguear = function() {

    console.info($scope.loginData);
    //VALIDAR DATOS
    if($scope.loginData.user == null){
      alert("No se ingreso usuario");
      return;
    }else if ($scope.loginData.contra == null){
      alert("No se ingreso password");
      return;
    }else{

      //INICIO...
      var refUsuarios = firebase.database().ref('usuarios/' + $scope.loginData.user);
      refUsuarios.once('value')
        .then(function(snapshot){
          infoUsuario = snapshot.val();
          if(infoUsuario != null){
            
            if(infoUsuario.contra == $scope.loginData.contra){
              alert("Bienvenido " + $scope.loginData.user);
              refUsuarioActualVal.ref = refUsuarios;
              location.href="#/app/mapa";
              //$state.go('mapa');
            }else{
              alert("El password es incorrecto");
              return;
            }
          }else{
            alert("Este usuario no existe...");
            return;
          }
        })
        .error(function(error){
          console.info(error);
        })
    }
  }

   /*INICIAR SESION CON GITHUB*/
  var provider = new firebase.auth.GithubAuthProvider();
  $scope.logearGithub = function(){
    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        //Guardar en DB
        var refUsuarios = firebase.database().ref('usuariosGithub/' + result.user.uid);
        refUsuarios.once('value')
          .then(function(snapshot){
            if(snapshot.val() == null){
              alert("Esta cuenta no está registrada...");
              location.href='#/registro';
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



