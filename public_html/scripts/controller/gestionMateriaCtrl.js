angular.module('appTP')
.controller('GestionMateriaCtrl',
		['$scope','$location','materiaService','$routeParams',
		 function($scope,  $location, materiaService,$routeParams) {
			//funcion inicializadora
			
		$scope.init = function(){
				$scope.showMsgOk=false;
				$scope.showMsgError=false;
				$scope.edicionHabilitada = true;
				console.log($routeParams);
				
				console.log($location.path());
				materiaService.listar().then(
						function() {
						$scope.listaMateria = materiaService.getLista();
						console.log($scope.listaMateria);
						}
					);
				
					if($routeParams.id==='add'){
						$scope.operacion = "Nueva Entrada";
					}else{
						materiaService.buscar($routeParams.id)
						.then(
							function() {
								$scope.materia = materiaService.get();
							}
						);
						$scope.operacion = "Editar Entrada";
						
					};
					materiaService.listar().then(
						function() {
						$scope.listaMateria = materiaService.getLista();
						}
					);
			};
			$scope.init();
			$scope.volver=function(){
				$location.path("/home");	
			};

			$scope.guardar = function(){
				materiaService.guardar($scope.materia).then(
					function(){ 
						$scope.showMsgOk=true;
						$scope.msgOk="Entrada guardada correctamente";
					},
					function(errMsg){ 
						$scope.showMsgError=true;
						$scope.msgError=errMsg;
					}					
				);
				$scope.edicionHabilitada = false;	
			};
			$scope.actualizar = function(){
				materiaService.actualizar($scope.materia);		
				$scope.edicionHabilitada = false;	
			}
			$scope.init(); 
			
		}]);