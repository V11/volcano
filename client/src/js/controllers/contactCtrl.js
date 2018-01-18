/**
 * Created by kurpav on 4/17/15.
 */
App.coreModule.controller("ContactCtrl", ["$scope", "$http", "config", function($scope, $http, config){
    $scope.feedback = {};
    $scope.onSubmit = function() {
        $http.post(config.serverUrl + "/api/feedback", {data: $scope.feedback}).
            success(function (data, status, headers, config) {
                $("#feedbackModal").modal({backdrop: false});
                $scope.feedback = {};
                $scope.contactForm.$setPristine();
            }).
            error(function (data, status, headers, config) {
                alert(data, status, headers, config);
            });
    };
}]);