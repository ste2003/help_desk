angular.module('appTP')
.controller('ListaMateriaCtrl',
	['$scope','$location','materiaService',
		function($scope,  $location,  materiaService) {
			$scope.refrescar = function(){ 	
				materiaService.listar().then(
					function() {
						console.log('en refrescar de ListaMateriaCtrl.listar');
						$scope.listaMateria = materiaService.getLista();
						
					}
				); 	

			};
			$scope.editar = function(materia){
				$location.path("/materia/"+materia._id);
			};
			$scope.nuevo = function(){ 

				console.log('en nuevo');
				$location.path("/materia/add");
			};
			$scope.borrar = function(materia){
				if (confirm("ESTA SEGURO DE ELIMINAR LA MATERIA")){
					materiaService.borrar(materia).then(
					function(){
					
					 $scope.showMsgOk=true;
					 $scope.msgOk=" Materia borrada exitosamente";
					 
					},
					function(errMsg){ 
						$scope.showMsgError=true;
						$scope.msgError=errMsg;
					}	
					)	
				};
				$scope.refrescar();
			}
	
			$scope.refrescar();
		}
	]
);
