angular.module('starter')

.controller('RatingCtrl', function($scope, $ionicPopup,$stateParams,$filter,Info, $timeout, $firebaseArray) {

  function actualizarSOS(){
    /*** ELIMINAMOS LOS QUE YA FUERON PUNTUADOS ***/
    var SOS = Info;
    var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/Ratings");
    var ratings = $firebaseArray(infosRef);
    ratings.$loaded(function(){
      $.each(ratings, function(i){
        $.each(SOS, function(j){
          if(ratings[i].SosId == SOS[j].id || SOS[j].usr != firebase.auth().currentUser.uid){
            SOS.$remove(j);
          }
        })
      })
      $scope.info =SOS;
      $scope.usu = firebase.auth().currentUser.uid;

      if(!SOS[0]){ //Undefined 
        var htmlCont;

        htmlCont = "<ion-list>";
        htmlCont += "<div class=\"card\" style=\"padding: 10px; color: #444;\">";
        htmlCont += "<div>";
        htmlCont += "<center><h2>No hay SOS sin opiniones</h2></center>";
        htmlCont += "<center><p> En este momento todos los SOS que enviaste ya han recibido opinion.";
        htmlCont += "Agradecemos siempre que puntues y escribas un comentario para ayudarnos ";
        htmlCont += "mejorar el servicio.</p></center>";
        htmlCont += "</div>";
        htmlCont += "</div>";
        htmlCont += "</ion-list>";

        $("#contenedor").html(htmlCont);
        compilarElemento("#contenedor")
      }

    });
  }
  actualizarSOS();

  // set the rate and max variables
  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;


  $scope.showPopup = function(id) {

    //Rating
    var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/Ratings");
    var ratings = $firebaseArray(infosRef);

    ratings.$loaded(function(){

      var tipo;
      $.each(Info, function(i){
        if(Info[i].id == id){
          tipo = Info[i].tipo;
        }
      });

      if(!$scope.rating.comment){
        $scope.rating.comment = "";
      }
      var myPopup = $ionicPopup.show({
              template: 'Puntuacion y comentario<br>'
              +'<div>'
      		+'<rating ng-model="rating.rate" max="rating.max"></rating>'
      		+'<textarea ng-model="rating.comment"></textarea>'
      		+'</div>',
              title: 'Rate',
              scope: $scope,
            
              buttons: [
                { text: 'Cancel' }, 
                {text: '<b>Save</b>',
                type: 'button-positive',
                      onTap: function(e) {
                        var options = {
                            enableHighAccuracy: true
                        };
                        var latlon;
                          navigator.geolocation.getCurrentPosition(function(pos) {
                              ratings.$add({
                                "rate": $scope.rating.rate,
                                "SosId": id,
                                "comentario": $scope.rating.comment,
                                "date": $filter('date')(new Date(), 'dd/MM/yyyy'),
                                "usuario": firebase.auth().currentUser.displayName,
                                "tipo": tipo
                              });               
                          }, 
                          function(error) {                    
                              alert('Unable to get location: ' + error.message);
                          }, options);
                        $timeout(function(){
                          location.reload(); 
                        }, 1000);
                      }
                }
              ]
          });
      })
    }

    //Func. auxiliares
    function compilarElemento(elemento) {

        var elemento = (typeof elemento == "string") ? elemento : null;  
        if (elemento != null) {
            var div = $(elemento);
            var target = $("[ng-app]");

            angular.element(target).injector().invoke(["$compile", 
                function ($compile) {
                    var $scope = angular.element(target).scope();
                    $compile(div)($scope);
                }
            ]);
        }
    }

});



