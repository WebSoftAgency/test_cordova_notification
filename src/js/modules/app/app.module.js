var module_dependencies = [

  'ionic',
  'ui.router',
  'LocalStorageModule',
  'ngResource',
  'satellizer',
  'pascalprecht.translate',
  'ngCordova',

  'ngAuth',
  'ngUser',
  'ngUtil',
  'ngLocalization',
  'ngError'
];

var ngApp = angular.module('ngApp', module_dependencies);

/**
 * ngApp config blocks:
 *   localStorage
 */

ngApp
  .config(localStorage)

localStorage.$inject = ['localStorageServiceProvider']

function localStorage(localStorageServiceProvider) {

  localStorageServiceProvider
    .setPrefix('_ngApp')
    .setStorageType('localStorage')
    .setNotify(true, true)
};

/**
 * ngApp run blocks:
 *   templatesLoader
 */

ngApp
  .run(templatesLoader)
  .run(ionicPlatform)
  .run(cordovaPushConfig)


templatesLoader.$inject = ['$templateCache'];

function templatesLoader($templateCache) {

  var _views = {
    'root': require('./templates/root.html'),
    'main': require('./templates/main.html')
  };

  $templateCache.put('root.html', _views['root']);
  $templateCache.put('main.html', _views['main']);
};

ionicPlatform.$inject = ['$ionicPlatform'];

function ionicPlatform($ionicPlatform) {
  $ionicPlatform.ready(() => {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    };
    if (window.StatusBar) {
      StatusBar.styleDefault();
    };
  })
};

cordovaPushConfig.$inject = ['localStorageService', '$ionicPlatform', '$http', '$cordovaPushV5'];

function cordovaPushConfig(localStorageService, $ionicPlatform, $http, $cordovaPush) {

  var push_notification_config = {
    android: {
      senderID: "27835363735",
      forceShow: true
    }
  };


  $cordovaPush
    .initialize(push_notification_config)
    .then(result => {
      console.log(result);
      if (!localStorageService.get('push:register')) {
        return $cordovaPush.register()
      };
    })
    .then(token_device => {

      console.log(token_device);
      var request_options = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/notifications/device/gcm/',
        data: {
          registration_id: token_device
        }
      };

      $http(request_options)
        .then(result => {
          console.log(result);
          localStorageService.set('push:register', true);
        })
        .catch(err => {
          console.log(err);
        });

    })
    .catch(err => {
      console.log(err);
    });

};



require('./app.routing');

require('./controllers/root.controller');
require('./controllers/main.controller');

require('./services/data.service');
require('./services/storage.service');

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['ngApp']);
  });
