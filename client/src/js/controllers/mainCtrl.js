/**
 * Created by kurpav on 4/17/15.
 */
App.coreModule.controller("MainCtrl", ["$scope", "$http", "config", function ($scope, $http, config) {
    var LIGHT = "light",
        MEDIUM = "medium",
        ADVANCED = "advanced";

    $scope.session = {};
    $scope.session.test_mode = LIGHT;
    $scope.modes = [
        {title: "Light", value: LIGHT},
        {title: "Medium", value: MEDIUM},
        {title: "Advanced", value: ADVANCED}
    ];
    $scope.utils = [{title: "nmap", value: "nmap"}, {title: "sqlmap", value: "sqlmap"}];
    $scope.session.target_url = "";
    $scope.session.report_email = "";

    $scope.onSubmit = function () {
        $http.post(config.serverUrl + "/api/" + $scope.session.utility.value, {data: $scope.session}).
            success(function (data, status, headers, config) {
                $scope.error = data !== "OK";
                $("#reportModal").modal({backdrop: false});
                $scope.session.target_url = '';
                $scope.mainForm.$setPristine();
            }).
            error(function (data, status, headers, config) {
                alert(data, status, headers, config);
            });
    };
}]);