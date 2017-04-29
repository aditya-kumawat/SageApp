angular.module('messageService', [])

.factory('Message', function($http) {
	return {
		sendMessage: function(data) {
			return $http.post('/messageAPI/sendMessage', data);
		},

		recieveMessages: function(data) {
			return $http.post('/messageAPI/recieveMessages', data);
		},

		verify: function(data) {
			return $http.post('/messageAPI/verify', {"body": data});
		},

		simulate: function(data) {
			return $http.post('/messageAPI/simulate', {"body": data});
		},	
	}
})