// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngMap','firebase','nvd3', 'ion-floating-menu', 'ionic.rating', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
/*.run(function($ionicPlatform){
  $ionicPlatform.ready(function(){
    var push = new Ionic.Push({
      "debug" : true
    });
    push.register(function(token){
      console.log("my device token:", token.token);
      push.saveToken(token);
    });


  });
})*/

.value('refUsuarioActualVal', {
    ref: null
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

 .state('app.sos', {
    url: '/sos',
    views: {
      'menuContent': {
        templateUrl: 'templates/SOS.html',
          controller: 'SOSCtrl'
      }
    }
  })

  .state('app.mapa', {
      url: '/mapa',
      views: {
        'menuContent': {
          templateUrl: 'templates/mapa.html',
          controller: 'mapaCtrl'
        }
      }
    })

  .state('app.grafico', {
      url: '/graficos',
      views: {
        'menuContent': {
          templateUrl: 'templates/graficos.html',
          controller: 'graficoCtrl'
        }
      }
    })
    .state('app.rating', {
      url: '/rating',
      views: {
        'menuContent': {
          templateUrl: 'templates/rating.html',
          controller: 'RatingCtrl'
        }
      }
    })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'

  })

  .state('registro', {
    url: '/registro', 
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })
  
  .state('app.feedBack', {
    url: '/feedBack', 
    views: {
      'menuContent': {
        templateUrl: 'templates/feedBack.html',
        controller: 'feedBackCtrl'
      }
    }
  })
  .state('app.listaDeUsuarios', {
    url: '/listaDeUsuarios', 
    views: {
      'menuContent': {
        templateUrl: 'templates/listaDeUsuarios.html',
        controller: 'listaDeUsuariosCtrl'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
