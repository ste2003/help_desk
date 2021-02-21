angular.module('appTP', ['ngRoute','ui.bootstrap'])
	.constant('URL_ACTUA','http://localhost:8000/actua')
	.constant('URL_CONTACTO','http://localhost:8000/contacto')
	.constant('URL_MATERIA','http://localhost:8000/materia')
	.constant('URL_BASE','http://localhost:8000/base')
    .constant('URL_PREGUNTA','http://192.168.1.110:8000/pregunta')
      .constant('URL_HOME','http://192.168.1.110:8000/')
	.config(function($routeProvider) {
		$routeProvider.when('/home', {
			controller : 'HomeCtrl',
			templateUrl : 'vistas/home.html'
		}).when('/base/lista', {
			controller : 'ListaBaseCtrl',
			templateUrl : 'vistas/base/lista.html'
		}).when('/base/:id', {
			controller : 'GestionBaseCtrl',
			templateUrl : 'vistas/base/datos.html'
		}).when('/base/add', {
			controller : 'GestionBaseCtrl',
			templateUrl : 'vistas/base/datos.html'		
		}).when('/pregunta/lista', {
			controller : 'ListaPreguntaCtrl',
			templateUrl : 'vistas/pregunta/listabase.html'
		}).when('/actua/lista', {
			controller : 'ListaActuaCtrl',
			templateUrl : 'vistas/actua/lista.html'
		}).when('/actua/:id', {
			controller : 'GestionActuaCtrl',
			templateUrl : 'vistas/actua/datos.html'
		}).when('/actua/add', {
			controller : 'GestionActuaCtrl',
			templateUrl : 'vistas/actua/datos.html'
		}).when('/contacto/add', {
			controller : 'GestionContactoCtrl',
			templateUrl : 'vistas/contacto/datos.html'	
		}).when('/contacto/lista', {
			controller : 'ListaContactoCtrl',
			templateUrl : 'vistas/contacto/lista.html'		
		}).when('/materia/lista', {
			controller : 'ListaMateriaCtrl',
			templateUrl : 'vistas/materia/lista.html'
		}).when('/materia/:id', {
			controller : 'GestionMateriaCtrl',
			templateUrl : 'vistas/materia/datos.html'	
		}).when('/materia/add', {
			controller : 'GestionMateriaCtrl',
			templateUrl : 'vistas/materia/datos.html'
		}).when('/pregunta/:id', {
			controller : 'GestionPreguntaCtrl',
			templateUrl : 'vistas/pregunta/datos.html'
		}).otherwise({
				redirectTo: "/home"
		});
	});