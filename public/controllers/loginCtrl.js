angular
.module('loginCtrl', ['ui.router', 'userService'])
.controller('LoginController', function($state, User) {

	var vm = this;
	vm.isLoggedIn = false;

	/*Check if logged in. If not redirect to login.html*/
	User.checkIfLoggedIn()
		.success(function(response) {
			if(response.msg) {
				alert(response.data);
				vm.isLoggedIn = true;
				$state.go('home');
			}
		})

	vm.register = function() {
		User.register(vm.user)
			.success(function(response) {
				if(response.msg) {
					alert(response.data);
					$state.go('home');
				} else if(response.data=="Already registered") {
					User.login(vm.user)
						.success(function(response) {
							alert(response.data);
							if(response.msg) {
								$state.go('home');
							}
						})
				}
			})
	}

});