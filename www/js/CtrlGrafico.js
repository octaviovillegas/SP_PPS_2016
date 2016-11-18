angular.module('starter')

.controller('graficoCtrl', function($scope, $stateParams,$firebaseArray,$timeout,Info,$timeout) {

    $scope.infos = Info;

    $scope.recargar= function(){

        $scope.Accidente = 0;
        $scope.Averia = 0;
        $scope.Animal = 0;
        $scope.Necesidad = 0;
        
        Info.$loaded()
        .then(function(data){
            angular.forEach(data, function(value) {                    
                switch(value.tipo){
                case 0: $scope.Accidente++; break;
                case 1: $scope.Averia++; break  ;
                case 2: $scope.Animal++; break  ;
                case 3: $scope.Necesidad++; break  ;
                }

            $scope.data = [
                {
                    key: "Accidente",
                    y: $scope.Accidente
                },
                {
                    key: "Averia de Vehiculo",
                    y: $scope.Averia
                },
                {
                    key: "Animal Suelto ",
                    y: $scope.Animal
                },
                {
                    key: "Necesidad de Ambulancia",
                    y: $scope.Necesidad
                }
            ];

            })
        });
    };

    $scope.recargar();


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