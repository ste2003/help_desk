angular.module('appTP')
.controller('ListaContactoCtrl',
	['$scope','$location','contactoService',
		function($scope,  $location, contactoService) {
			$scope.refrescar = function(){ 	
				contactoService.listar().then(
					function() {
						console.log('en refrescar de ListaContectoCtrl.listar');
						$scope.listaContacto = contactoService.getLista();
						console.log($scope.listaContacto[0].adj_unico);
						
					}
				); 	

			};
			$scope.editar = function(contacto){
				$location.path("/contacto/"+contacto._id);
			};
			$scope.nuevo = function(){ 
				console.log('en nuevo');
				$location.path("/contacto/add");
			};
			$scope.borrar = function(contacto){
					
				$scope.refrescar();
			}
	
			$scope.refrescar();
		}
	]
);
