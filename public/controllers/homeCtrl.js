angular
.module('homeCtrl', ['ui.router', 'userService', 'messageService'])
.controller('HomeController', function($state, User, Message) {

	$(".modal").modal();

	var vm = this;
	vm.isLoggedIn = false;
	vm.messages = [];
	vm.noMessages = true;
	vm.verificationResult = "";


	/*Check if logged in. If not redirect to login.html*/
	User.checkIfLoggedIn()
		.success(function(response) {
			if(response.msg) {
				vm.isLoggedIn = true;
				Message.recieveMessages()
					.success(function(response) {
						if(response.msg) {
							vm.messages = response.data;
							if(vm.messages.length != 0){
								vm.noMessages = false;
							}
						} else {
							alert(response.data);
						}
					})
			} else {
				alert(response.data);
				$state.go('login');
			}
		})

	vm.sendMessage = function() {
		Message.sendMessage(vm.message)
			.success(function(response) {
				if(response.msg) {
					alert(response.data);
					$('#Send-message-modal').modal('close');
				} else {
					alert(response.data);
				}
			})
	};

	vm.simulate = function(body) {
		vm.verificationResult = "Pending";
		Message.simulate(body)
			.success(function(response) {
				if(response.msg){
					resp = response.data.stdout.trim().split("\n");
					console.log(resp);
					if(resp[0].trim()=="True") {
						vm.verificationResult = "Signature Verified.";
					} else {
						vm.verificationResult = "Original Signature : " + resp[1].trim() + "\nNew Signature : " + resp[2].trim() + "Signature verification failed.";
					}
				} else {
					vm.verificationResult = "Error : " + response.error + "\nstderr: : " + response.stderr;
				}
			});
	};

	vm.verify = function(body) {
		vm.verificationResult = "Pending";
		Message.verify(body)
			.success(function(response) {
				if(response.msg){
					resp = response.data.stdout.trim().split("\n");
					if(resp[0].trim()=="True") {
						vm.verificationResult = "Signature : " + resp[1].trim() + "\nSignature Verified.";
					} else {
						vm.verificationResult = "Signature verification failed.";
					}
				} else {
					vm.verificationResult = "Error : " + response.error + "\nstderr: : " + response.stderr;
				}
			});
	};

	vm.logout = function() {
		User.logout()
			.success(function(response) {
				alert(response.data);
				if(response.msg){
					$state.go('login');
				}
			});
	};

});