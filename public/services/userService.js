angular.module('userService', [])

.factory('User', function($http) {
	return {
		register: function(data) {
			return $http.post('/userAPI/register', data);
		},

		login: function(data) {
			return $http.post('/userAPI/login', data);
		},

		checkIfLoggedIn: function() {
			return $http.post('/userAPI/checkIfLoggedIn');
		},

		getUser: function() {
			return $http.post('/userAPI/getUser');
		},

		logout: function(data) {
			return $http.post('/userAPI/logout', data);
		},
	}
})