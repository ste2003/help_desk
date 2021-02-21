angular.module('appTP')
.controller('GestionPreguntaCtrl',
		['$scope','$location','preguntaService','$routeParams',
		 function($scope,  $location,preguntaService,$routeParams) {
			//funcion inicializadora
			
		$scope.init = function(){
				$scope.showMsgOk=false;
				$scope.showMsgError=false;
				$scope.edicionHabilitada = true;
				console.log($routeParams);
				preguntaService.buscar($routeParams.id).then(function() {
								$scope.pregunta = preguntaService.get();
								$scope.imagen = $scope.pregunta.imagen;
							}
						);
						$scope.operacion = "Editar Pregunta";
						
					
					preguntaService.listar().then(
						function() {
						$scope.listaPregunta = preguntaService.getLista();
						}
					);
			};
			$scope.init();
			$scope.volver=function(){
				$location.path("/home");	
			};
			$scope.contactar=function(){
				$location.path("/contacto/add/").search({idpregunta: $scope.pregunta.titulo});	
			};

		
		}]);