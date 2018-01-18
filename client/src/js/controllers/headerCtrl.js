/**
 * Created by kurpav on 4/26/15.
 */
App.coreModule.controller("HeaderCtrl", ["$scope", "$location", function ($scope, $location) {
    $scope.items = [
        {path: "/", title: "Home"},
        {path: "/features", title: "Features"},
        {path: "/contact", title: "Contact"}
    ];
    $scope.isActive = function (item) {
        if (item.path == $location.path()) {
            return true;
        }
        return false;
    };
}]);