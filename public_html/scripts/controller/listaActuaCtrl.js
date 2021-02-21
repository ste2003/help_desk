angular.module('appTP')
.controller('ListaActuaCtrl',
	['$scope','$location','actuaService',
		 function($scope,  $location,actuaService) {
		 	console.log('en ListaActuaCtrl');
			$scope.showMsgOk=false;
			$scope.showMsgError=false;
			$scope.quantity = 10;

			$scope.refrescar = function(){ 
				actuaService.listar().then(
					function() {
						console.log('en refrescar de ListaActuaCtrl.listar');
						$scope.listaActua = actuaService.getLista();
						$scope.fuerosArray = $scope.listaActua.fuero;
						console.log('fueroarray:');
						console.log($scope.listaActua[1].fuero);
						//console.log($scope.listaClientes);
					}
				); 
			};
			$scope.elegir = function(act){
				$scope.actuaSeleccionado = act;
			};
			$scope.editar = function(act){
				console.log(act._id);
				$location.path("/actua/"+act._id);
			};
			$scope.nuevo = function(){ 
				$location.path("/actua/add");
			};
			$scope.borrar = function(act){ 
				actuaService.borrar(act).then(
					function(){
					 $scope.showMsgOk=true;
					 $scope.msgOk=" actuación borrado exitosamente";
					 $scope.clienteSeleccionado=null;
					},
					function(errMsg){ 
						$scope.showMsgError=true;
						$scope.msgError=errMsg;
					}	
				)
				$scope.refrescar();
			};
			$scope.refrescar();
		}

	]
);
