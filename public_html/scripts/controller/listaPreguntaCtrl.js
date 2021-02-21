angular.module('appTP')
.controller('ListaPreguntaCtrl',
	['$scope','$location','preguntaService','materiaService',
		function($scope,  $location, preguntaService, materiaService) {
			$scope.refrescar = function(){ 	
				preguntaService.listar().then(
					function() {
						console.log('en refrescar de ListaPreguntaCtrl.listar');
						$scope.listaPregunta = preguntaService.getLista();
						$scope.instrucArray = $scope.listaPregunta.instruc;
						
						console.log($scope.listaPregunta[1].instruc);
						//console.log($scope.listaClientes);
					}
				); 	

			};
			$scope.editar = function(pregunta){
				$location.path("/pregunta/"+pregunta._id);
			};
			$scope.nuevo = function(){ 
				console.log('en nuevo');
				$location.path("/pregunta/add");
			};
			$scope.borrar = function(pregunta){
					materiaService.borrar(mat).then(
					function(){
					
					 $scope.showMsgOk=true;
					 $scope.msgOk=" pregunta borrada exitosamente";
					 
					},
					function(errMsg){ 
						$scope.showMsgError=true;
						$scope.msgError=errMsg;
					}	
				)
				$scope.refrescar();
			}
	
			$scope.refrescar();
		}
	]
);
