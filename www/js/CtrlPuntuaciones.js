angular.module('starter')

.controller('puntuacionesCtrl', function($scope, $stateParams,$firebaseArray,$timeout,$timeout)  {


    var ref = new Firebase("https://triggered-4e761.firebaseio.com/Ratings");
    ref.on("value", function(snapshot){

        Ratings = $firebaseArray(ref);

        $scope.Uno = 0;
        $scope.Dos = 0;
        $scope.Tres = 0;
        $scope.Cuatro = 0;
        $scope.Cinco = 0;
        
        Ratings.$loaded()
        .then(function(data){
            angular.forEach(data, function(value) {    
                console.info(value.rate);                
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
        });
    });

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