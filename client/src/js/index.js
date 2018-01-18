/**
 * Created by kurpav on 3/21/15.
 */
var App = {};

(function() {
    App.coreModule = angular.module("volcano", ["ngRoute", "ui.bootstrap", "nya.bootstrap.select"])
        /*.run(function($templateCache, $compile, $rootScope){
        var templatesHTML = $templateCache.get('app.templates');
        $compile(templatesHTML)($rootScope);
    })*/;

    App.coreModule.config(["$routeProvider", function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/main.html',
                controller: 'MainCtrl'
            }).
            when('/contact', {
                templateUrl: 'partials/contact.html',
                controller: 'ContactCtrl'
            }).
            when('/features', {
                templateUrl: 'partials/features.html',
                controller: 'FeaturesCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

    fetchData().then(bootstrapApplication);

    function fetchData() {
        var initInjector = angular.injector(["ng"]);
        var $http = initInjector.get("$http");

        return $http.get("./config/config.json").then(function(response) {
            App.coreModule.constant("config", response.data);
        }, function(errorResponse) {
            alert("Couldn't load config file!");
        });
    }

    function bootstrapApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["volcano"]);
        });
    }
}());