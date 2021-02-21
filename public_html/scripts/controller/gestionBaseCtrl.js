angular.module('appTP')
.directive('mayusculas', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(input) {
                return input ? input.toUpperCase() : "";
            });
            element.css("text-transform","uppercase");
        }
    };
})
.controller('GestionBaseCtrl',
		['$scope','$location','baseService','materiaService','$routeParams',
		 function($scope,  $location, baseService, materiaService,$routeParams) {
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
						baseService.buscar($routeParams.id)
						.then(
							function() {
								$scope.base = baseService.get();
							}
						);
						$scope.operacion = "Editar Entrada";
						
					};
					baseService.listar().then(
						function() {
						$scope.listaBase = baseService.getLista();
						}
					);
			};
			$scope.init();
			$scope.volver=function(){
				$location.path("/home");	
			};

			$scope.guardar = function(){
				$scope.base.fecha = new Date();
				baseService.guardar($scope.base).then(
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
				baseService.actualizar($scope.base);		
				$scope.edicionHabilitada = false;	
			}
			$scope.init(); 
			
		}]);