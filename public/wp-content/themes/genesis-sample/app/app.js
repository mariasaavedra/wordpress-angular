angular.module('app', [
   'ui.bootstrap'
])
.run(run);

run.$inject = ['$http', '$window', '$location'];

function run($http, $window, $location){
    console.log("Application init..");
}
