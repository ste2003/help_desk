angular.module('appTP')
  .directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
  })
.controller('GestionActuaCtrl',
		['$scope','$location','actuaService','$routeParams', 'materiaService',
		 function($scope,  $location,actuaDAO,$routeParams, materiaService) {
			//funcion inicializadora
			$scope.init = function(){
				$scope.showMsgOk=false;
				$scope.showMsgError=false;
				$scope.edicionHabilitada = true;
					if($routeParams.id==='add'){
						$scope.operacion = "Nueva Actuacion";
					}else{
						actuaDAO.buscar($routeParams.id)
						.then(
							function() {
								$scope.actua = actuaDAO.get();
							}
						);
						$scope.operacion = "Editar Actuación";
						
					};
					materiaService.listar().then(
						function() {
						$scope.listaMateria = materiaService.getLista();
						}
					);
			};
			$scope.guardar = function(){
				actuaDAO.guardar($scope.actua).then(
					function(){ 
						$scope.showMsgOk=true;
						$scope.msgOk="Actuación guardada correctamente";
					},
					function(errMsg){ 
						$scope.showMsgError=true;
						$scope.msgError=errMsg;
					}					
				);
				$scope.edicionHabilitada = false;	
			};
			$scope.actualizar = function(){
				actuaDAO.actualizar($scope.actua);		
				$scope.edicionHabilitada = false;	
			}
			$scope.init(); 
		}]);
