angular.module('appTP')
.controller('ListaBaseCtrl',
	['$scope','$location','baseService','materiaService',
		function($scope,  $location, baseService, materiaService) {
			$scope.refrescar = function(){ 	
				baseService.listar().then(
					function() {
						console.log('en refrescar de ListaPreguntaCtrl.listar');
						$scope.listaBase = baseService.getLista();
						//$scope.instrucArray = $scope.listaBase.instruc;
						
						//console.log($scope.listaBase[1].instruc);
						//console.log($scope.listaClientes);
					}
				); 	

			};
			$scope.editar = function(base){
				$location.path("/base/"+base._id);
			};
			$scope.nuevo = function(){ 

				console.log('en nuevo');
				$location.path("/base/add");
			};
			$scope.borrar = function(base){
				if (confirm("ESTA SEGURO DE ELIMINAR LA ENTRADA")){
					baseService.borrar(base).then(
					function(){
					
					 $scope.showMsgOk=true;
					 $scope.msgOk=" Entrada borrada exitosamente";
					 
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
