angular.module('appRoutes', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home',{
			url: '/',
			templateUrl: 'pages/home.html',
			controller: 'HomeController',
			controllerAs: "home"
		})
		.state('login',{
			url: '/login',
			templateUrl: 'pages/login.html',
			controller: 'LoginController',
			controllerAs: 'login'
		});
});
