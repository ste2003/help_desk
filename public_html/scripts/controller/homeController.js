angular.module('appTP')
.controller('HomeCtrl',
		['$scope','$location', 'homeService','$routeParams', 'preguntaService',
		 function($scope,  $location, homeDAO, $routeParams, preguntaService) {
		 	console.log('en homecontroller');

			$scope.refrescar = function(){ 
				homeDAO.listar().then(
					function() {
						console.log('en refrescar de homeController.js');
						console.log($scope.datoFiltro);
						$scope.hola = 'hola';
						preguntaService.listar().then(
					function() {						
						$scope.listaPregunta = preguntaService.getLista();
						console.log($scope.listaPregunta[0].titulo);						
					}
				);											
					}
				);
				};
			
			$scope.ver = function(preg){
				$location.path("/pregunta/"+preg._id);	
				}	
			
			$scope.contactar = function(){				
				$location.path("/contacto/add");	
			};
							
			$scope.refrescar();
		}]);





	