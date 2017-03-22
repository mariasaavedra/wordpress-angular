function ApiService($rootScope, $window, $http) {
    var service = {
        getPosts: getPosts,
        getPost: getPost,
        getPage: getPage,
        getPages: getPages
    };
    return service;

    var baseUrl = "http://192.168.33.10";

    function getPosts(){
        return $http({
            method: 'GET',
            url: baseUrl + '/wp-json/wp/v2/posts',
        }).then(function successCallback(response) {
            console.log(response);
            return response;
        }, function errorCallback(response) {
            console.log(response);
            return "Error loading profile";
        });
    }
    function getPost(id){
        return $http({
            method: 'GET',
            url: baseUrl + '/wp-json/wp/v2/posts/' + id,
        }).then(function successCallback(response) {
            console.log(response);
            return response;
        }, function errorCallback(response) {
            console.log(response);
            return "Error loading profile";
        });
    }
    function getPages(){
        return $http({
            method: 'GET',
            url: baseUrl + '/wp-json/wp/v2/pages',
        }).then(function successCallback(response) {
            console.log(response);
            return response;
        }, function errorCallback(response) {
            console.log(response);
            return "Error loading profile";
        });
    }
    function getPage(id){
        return $http({
            method: 'GET',
            url: baseUrl + '/wp-json/wp/v2/pages/' + id,
        }).then(function successCallback(response) {
            console.log(response);
            return response;
        }, function errorCallback(response) {
            console.log(response);
            return "Error loading profile";
        });
    }

}