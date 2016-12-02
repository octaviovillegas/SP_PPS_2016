angular.module('starter')

.controller('puntuacionesCtrl', function($scope, $stateParams,$firebaseArray,$timeout,$timeout, $compile)  {


    var ref = new Firebase("https://triggered-4e761.firebaseio.com/Ratings");
    ref.on("value", function(snapshot){

        /**** ACTUALIZAR GRAFICO ****/
        Ratings = $firebaseArray(ref);

        $scope.Uno = 0;
        $scope.Dos = 0;
        $scope.Tres = 0;
        $scope.Cuatro = 0;
        $scope.Cinco = 0;
        
        Ratings.$loaded()
        .then(function(data){
            angular.forEach(data, function(value) {                
                switch(value.rate){
                case 1: $scope.Uno++; break;
                case 2: $scope.Dos++; break  ;
                case 3: $scope.Tres++; break  ;
                case 4: $scope.Cuatro++; break  ;
                case 5: $scope.Cinco++; break  ;
                }

            $scope.data = [
                {
                    key: "Una estrella",
                    y: $scope.Uno
                },
                {
                    key: "Dos estrellas",
                    y: $scope.Dos
                },
                {
                    key: "Tres estrellas",
                    y: $scope.Tres
                },
                {
                    key: "Cuatro estrellas",
                    y: $scope.Cuatro
                },
                {
                    key: "Cinco estrellas",
                    y: $scope.Cinco
                }
            ];

            })

            /**** ACTUALIZAR ULTIMOS 3 ****/
            var htmlInterno;
            htmlInterno = "<ion-list>";
            console.info(Ratings[0].tipo);
            var i;
            for(i=Ratings.length; i <= (Ratings.length-3); i--){
                    console.info("ddf");
                    var icon;
                    var nombre;
                    var date;
                    var rate;
                    var comentario;
                    console.log(Ratings[i].comentario);
                    switch(Ratings[i].tipo){
                        case 0: //Accidente
                            icon = "ion-android-car";
                            break; 
                        case 1: //Averia
                            icon = "ion-wrench";
                            break;
                        case 2: //Animal suelto
                            icon = "ion-ios-paw";
                            break;
                        case 3:  //Ambulancia
                            icon = "ion-medkit";
                            break; 
                    }

                    htmlInterno += "<ion-item>";
                    htmlInterno += "<div style=\"background-color:rgb(52, 152, 219); width: 50px; height: 50px; border-radius: 40px; float: left; margin: 10px;\">";
                    htmlInterno += "<div ng-class=\"{'"+icon+"':true}\" style=\"color: white; display: table; margin: 0 auto; margin-top: 15px;\"></div>";
                    htmlInterno += "</div>";
                    htmlInterno += "<div> <h2>Joaquin Perez</h2> <p>30/11/2016</p> <rating ng-model=\"4\" max=\"5\"></rating> <center><p style=\"font-style: italic;\"> \"Exelente.\" </p></center></div>";
                    htmlInterno += "</ion-item>";
            }
            htmlInterno += "</ion-list>"
            
            var elemento = ".ultimas-puntuaciones";
            $(elemento).html(htmlInterno);
            compilarElemento(elemento);

        });

    });

    function compilarElemento(elemento) {

        var elemento = (typeof elemento == "string") ? elemento : null;  
        if (elemento != null) {
            var $div = $(elemento);
            // The parent of the new element
            var $target = $("[ng-app]");

            angular.element($target).injector().invoke(["$compile", 
                function ($compile) {
                    var $scope = angular.element($target).scope();
                    $compile($div)($scope);
                    // Finally, refresh the watch expressions in the new element
                    //$scope.$apply();
                }
            ]);
        }
    }

    $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: false,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: false,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
    };
});